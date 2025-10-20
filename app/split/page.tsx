'use client';

import { useState, useRef } from 'react';
import {
  readFileAsBase64,
  splitImageIntoGrid,
  createSplitPreview,
  downloadImage,
} from '@/utils/imageProcessor';
import Link from 'next/link';
import SplitHeroSection from '@/components/SplitHeroSection';
import SplitDemoGallery from '@/components/SplitDemoGallery';
import SplitHowItWorks from '@/components/SplitHowItWorks';
import SplitUseCases from '@/components/SplitUseCases';
import Footer from '@/components/Footer';

export default function SplitPage() {
  const [sourceImage, setSourceImage] = useState<string>('');
  const [splitImages, setSplitImages] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [gridSize, setGridSize] = useState<number>(3); // 3=九宫格, 2=四宫格
  const [gap, setGap] = useState<number>(10);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 上传图片
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await readFileAsBase64(file);
      setSourceImage(base64);
      setSplitImages([]);
      setPreviewImage('');
    }
  };

  // 执行分割
  const handleSplit = async () => {
    if (!sourceImage) {
      alert('Please upload an image first!');
      return;
    }

    setIsProcessing(true);
    try {
      const splits = await splitImageIntoGrid(sourceImage, gridSize, gap);
      setSplitImages(splits);

      const preview = await createSplitPreview(splits, gridSize, gap);
      setPreviewImage(preview);
    } catch (error) {
      console.error('分割失败:', error);
      alert('Split failed, please try again');
    } finally {
      setIsProcessing(false);
    }
  };

  // 下载单张
  const handleDownloadSingle = (index: number) => {
    if (splitImages[index]) {
      downloadImage(splitImages[index], `split-${index + 1}.png`);
    }
  };

  // 下载所有
  const handleDownloadAll = () => {
    splitImages.forEach((img, index) => {
      setTimeout(() => {
        downloadImage(img, `split-${index + 1}.png`);
      }, index * 200); // 延迟下载避免浏览器阻止
    });
  };

  // 下载预览图
  const handleDownloadPreview = () => {
    if (previewImage) {
      downloadImage(previewImage, `split-preview-${gridSize}x${gridSize}.png`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <SplitHeroSection />

        {/* Demo Gallery */}
        <SplitDemoGallery />

        {/* How It Works */}
        <SplitHowItWorks />

        {/* Tool Section */}
        <div id="split-tool-section" className="mb-20 scroll-mt-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Try It Now — Split Your Photo
            </h2>
            <p className="text-gray-600">
              Upload your image and customize the split settings below
            </p>
          </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 左侧：上传和设置 */}
          <div className="lg:w-1/3 space-y-4">
            {/* 上传区 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Upload Image</h2>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full mb-3 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
              >
                Choose Image
              </button>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                {sourceImage ? (
                  <img src={sourceImage} alt="Source" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Click to upload image
                  </div>
                )}
              </div>
            </div>

            {/* 设置区 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Split Settings</h2>

              {/* 宫格选择 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grid Mode
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setGridSize(2)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      gridSize === 2
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    4-Grid (2×2)
                  </button>
                  <button
                    onClick={() => setGridSize(3)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      gridSize === 3
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    9-Grid (3×3)
                  </button>
                </div>
              </div>

              {/* 间隙设置 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gap Size: {gap}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={gap}
                  onChange={(e) => setGap(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* 分割按钮 */}
              <button
                onClick={handleSplit}
                disabled={!sourceImage || isProcessing}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Splitting...' : 'Start Split'}
              </button>
            </div>
          </div>

          {/* 右侧：预览和下载 */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Split Preview</h2>
                {splitImages.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={handleDownloadPreview}
                      className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm"
                    >
                      Download Preview
                    </button>
                    <button
                      onClick={handleDownloadAll}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
                    >
                      Download All ({splitImages.length})
                    </button>
                  </div>
                )}
              </div>

              {/* 预览图 */}
              {previewImage ? (
                <div className="mb-6">
                  <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="max-w-full max-h-[400px] sm:max-h-[600px] object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="mb-6 bg-gray-100 rounded-lg p-8 sm:p-12 flex items-center justify-center">
                  <p className="text-gray-400 text-xs sm:text-sm text-center">
                    Upload an image and click "Start Split" to preview
                  </p>
                </div>
              )}

              {/* 单张下载网格 */}
              {splitImages.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Individual Downloads (Click to download)
                  </h3>
                  <div className={`grid ${gridSize === 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-2`}>
                    {splitImages.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleDownloadSingle(idx)}
                        className="aspect-square bg-gray-100 rounded overflow-hidden border-2 border-gray-200 cursor-pointer hover:border-blue-500 transition-colors group relative"
                      >
                        <img src={img} alt={`Split ${idx + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                          <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1.5 py-0.5 rounded">
                          {idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>

        {/* Use Cases Section */}
        <SplitUseCases />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
