'use client';

import { useState, useRef, useEffect } from 'react';
import {
  readFileAsBase64,
  cropTransparentArea,
  createNineGrid,
  createBackground,
  compositeImage,
  downloadImage,
  compressImage,
  CollageParams,
} from '@/utils/imageProcessor';
import Link from 'next/link';

export default function Home() {
  const [gridImages, setGridImages] = useState<string[]>(Array(9).fill(''));
  const [mainImage, setMainImage] = useState<string>('');
  const [mainImageNoBg, setMainImageNoBg] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<string>('');
  const [uploadMessage, setUploadMessage] = useState<string>('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const [params, setParams] = useState<CollageParams>({
    scale: 1.0,
    offsetX: 50,
    offsetY: 50,
    blur: 0,
    brightness: 100,
  });

  const gridInputRef = useRef<HTMLInputElement>(null);
  const mainInputRef = useRef<HTMLInputElement>(null);

  // 检查每日使用次数
  const checkDailyLimit = (): { canUse: boolean; remaining: number } => {
    // 服务器端渲染时跳过
    if (typeof window === 'undefined') {
      return { canUse: true, remaining: 5 };
    }

    const today = new Date().toDateString();
    const usageData = localStorage.getItem('usageLimit');

    if (!usageData) {
      return { canUse: true, remaining: 5 };
    }

    try {
      const { date, count } = JSON.parse(usageData);

      // 新的一天，重置计数
      if (date !== today) {
        localStorage.setItem('usageLimit', JSON.stringify({ date: today, count: 0 }));
        return { canUse: true, remaining: 5 };
      }

      // 检查是否超过限制
      const remaining = 5 - count;
      return { canUse: count < 5, remaining: Math.max(0, remaining) };
    } catch (error) {
      console.error('读取使用次数失败:', error);
      return { canUse: true, remaining: 5 };
    }
  };

  // 增加使用次数
  const incrementUsageCount = () => {
    // 服务器端渲染时跳过
    if (typeof window === 'undefined') return;

    const today = new Date().toDateString();
    const usageData = localStorage.getItem('usageLimit');

    let count = 0;
    if (usageData) {
      try {
        const data = JSON.parse(usageData);
        if (data.date === today) {
          count = data.count;
        }
      } catch (error) {
        console.error('解析使用次数失败:', error);
      }
    }

    localStorage.setItem('usageLimit', JSON.stringify({
      date: today,
      count: count + 1
    }));
  };

  // 从localStorage恢复状态
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedState = localStorage.getItem('collageState');
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        // 只恢复最终生成的结果，不恢复原始图片
        if (state.mainImageNoBg) setMainImageNoBg(state.mainImageNoBg);
        if (state.previewImage) setPreviewImage(state.previewImage);
        if (state.params) setParams(state.params);
        console.log('✅ 已从缓存恢复上次生成的图片');
      } catch (error) {
        console.error('恢复状态失败:', error);
        localStorage.removeItem('collageState');
      }
    }
  }, []);

  // 保存状态到localStorage (只保存最终结果，避免超出配额)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 只有生成完成后才保存
    if (mainImageNoBg && previewImage) {
      try {
        const state = {
          mainImageNoBg,
          previewImage,
          params,
        };
        localStorage.setItem('collageState', JSON.stringify(state));
      } catch (error) {
        console.error('保存状态失败(可能超出localStorage配额):', error);
        // 如果失败，尝试只保存预览图
        try {
          localStorage.setItem('collageState', JSON.stringify({ previewImage, params }));
        } catch (e) {
          console.error('无法保存到localStorage');
        }
      }
    }
  }, [mainImageNoBg, previewImage, params]);

  // 九宫格上传
  const handleGridUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    await loadGridImages(files);
  };

  const loadGridImages = async (files: File[]) => {
    if (files.length === 0) return;

    const currentCount = gridImages.filter(Boolean).length;
    const newCount = currentCount + files.length;

    if (newCount < 9) {
      setUploadMessage(`Uploaded ${newCount}/9 photos, ${9 - newCount} more needed`);
    } else if (newCount === 9) {
      setUploadMessage(`✅ All 9 photos uploaded`);
    } else {
      setUploadMessage(`⚠️ Too many photos, selected first 9`);
    }

    setTimeout(() => setUploadMessage(''), 3000);

    const base64Images = await Promise.all(files.map(readFileAsBase64));
    const newGridImages = [...gridImages];
    let fileIndex = 0;

    for (let i = 0; i < 9 && fileIndex < base64Images.length; i++) {
      if (!newGridImages[i]) {
        newGridImages[i] = base64Images[fileIndex];
        fileIndex++;
      }
    }

    if (fileIndex < base64Images.length) {
      for (let i = 0; i < 9 && fileIndex < base64Images.length; i++) {
        newGridImages[i] = base64Images[fileIndex];
        fileIndex++;
      }
    }

    setGridImages(newGridImages);
    updateGridPreview(newGridImages);
  };

  // 删除单张
  const handleDeleteGridImage = (index: number) => {
    const newGridImages = [...gridImages];
    newGridImages[index] = '';
    setGridImages(newGridImages);

    const count = newGridImages.filter(Boolean).length;
    setUploadMessage(`Deleted, current: ${count}/9 photos`);
    setTimeout(() => setUploadMessage(''), 2000);

    updateGridPreview(newGridImages);
  };

  // 拖拽排序
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newGridImages = [...gridImages];
    [newGridImages[draggedIndex], newGridImages[index]] = [newGridImages[index], newGridImages[draggedIndex]];
    setGridImages(newGridImages);
    setDraggedIndex(index);

    updateGridPreview(newGridImages);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // 更新九宫格预览 (优化: 如果主图已生成，保持合成效果)
  const updateGridPreview = async (images: string[]) => {
    const validImages = images.filter(Boolean);
    if (validImages.length === 0) {
      setPreviewImage('');
      return;
    }

    try {
      const gridCollage = await createNineGrid(validImages);
      const background = await createBackground(gridCollage, 0);

      // 如果主图已抠图完成，继续显示合成效果
      if (mainImageNoBg) {
        const final = await compositeImage(background, mainImageNoBg, params);
        setPreviewImage(final);
      } else {
        setPreviewImage(background);
      }
    } catch (error) {
      console.error('预览更新失败:', error);
    }
  };

  // 主图上传
  const handleMainUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await readFileAsBase64(file);
      setMainImage(base64);
      setMainImageNoBg('');
      // 不更新预览,保持九宫格预览
    }
  };

  // 生成图片(自动抠图)
  const generateCollage = async () => {
    const validGridImages = gridImages.filter(Boolean);

    if (validGridImages.length === 0) {
      alert('Please upload grid photos first!');
      return;
    }
    if (!mainImage) {
      alert('Please upload main photo first!');
      return;
    }

    // 检查每日使用次数限制
    if (!mainImageNoBg) {
      const { canUse, remaining } = checkDailyLimit();
      if (!canUse) {
        alert('Daily quota exhausted (5/day). Please try again tomorrow!\n\n💡 Tip: Adjusting parameters does not consume quota');
        return;
      }
      console.log(`📊 今日剩余生成次数: ${remaining}/5`);
    }

    setIsProcessing(true);
    setProgress(0);
    setProcessingStage('Generating image...');

    // 模拟进度条 - 90秒内从0%到99%
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) {
          clearInterval(progressInterval);
          return 99;
        }
        // 每300ms增加约1.1% (90秒 = 300个间隔, 99% / 300 ≈ 0.33%)
        return prev + 0.33;
      });
    }, 300);

    try {
      let processedMainImage = mainImageNoBg;
      if (!mainImageNoBg) {
        processedMainImage = await removeBackgroundAuto(mainImage);
        setMainImageNoBg(processedMainImage);

        // 成功抠图后，增加使用次数
        incrementUsageCount();
        const { remaining } = checkDailyLimit();
        console.log(`✅ 生成成功！今日剩余次数: ${remaining}/5`);
      }

      setProcessingStage('Creating grid...');
      const gridCollage = await createNineGrid(validGridImages);

      setProcessingStage('Creating background...');
      const background = await createBackground(gridCollage, 0);

      setProcessingStage('Compositing...');
      const final = await compositeImage(background, processedMainImage, params);

      setPreviewImage(final);

      // 完成后立即跳到100%
      clearInterval(progressInterval);
      setProgress(100);
      setProcessingStage('Completed!');

      // 1秒后清除进度
      setTimeout(() => {
        setProcessingStage('');
        setProgress(0);
      }, 1000);
    } catch (error) {
      console.error('生成失败:', error);
      clearInterval(progressInterval);
      setProgress(0);
      alert('Generation failed, please try again');
    } finally {
      setIsProcessing(false);
    }
  };

  // 自动抠图 
  const removeBackgroundAuto = async (imageDataUrl: string): Promise<string> => {
    const response = await fetch(imageDataUrl);
    // // 先压缩图片到50KB以内
    // setProcessingStage('压缩图片...');
    // const compressedImage = await compressImage(imageDataUrl, 50);

    // setProcessingStage('AI抠图中...');
    // const response = await fetch(compressedImage);
    const blob = await response.blob();
    // const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
    const file = new File([blob], 'image.png', { type: blob.type });
    const formData = new FormData();
    formData.append('image', file);

    const apiKey = process.env.NEXT_PUBLIC_API_SECRET_KEY || '';
    if (!apiKey) {
      throw new Error('API密钥未配置');
    }

    const apiResponse = await fetch('/api/remove-bg', {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
      },
      body: formData,
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP ${apiResponse.status}`);
    }

    const resultBlob = await apiResponse.blob();
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(resultBlob);
    });

    return await cropTransparentArea(base64);
  };

  // 实时预览 (优化: 接收参数避免闭包问题)
  const updatePreview = async (newParams?: CollageParams) => {
    if (!mainImageNoBg || gridImages.filter(Boolean).length === 0) return;

    const useParams = newParams || params;
    try {
      const gridCollage = await createNineGrid(gridImages.filter(Boolean));
      const background = await createBackground(gridCollage, 0);
      const final = await compositeImage(background, mainImageNoBg, useParams);
      setPreviewImage(final);
    } catch (error) {
      console.error('预览更新失败:', error);
    }
  };

  // 重新制作
  const handleReset = () => {
    if (confirm('Are you sure you want to clear all data and start over?')) {
      setGridImages(Array(9).fill(''));
      setMainImage('');
      setMainImageNoBg('');
      setPreviewImage('');
      setParams({ scale: 1.0, offsetX: 50, offsetY: 50, blur: 0, brightness: 100 });
      setUploadMessage('');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('collageState');  // 清除缓存
      }
      console.log('✅ 已清除所有数据和缓存');
    }
  };

  // 下载图片
  const handleDownload = () => {
    if (previewImage) {
      downloadImage(previewImage, `3d-collage-${Date.now()}.png`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            AI Collage Generator for Social Media
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Design stylish 3D photo grids for your posts — instantly and for free.
          </p>
          {/* 每日使用次数提示 */}
          <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Daily Quota: {checkDailyLimit().remaining}/5 left
            </span>
            <Link
              href="/split"
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
            >
              🔪 Grid Photo Split Tool →
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 左侧:上传区 */}
          <div className="lg:w-1/3 space-y-4">
            {/* 九宫格上传 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900">Grid Photos</h2>
                <span className="text-sm text-gray-500">
                  {gridImages.filter(Boolean).length}/9
                </span>
              </div>

              {uploadMessage && (
                <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700 text-center">
                  {uploadMessage}
                </div>
              )}

              <input
                ref={gridInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleGridUpload}
                className="hidden"
              />
              <button
                onClick={() => gridInputRef.current?.click()}
                className="w-full mb-3 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
              >
                Upload Photos
              </button>

              {/* 九宫格预览 */}
              <div className="grid grid-cols-3 gap-1">
                {gridImages.map((img, idx) => (
                  <div
                    key={idx}
                    draggable={!!img}
                    onDragStart={() => handleDragStart(idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDragEnd={handleDragEnd}
                    className={`aspect-square bg-gray-100 rounded overflow-hidden border-2 ${
                      draggedIndex === idx ? 'border-blue-500 opacity-50' : 'border-gray-200'
                    } relative group cursor-move`}
                  >
                    {img ? (
                      <>
                        <img src={img} alt={`Grid ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => handleDeleteGridImage(idx)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                          title="Delete"
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        {idx + 1}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 主图上传 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Main Photo (Person)</h2>
              <input
                ref={mainInputRef}
                type="file"
                accept="image/*"
                onChange={handleMainUpload}
                className="hidden"
              />
              <button
                onClick={() => mainInputRef.current?.click()}
                className="w-full mb-3 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
              >
                Upload Main Photo
              </button>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                {mainImage ? (
                  <img src={mainImage} alt="Main" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Click to upload person photo
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 右侧:预览和控制 */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>

              {processingStage && (
                <div className="mb-3">
                  <div className="p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700 text-center mb-2">
                    {processingStage}
                  </div>
                  {/* 进度条 */}
                  {isProcessing && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  )}
                  {/* 进度百分比 */}
                  {isProcessing && (
                    <div className="text-center text-xs text-gray-600 mt-1">
                      {Math.round(progress)}%
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="flex-1">
                  {/* 水平偏移-预览上方 */}
                  <div className="mb-2">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-600 w-16">Horizontal</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={params.offsetX}
                        onChange={(e) => {
                          const newParams = { ...params, offsetX: parseInt(e.target.value) };
                          setParams(newParams);
                          updatePreview(newParams);  // 传入新参数
                        }}
                        className="flex-1"
                        disabled={!mainImageNoBg}
                      />
                      <span className="text-xs text-gray-500 w-10 text-right">{params.offsetX}%</span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-3">
                    {/* 预览图片(响应式) */}
                    <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center w-full md:w-auto aspect-[3/4] md:aspect-auto" style={{ maxWidth: '100%', maxHeight: '800px' }}>
                      {previewImage ? (
                        <img src={previewImage} alt="Preview" className="w-full h-full object-contain" />
                      ) : (
                        <div className="text-gray-400 text-sm text-center p-4">
                          Upload photos and click<br/>"Generate" to preview
                        </div>
                      )}
                    </div>

                    {/* 垂直偏移-预览右侧(竖向滑块) - 隐藏在移动端 */}
                    <div className="hidden md:flex flex-col items-center justify-between" style={{ height: '800px' }}>
                      <label className="text-xs text-gray-600 mb-2">Vertical</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={100 - params.offsetY}
                        onChange={(e) => {
                          const newParams = { ...params, offsetY: 100 - parseInt(e.target.value) };
                          setParams(newParams);
                          updatePreview(newParams);  // 传入新参数
                        }}
                        className="h-full"
                        disabled={!mainImageNoBg}
                        style={{
                          writingMode: 'vertical-lr' as any,
                          WebkitAppearance: 'slider-vertical' as any,
                          width: '8px',
                          height: '720px',
                          transform: 'rotate(180deg)',
                        }}
                      />
                      <span className="text-xs text-gray-500 mt-2">{params.offsetY}%</span>
                    </div>
                  </div>

                  {/* 垂直偏移-移动端横向滑块 */}
                  <div className="md:hidden mt-2">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-600 w-16">Vertical</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={params.offsetY}
                        onChange={(e) => {
                          const newParams = { ...params, offsetY: parseInt(e.target.value) };
                          setParams(newParams);
                          updatePreview(newParams);
                        }}
                        className="flex-1"
                        disabled={!mainImageNoBg}
                      />
                      <span className="text-xs text-gray-500 w-10 text-right">{params.offsetY}%</span>
                    </div>
                  </div>

                  {/* 缩放-预览下方 */}
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-600 w-16">Scale</label>
                      <input
                        type="range"
                        min="0.3"
                        max="2.0"
                        step="0.1"
                        value={params.scale}
                        onChange={(e) => {
                          const newParams = { ...params, scale: parseFloat(e.target.value) };
                          setParams(newParams);
                          updatePreview(newParams);  // 传入新参数
                        }}
                        className="flex-1"
                        disabled={!mainImageNoBg}
                      />
                      <span className="text-xs text-gray-500 w-10 text-right">{params.scale.toFixed(1)}x</span>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="mt-6 flex items-center justify-center gap-6">
                    <button
                      onClick={handleReset}
                      disabled={isProcessing}
                      className="p-3 rounded-full hover:bg-gray-100 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Reset"
                    >
                      <svg className="w-6 h-6 text-gray-600 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>

                    <button
                      onClick={generateCollage}
                      disabled={isProcessing}
                      className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
                    >
                      {isProcessing ? processingStage || 'Processing...' : 'Generate'}
                    </button>

                    <button
                      onClick={handleDownload}
                      disabled={!previewImage || isProcessing}
                      className="p-3 rounded-full hover:bg-gray-100 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Download"
                    >
                      <svg className="w-6 h-6 text-gray-600 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
