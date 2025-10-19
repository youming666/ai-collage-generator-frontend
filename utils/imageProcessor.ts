export interface CollageParams {
  scale: number;
  offsetX: number;
  offsetY: number;
  blur: number;
  brightness: number;
}

export const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const compressImage = async (imageDataUrl: string, maxSizeKB: number = 50): Promise<string> => {
  const img = await loadImage(imageDataUrl);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  // 计算压缩后的尺寸，保持宽高比
  let width = img.width;
  let height = img.height;
  const maxDimension = 1024; // 最大边长

  if (width > maxDimension || height > maxDimension) {
    if (width > height) {
      height = (height * maxDimension) / width;
      width = maxDimension;
    } else {
      width = (width * maxDimension) / height;
      height = maxDimension;
    }
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);

  // 二分法查找合适的质量参数
  let quality = 0.9;
  let result = canvas.toDataURL('image/jpeg', quality);
  const targetSizeBytes = maxSizeKB * 1024;

  // 估算base64大小 (base64比原始大约33%)
  const getBase64Size = (base64: string) => {
    const base64Data = base64.split(',')[1];
    return (base64Data.length * 3) / 4;
  };

  let minQuality = 0.1;
  let maxQuality = 0.9;

  while (getBase64Size(result) > targetSizeBytes && quality > 0.1) {
    if (maxQuality - minQuality < 0.01) break;

    quality = (minQuality + maxQuality) / 2;
    result = canvas.toDataURL('image/jpeg', quality);

    if (getBase64Size(result) > targetSizeBytes) {
      maxQuality = quality;
    } else {
      minQuality = quality;
    }
  }

  console.log(`📦 图片压缩: ${Math.round(getBase64Size(imageDataUrl)/1024)}KB → ${Math.round(getBase64Size(result)/1024)}KB (质量: ${Math.round(quality*100)}%)`);

  return result;
};

export const cropTransparentArea = async (imageDataUrl: string): Promise<string> => {
  const img = await loadImage(imageDataUrl);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  let minX = canvas.width;
  let minY = canvas.height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const alpha = pixels[(y * canvas.width + x) * 4 + 3];
      if (alpha > 0) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  const croppedWidth = maxX - minX + 1;
  const croppedHeight = maxY - minY + 1;

  const croppedCanvas = document.createElement('canvas');
  const croppedCtx = croppedCanvas.getContext('2d')!;
  croppedCanvas.width = croppedWidth;
  croppedCanvas.height = croppedHeight;

  croppedCtx.drawImage(
    canvas,
    minX, minY, croppedWidth, croppedHeight,
    0, 0, croppedWidth, croppedHeight
  );

  return croppedCanvas.toDataURL('image/png');
};

export const createNineGrid = async (images: string[]): Promise<string> => {
  const gridSize = 3;
  const cellSize = 300;
  const gap = 10; // 白色间隙
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  // 画布尺寸 = 3个格子 + 2个间隙
  canvas.width = cellSize * gridSize + gap * (gridSize - 1);
  canvas.height = cellSize * gridSize + gap * (gridSize - 1);

  // 填充白色背景
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < Math.min(images.length, 9); i++) {
    if (!images[i]) continue;
    const img = await loadImage(images[i]);
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;

    // 计算位置 (加上间隙)
    const x = col * (cellSize + gap);
    const y = row * (cellSize + gap);

    ctx.save();
    ctx.drawImage(img, x, y, cellSize, cellSize);
    ctx.restore();
  }

  console.log(`📐 九宫格尺寸: ${canvas.width}×${canvas.height} (含${gap}px间隙)`);

  return canvas.toDataURL('image/png');
};

export const createBackground = async (gridImage: string, blur: number): Promise<string> => {
  const img = await loadImage(gridImage);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  // 背景比例 3:4
  const bgWidth = 1080;
  const bgHeight = 1440; // 3:4比例

  canvas.width = bgWidth;
  canvas.height = bgHeight;

  // 填充白色背景
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 计算九宫格缩放尺寸(适应背景宽度)
  const scale = bgWidth / img.width;
  const gridWidth = img.width * scale;
  const gridHeight = img.height * scale;

  // 九宫格底部对齐,上部留空
  const gridX = 0;
  const gridY = bgHeight - gridHeight;

  // 直接绘制九宫格,不添加模糊和遮罩
  ctx.drawImage(img, gridX, gridY, gridWidth, gridHeight);

  console.log(`📐 背景尺寸: ${bgWidth}×${bgHeight} (3:4), 九宫格位置: (${gridX}, ${Math.round(gridY)})`);

  return canvas.toDataURL('image/png');
};

export const compositeImage = async (
  backgroundImage: string,
  mainImage: string,
  params: CollageParams
): Promise<string> => {
  const bg = await loadImage(backgroundImage);
  const main = await loadImage(mainImage);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  canvas.width = bg.width;
  canvas.height = bg.height;

  // 绘制背景
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  // 步骤1: 计算缩放后的主图尺寸
  const scaledWidth = main.width * params.scale;
  const scaledHeight = main.height * params.scale;

  // 步骤2: 计算主图在画布中心时的位置
  const centerX = (canvas.width - scaledWidth) / 2;
  const centerY = (canvas.height - scaledHeight) / 2;

  // 步骤3: 计算可移动范围(主图尺寸和画布尺寸的差值)
  // 如果主图比画布小,可以在画布内移动
  // 如果主图比画布大,移动范围受限
  const moveRangeX = Math.max(0, canvas.width - scaledWidth);
  const moveRangeY = Math.max(0, canvas.height - scaledHeight);

  // 步骤4: 根据偏移百分比计算实际偏移量
  // offset: 0% → 左/上边缘, 50% → 居中, 100% → 右/下边缘
  const offsetRatioX = params.offsetX / 100;  // 0 ~ 1
  const offsetRatioY = params.offsetY / 100;

  // 步骤5: 计算最终位置
  // 0% → 从0开始, 50% → moveRange/2(居中), 100% → moveRange(右/下边缘)
  const x = offsetRatioX * moveRangeX;
  const y = offsetRatioY * moveRangeY;

  console.log(`📐 合成参数(以主图可移动范围为基准):`, {
    canvas: `${canvas.width}×${canvas.height}`,
    main: `${main.width}×${main.height}`,
    scaled: `${Math.round(scaledWidth)}×${Math.round(scaledHeight)}`,
    centerPos: `(${Math.round(centerX)}, ${Math.round(centerY)})`,
    moveRange: `${Math.round(moveRangeX)}×${Math.round(moveRangeY)}`,
    offset: `${params.offsetX}%, ${params.offsetY}%`,
    position: `(${Math.round(x)}, ${Math.round(y)})`,
  });

  // 步骤6: 绘制阴影
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 30;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 20;

  // 步骤7: 绘制主图
  ctx.drawImage(main, x, y, scaledWidth, scaledHeight);

  // 重置阴影
  ctx.shadowColor = 'transparent';

  return canvas.toDataURL('image/png');
};

export const downloadImage = (dataUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 图片分割功能：将一张图片分割成N×N宫格
export const splitImageIntoGrid = async (
  imageDataUrl: string,
  gridSize: number = 3, // 3=九宫格, 2=四宫格
  gap: number = 10 // 间隙大小(像素)
): Promise<string[]> => {
  const img = await loadImage(imageDataUrl);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  // 计算每个格子的尺寸
  const cellWidth = Math.floor(img.width / gridSize);
  const cellHeight = Math.floor(img.height / gridSize);

  const splitImages: string[] = [];

  // 遍历每个格子
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      // 创建新canvas用于绘制单个格子
      canvas.width = cellWidth;
      canvas.height = cellHeight;

      // 从原图裁剪对应区域
      const sx = col * cellWidth;
      const sy = row * cellHeight;

      ctx.drawImage(
        img,
        sx, sy, cellWidth, cellHeight, // 源图裁剪区域
        0, 0, cellWidth, cellHeight    // 目标canvas位置
      );

      splitImages.push(canvas.toDataURL('image/png'));
    }
  }

  console.log(`✂️ 图片分割完成: ${gridSize}×${gridSize} (${splitImages.length}张)`);
  return splitImages;
};

// 将分割后的图片重新组合展示(带间隙)
export const createSplitPreview = async (
  splitImages: string[],
  gridSize: number = 3,
  gap: number = 10
): Promise<string> => {
  if (splitImages.length === 0) return '';

  const firstImg = await loadImage(splitImages[0]);
  const cellWidth = firstImg.width;
  const cellHeight = firstImg.height;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  // 画布尺寸 = 格子尺寸 × 格子数 + 间隙 × (格子数-1)
  canvas.width = cellWidth * gridSize + gap * (gridSize - 1);
  canvas.height = cellHeight * gridSize + gap * (gridSize - 1);

  // 填充白色背景
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 绘制每个格子
  for (let i = 0; i < splitImages.length; i++) {
    const img = await loadImage(splitImages[i]);
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;

    const x = col * (cellWidth + gap);
    const y = row * (cellHeight + gap);

    ctx.drawImage(img, x, y, cellWidth, cellHeight);
  }

  return canvas.toDataURL('image/png');
};
