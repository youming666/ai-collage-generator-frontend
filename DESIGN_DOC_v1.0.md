# AI九宫格3D出图系统 - 详细设计说明文档 v1.0

> **文档版本**: v1.0
> **编写日期**: 2025-10-18
> **作者**: 大铭DAMING
> **项目状态**: 已完成并上线

---

## 📑 目录

1. [项目概述](#1-项目概述)
2. [需求分析](#2-需求分析)
3. [系统架构设计](#3-系统架构设计)
4. [功能模块设计](#4-功能模块设计)
5. [前端设计](#5-前端设计)
6. [后端设计](#6-后端设计)
7. [数据库设计](#7-数据库设计)
8. [接口设计](#8-接口设计)
9. [算法设计](#9-算法设计)
10. [UI/UX设计](#10-uiux设计)
11. [安全设计](#11-安全设计)
12. [性能优化](#12-性能优化)
13. [测试方案](#13-测试方案)
14. [部署方案](#14-部署方案)
15. [运维监控](#15-运维监控)

---

## 1. 项目概述

### 1.1 项目背景

随着社交媒体的普及，用户对个性化图片分享的需求日益增长。特别是朋友圈九宫格图片，已成为一种流行的内容展示方式。然而，现有工具存在以下问题：

- 💔 操作复杂，需要专业软件
- 💔 缺乏创意效果，千篇一律
- 💔 无法智能处理主体抠图
- 💔 移动端体验差

本项目旨在提供一个简单易用、效果出众的在线工具，让普通用户也能制作出专业级的3D出格效果图片。

### 1.2 项目目标

#### 核心目标
- ✅ 实现九宫格自动排版
- ✅ 支持主图AI智能抠图
- ✅ 生成3D出格效果
- ✅ 提供PC/移动端无缝体验

#### 技术目标
- ⚡ 前端Canvas实时处理
- 🤖 后端AI模型集成
- 📱 响应式布局设计
- 🔒 数据安全与隐私保护

### 1.3 应用场景

| 场景 | 描述 | 用户群体 |
|------|------|---------|
| 朋友圈分享 | 制作九宫格旅游照片 | 普通用户 |
| 电商宣传 | 产品多角度展示 | 商家 |
| 个人作品集 | 摄影作品整理 | 设计师 |
| 活动海报 | 活动图片合成 | 运营人员 |

### 1.4 技术栈选型

| 层级 | 技术 | 理由 |
|------|------|------|
| 前端 | HTML5 + CSS3 + JavaScript | 轻量、兼容性好 |
| 图像处理 | Canvas API | 浏览器原生支持 |
| 后端 | Flask (Python 3.8+) | 快速开发、生态丰富 |
| AI抠图 | rembg (U²-Net) | 开源、效果好、无需GPU |
| 图像库 | Pillow | Python标准图像处理库 |
| 跨域 | Flask-CORS | 支持前后端分离 |

---

## 2. 需求分析

### 2.1 功能性需求

#### FR-01: 图片上传
- **需求描述**: 用户可以上传9张九宫格图片和1张主图
- **输入**: 图片文件 (JPG/PNG)
- **输出**: 图片预览与成功提示
- **约束**:
  - 九宫格恰好9张
  - 主图恰好1张
  - 单张图片 ≤ 10MB
  - 支持拖拽上传

#### FR-02: 九宫格管理
- **需求描述**: 用户可以调整九宫格图片的排列顺序
- **输入**: 拖拽操作
- **输出**: 实时预览更新
- **约束**:
  - 仅支持3x3网格内部交换
  - 拖拽有视觉反馈

#### FR-03: 主图抠图
- **需求描述**: 系统自动去除主图背景
- **输入**: 原始主图
- **输出**: 透明背景PNG
- **约束**:
  - 后端服务可用时启用
  - 处理失败降级使用原图
  - 处理时长 < 10秒

#### FR-04: 智能裁剪
- **需求描述**: 自动裁剪抠图后的透明区域
- **输入**: 透明背景PNG
- **输出**: 紧贴主体的裁剪图
- **约束**:
  - 保留所有非透明像素
  - 计算最小包围矩形

#### FR-05: 参数调整
- **需求描述**: 用户可调整主图位置和大小
- **输入**: 滑块操作
- **输出**: 实时预览
- **参数**:
  - 水平偏移: 0-200px
  - 垂直偏移: 0-200px
  - 主图缩放: 0.5-1.5倍

#### FR-06: 图片合成
- **需求描述**: 将九宫格和主图合成为最终效果图
- **输入**: 九宫格数组、主图、参数
- **输出**: 3:4比例合成图
- **约束**:
  - 九宫格底部对齐
  - 主图右上角叠加
  - 添加阴影效果

#### FR-07: 图片下载
- **需求描述**: 用户可下载生成的图片
- **输入**: 点击下载按钮
- **输出**: JPEG文件
- **约束**:
  - 格式: JPEG
  - 质量: 95%
  - 文件名: 3D-九宫格-{时间戳}.jpg

#### FR-08: 重置功能
- **需求描述**: 用户可清空所有数据重新开始
- **输入**: 点击重置按钮
- **输出**: 恢复初始状态
- **约束**:
  - 清空所有上传图片
  - 重置所有参数
  - 清空预览区

### 2.2 非功能性需求

#### NFR-01: 性能要求
| 指标 | 目标值 | 测量方法 |
|------|--------|---------|
| 页面加载时间 | < 2s | Performance API |
| 图片上传响应 | < 1s | 文件读取时长 |
| 参数调整延迟 | < 100ms | requestAnimationFrame |
| 抠图处理时长 | < 10s | API响应时间 |
| 下载生成时间 | < 1s | Blob创建时长 |

#### NFR-02: 兼容性要求
- **浏览器**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **操作系统**: Windows 10+, macOS 11+, Android 10+, iOS 14+
- **屏幕分辨率**: 最小 1024x768

#### NFR-03: 可用性要求
- 用户无需培训即可上手
- 操作步骤 ≤ 5步
- 错误提示清晰明了
- 支持拖拽等快捷操作

#### NFR-04: 可靠性要求
- 系统可用性 ≥ 99.5%
- 错误恢复能力: 自动降级
- 数据丢失率: 0%（本地处理）

#### NFR-05: 安全性要求
- 用户数据不上传到服务器（抠图除外）
- 临时文件2小时后自动删除
- 防止文件上传攻击
- CORS跨域保护

#### NFR-06: 可维护性要求
- 代码注释覆盖率 ≥ 30%
- 模块化设计
- 遵循ESLint规范
- Git版本控制

---

## 3. 系统架构设计

### 3.1 整体架构

```
┌─────────────────────────────────────────────────────┐
│                    用户层 (User)                     │
│              PC浏览器 / 移动浏览器                    │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│                  前端展示层 (View)                   │
│  ┌──────────────┬──────────────┬──────────────┐    │
│  │  上传模块    │  预览模块    │  控制模块    │    │
│  └──────────────┴──────────────┴──────────────┘    │
│  ┌────────────────────────────────────────────┐    │
│  │            Canvas渲染引擎                   │    │
│  └────────────────────────────────────────────┘    │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP/HTTPS
                       ▼
┌─────────────────────────────────────────────────────┐
│                  后端服务层 (Service)                │
│  ┌──────────────┬──────────────┬──────────────┐    │
│  │  文件处理    │  抠图服务    │  图片合成    │    │
│  └──────────────┴──────────────┴──────────────┘    │
│  ┌────────────────────────────────────────────┐    │
│  │            Flask Web框架                    │    │
│  └────────────────────────────────────────────┘    │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│                  AI模型层 (Model)                    │
│  ┌────────────────────────────────────────────┐    │
│  │            rembg (U²-Net)                   │    │
│  │         Background Removal Model            │    │
│  └────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

### 3.2 技术架构分层

#### 3.2.1 表现层 (Presentation Layer)
- **职责**: 用户交互、UI展示、事件处理
- **技术**: HTML5、CSS3、JavaScript ES6+
- **组件**:
  - 上传组件 (Upload)
  - 网格组件 (Grid)
  - 滑块组件 (Slider)
  - 画布组件 (Canvas)

#### 3.2.2 业务逻辑层 (Business Logic Layer)
- **职责**: 图像处理、数据转换、状态管理
- **技术**: JavaScript + Canvas API
- **模块**:
  - 图片加载模块
  - 拖拽管理模块
  - 图像合成模块
  - 参数计算模块

#### 3.2.3 数据访问层 (Data Access Layer)
- **职责**: API调用、文件读写、数据缓存
- **技术**: Fetch API、FileReader API
- **服务**:
  - 上传服务
  - 抠图服务
  - 下载服务

#### 3.2.4 服务层 (Service Layer)
- **职责**: 后端业务处理、AI模型调用
- **技术**: Flask、Pillow、rembg
- **API**:
  - /health (健康检查)
  - /remove_bg (抠图接口)
  - /upload (上传接口，预留)

### 3.3 部署架构

#### 开发环境
```
本地开发机
├── 前端: Live Server (VSCode)
├── 后端: Flask Development Server
└── 模型: 本地加载 rembg
```

#### 生产环境（建议）
```
┌──────────────┐
│   用户端     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   CDN/静态  │ (前端: Vercel/Netlify)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   后端服务   │ (Flask: Render/Railway)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   AI模型层   │ (rembg模型缓存)
└──────────────┘
```

### 3.4 数据流设计

#### 完整数据流程
```
1. 用户上传图片
   ↓
2. 前端FileReader读取
   ↓
3. 转换为Base64/Blob
   ↓
4. 存储到state对象
   ↓
5. Canvas预览渲染
   ↓
6. 用户点击生成
   ↓
7. 主图发送到后端 (/remove_bg)
   ↓
8. 后端rembg处理
   ↓
9. 返回透明PNG
   ↓
10. 前端裁剪透明区域
   ↓
11. Canvas合成九宫格+主图
   ↓
12. 生成最终图片
   ↓
13. 用户下载Blob
```

---

## 4. 功能模块设计

### 4.1 模块划分

```
AI九宫格3D出图系统
├── 前端模块
│   ├── 上传管理模块 (UploadManager)
│   │   ├── 九宫格上传
│   │   ├── 主图上传
│   │   └── 文件验证
│   ├── 拖拽交互模块 (DragDropManager)
│   │   ├── 九宫格排序
│   │   ├── 文件拖入
│   │   └── 视觉反馈
│   ├── 图像处理模块 (ImageProcessor)
│   │   ├── 九宫格生成
│   │   ├── 背景创建
│   │   ├── 图片合成
│   │   └── 透明裁剪
│   ├── 参数控制模块 (ParameterController)
│   │   ├── 滑块控制
│   │   ├── 实时预览
│   │   └── 数值校验
│   ├── 渲染引擎模块 (RenderEngine)
│   │   ├── Canvas管理
│   │   ├── 图片绘制
│   │   └── 阴影特效
│   └── 下载模块 (DownloadManager)
│       ├── Blob生成
│       ├── 文件命名
│       └── 触发下载
├── 后端模块
│   ├── Web服务模块 (WebServer)
│   │   ├── Flask应用
│   │   ├── 路由管理
│   │   └── CORS配置
│   ├── 文件处理模块 (FileHandler)
│   │   ├── 上传接收
│   │   ├── 格式转换
│   │   └── 临时存储
│   ├── AI抠图模块 (BackgroundRemoval)
│   │   ├── rembg调用
│   │   ├── 模型管理
│   │   └── 结果返回
│   └── 定时清理模块 (CleanupService)
│       ├── 文件扫描
│       ├── 过期判断
│       └── 自动删除
└── 工具模块
    ├── 状态管理 (StateManager)
    ├── 错误处理 (ErrorHandler)
    ├── 日志记录 (Logger)
    └── 性能监控 (PerformanceMonitor)
```

### 4.2 模块详细设计

#### 4.2.1 上传管理模块 (UploadManager)

**职责**: 处理用户图片上传、文件验证、预览展示

**主要函数**:
```javascript
class UploadManager {
    // 九宫格上传处理
    handleGridUpload(files: File[]): void

    // 主图上传处理
    handleMainUpload(file: File): void

    // 文件验证
    validateFile(file: File): boolean

    // 文件读取
    readFileAsDataURL(file: File): Promise<string>

    // 预览显示
    displayPreview(dataURL: string, index: number): void
}
```

**数据结构**:
```javascript
{
    gridImages: string[],      // 九宫格图片Base64数组
    mainImage: string | null,  // 主图Base64
    uploadCount: number         // 已上传计数
}
```

**流程图**:
```
[用户选择文件]
    ↓
[验证文件类型和大小]
    ↓ 通过
[FileReader读取为DataURL]
    ↓
[存储到state.gridImages/mainImage]
    ↓
[调用displayPreview显示]
    ↓
[更新上传计数]
    ↓
[检查是否可生成]
```

#### 4.2.2 拖拽交互模块 (DragDropManager)

**职责**: 处理九宫格内部拖拽排序、文件拖拽上传

**主要函数**:
```javascript
class DragDropManager {
    // 初始化拖拽事件
    initDragDrop(): void

    // 拖拽开始
    handleDragStart(event: DragEvent): void

    // 拖拽悬停
    handleDragOver(event: DragEvent): void

    // 拖拽放下
    handleDrop(event: DragEvent): void

    // 拖拽结束
    handleDragEnd(event: DragEvent): void

    // 交换图片
    swapImages(fromIndex: number, toIndex: number): void
}
```

**状态管理**:
```javascript
{
    draggedCell: HTMLElement | null,  // 当前拖拽元素
    draggedIndex: number,              // 拖拽源索引
    dropTargetIndex: number            // 拖拽目标索引
}
```

**事件流**:
```
dragstart → 记录源元素，设置透明度0.5
    ↓
dragover → 阻止默认行为，显示蓝色边框
    ↓
drop → 交换数组数据，刷新UI
    ↓
dragend → 恢复透明度，清除高亮
```

#### 4.2.3 图像处理模块 (ImageProcessor)

**职责**: 核心图像处理逻辑

**主要函数**:
```javascript
class ImageProcessor {
    // 创建九宫格
    createNineGrid(images: string[]): Promise<HTMLCanvasElement>

    // 创建3:4背景
    createBackground(grid: HTMLCanvasElement): Promise<HTMLCanvasElement>

    // 合成最终图片
    compositeImage(bg: HTMLCanvasElement, main: HTMLImageElement): Promise<HTMLCanvasElement>

    // 裁剪透明区域
    cropTransparentArea(img: HTMLImageElement): Promise<HTMLImageElement>

    // 调用后端抠图
    removeBackground(dataURL: string): Promise<HTMLImageElement>
}
```

**核心算法 - 创建九宫格**:
```javascript
function createNineGrid(images) {
    const cellSize = 300;
    const gap = 10;
    const totalSize = cellSize * 3 + gap * 2;  // 920px

    const canvas = new Canvas(totalSize, totalSize);
    const ctx = canvas.getContext('2d');

    // 填充白色背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, totalSize, totalSize);

    // 绘制9张图片
    for (let i = 0; i < 9; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const x = col * (cellSize + gap);
        const y = row * (cellSize + gap);

        ctx.drawImage(images[i], x, y, cellSize, cellSize);
    }

    return canvas;
}
```

**核心算法 - 透明裁剪**:
```javascript
function cropTransparentArea(img) {
    // 1. 创建临时canvas
    const tempCanvas = createCanvas(img.width, img.height);
    const ctx = tempCanvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // 2. 获取像素数据
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    // 3. 扫描边界
    let minX = img.width, minY = img.height;
    let maxX = 0, maxY = 0;

    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            const alpha = data[(y * img.width + x) * 4 + 3];
            if (alpha > 0) {
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
            }
        }
    }

    // 4. 裁剪
    const cropWidth = maxX - minX + 1;
    const cropHeight = maxY - minY + 1;
    const croppedCanvas = createCanvas(cropWidth, cropHeight);

    croppedCanvas.getContext('2d').drawImage(
        tempCanvas,
        minX, minY, cropWidth, cropHeight,
        0, 0, cropWidth, cropHeight
    );

    return canvasToImage(croppedCanvas);
}
```

#### 4.2.4 参数控制模块 (ParameterController)

**职责**: 管理用户参数调整

**主要函数**:
```javascript
class ParameterController {
    // 初始化滑块
    initSliders(): void

    // 更新偏移量
    updateOffset(axis: 'x' | 'y', value: number): void

    // 更新缩放
    updateScale(value: number): void

    // 触发实时预览
    triggerPreview(): void
}
```

**参数定义**:
```javascript
{
    offsetX: {
        min: 0,
        max: 200,
        default: 50,
        unit: 'px'
    },
    offsetY: {
        min: 0,
        max: 200,
        default: 50,
        unit: 'px'
    },
    scale: {
        min: 0.5,
        max: 1.5,
        default: 0.9,
        step: 0.1
    }
}
```

#### 4.2.5 渲染引擎模块 (RenderEngine)

**职责**: Canvas渲染管理

**主要函数**:
```javascript
class RenderEngine {
    // 初始化Canvas
    initCanvas(width: number, height: number): void

    // 清空Canvas
    clearCanvas(): void

    // 绘制图片
    drawImage(img: HTMLImageElement, x: number, y: number, w: number, h: number): void

    // 添加阴影
    applyShadow(color: string, blur: number, offsetX: number, offsetY: number): void

    // 导出为Blob
    toBlob(type: string, quality: number): Promise<Blob>
}
```

**Canvas优化**:
```javascript
// 使用离屏Canvas提升性能
const offscreenCanvas = new OffscreenCanvas(width, height);

// 使用willReadFrequently优化读取
const ctx = canvas.getContext('2d', { willReadFrequently: true });

// 批量绘制减少重绘
ctx.save();
// ... 多次绘制
ctx.restore();
```

---

## 5. 前端设计

### 5.1 页面结构设计

#### 5.1.1 HTML结构树
```html
<body>
  <div class="container">
    <header>
      <h1>标题</h1>
      <p>副标题</p>
    </header>

    <main class="main-layout">
      <!-- 左侧面板 -->
      <div class="left-panel">
        <section class="grid-upload-section">
          <h2>九宫格图片 (9张)</h2>
          <div class="upload-box"></div>
          <div class="grid-container">
            <div class="grid-cell" data-index="0-8"></div>
          </div>
        </section>

        <section class="main-upload-section">
          <h2>主图 (1张)</h2>
          <div class="upload-box small"></div>
          <div class="main-preview"></div>
        </section>
      </div>

      <!-- 右侧面板 -->
      <div class="right-panel">
        <section class="control-panel">
          <h2>调整参数</h2>
          <div class="controls">
            <div class="control-item">滑块</div>
          </div>
          <button class="btn-generate">生成</button>
        </section>

        <section class="result-section">
          <h2>生成结果</h2>
          <div class="result-container">
            <canvas id="resultCanvas"></canvas>
            <div class="result-placeholder"></div>
          </div>
          <div class="result-actions">
            <button class="btn-download">下载</button>
            <button class="btn-reset">重置</button>
          </div>
        </section>
      </div>
    </main>

    <footer>版权信息</footer>
  </div>
</body>
```

#### 5.1.2 组件层次结构
```
Container (容器)
├── Header (头部)
│   ├── Title (标题)
│   └── Subtitle (副标题)
├── MainLayout (主布局)
│   ├── LeftPanel (左侧面板)
│   │   ├── GridUploadSection (九宫格上传区)
│   │   │   ├── UploadBox (上传框)
│   │   │   └── GridContainer (九宫格容器)
│   │   │       └── GridCell x9 (单元格)
│   │   └── MainUploadSection (主图上传区)
│   │       ├── UploadBox (上传框)
│   │       └── MainPreview (主图预览)
│   └── RightPanel (右侧面板)
│       ├── ControlPanel (控制面板)
│       │   ├── Controls (控制项)
│       │   │   └── ControlItem x3 (滑块)
│       │   └── GenerateButton (生成按钮)
│       └── ResultSection (结果区)
│           ├── ResultContainer (结果容器)
│           │   ├── ResultCanvas (画布)
│           │   └── Placeholder (占位符)
│           └── ResultActions (操作按钮)
│               ├── DownloadButton (下载)
│               └── ResetButton (重置)
└── Footer (底部)
```

### 5.2 CSS设计规范

#### 5.2.1 颜色系统
```css
:root {
    /* 主色调 */
    --primary-color: #667eea;
    --primary-dark: #764ba2;

    /* 中性色 */
    --text-primary: #333;
    --text-secondary: #666;
    --text-hint: #999;
    --border-color: #ddd;
    --bg-light: #f8f9ff;
    --bg-gray: #f5f5f5;

    /* 功能色 */
    --success: #52c41a;
    --warning: #faad14;
    --error: #f5222d;

    /* 阴影 */
    --shadow-sm: 0 2px 8px rgba(0,0,0,0.1);
    --shadow-md: 0 4px 12px rgba(0,0,0,0.15);
    --shadow-lg: 0 8px 24px rgba(0,0,0,0.2);
}
```

#### 5.2.2 字体系统
```css
:root {
    --font-family-base: -apple-system, BlinkMacSystemFont,
                        'Segoe UI', 'PingFang SC',
                        'Hiragino Sans GB', 'Microsoft YaHei',
                        sans-serif;

    --font-size-xs: 0.75rem;   /* 12px */
    --font-size-sm: 0.875rem;  /* 14px */
    --font-size-md: 1rem;      /* 16px */
    --font-size-lg: 1.125rem;  /* 18px */
    --font-size-xl: 1.5rem;    /* 24px */
    --font-size-2xl: 2rem;     /* 32px */

    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 700;
}
```

#### 5.2.3 间距系统
```css
:root {
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-2xl: 48px;
}
```

#### 5.2.4 布局断点
```css
/* 响应式断点 */
@media (max-width: 768px) {   /* 手机 */
    .main-layout { grid-template-columns: 1fr; }
}

@media (min-width: 769px) and (max-width: 1024px) {  /* 平板 */
    .main-layout { grid-template-columns: 1fr; }
}

@media (min-width: 1025px) {  /* PC */
    .main-layout { grid-template-columns: 1fr 2fr; }
}
```

### 5.3 JavaScript设计模式

#### 5.3.1 状态管理模式
```javascript
// 全局状态对象
const state = {
    gridImages: [],
    mainImage: null,
    offsetX: 50,
    offsetY: 50,
    scale: 0.9,
    useBackend: false,
    isGenerated: false
};

// 状态更新函数
function setState(updates) {
    Object.assign(state, updates);
    onStateChange();
}

// 状态监听
function onStateChange() {
    // 触发UI更新
    updateUI();
    // 触发预览刷新
    if (state.isGenerated) {
        updatePreview();
    }
}
```

#### 5.3.2 事件委托模式
```javascript
// 统一事件处理
document.addEventListener('click', (e) => {
    const target = e.target;

    if (target.matches('.upload-box')) {
        handleUploadClick(e);
    } else if (target.matches('.grid-cell')) {
        handleCellClick(e);
    } else if (target.matches('.btn-generate')) {
        handleGenerate(e);
    }
});
```

#### 5.3.3 Promise链式调用
```javascript
async function generateImage() {
    try {
        const grid = await createNineGrid(state.gridImages);
        const background = await createBackground(grid);
        const mainImg = await loadImage(state.mainImage);

        if (state.useBackend) {
            mainImg = await removeBackground(mainImg);
            mainImg = await cropTransparentArea(mainImg);
        }

        const result = await compositeImage(background, mainImg);
        displayResult(result);
    } catch (error) {
        handleError(error);
    }
}
```

---

## 6. 后端设计

### 6.1 Flask应用结构

```python
# app.py - 主应用文件

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from PIL import Image
import io
import os
from rembg import remove

app = Flask(__name__)
CORS(app)

# 配置
UPLOAD_FOLDER = 'temp_images'
MAX_FILE_SIZE = 10 * 1024 * 1024
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# 路由定义
@app.route('/health', methods=['GET'])
def health():
    """健康检查"""
    return jsonify({"status": "ok"})

@app.route('/remove_bg', methods=['POST'])
def remove_bg():
    """抠图接口"""
    # 实现逻辑
    pass

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
```

### 6.2 API接口设计

#### 6.2.1 健康检查接口

**接口**: `GET /health`

**描述**: 检查服务是否正常运行

**请求**: 无参数

**响应**:
```json
{
    "status": "ok",
    "message": "服务运行正常",
    "version": "1.0.0"
}
```

**状态码**:
- 200: 服务正常

#### 6.2.2 抠图接口

**接口**: `POST /remove_bg`

**描述**: 对上传的图片进行背景移除

**请求**:
- Content-Type: `multipart/form-data`
- Body:
  ```
  image: File (图片文件)
  ```

**响应**:
- Content-Type: `image/png`
- Body: PNG图片二进制数据

**状态码**:
- 200: 处理成功
- 400: 请求错误（无文件、格式错误）
- 500: 服务器错误

**错误响应**:
```json
{
    "error": "错误信息"
}
```

**实现代码**:
```python
@app.route('/remove_bg', methods=['POST'])
def remove_bg():
    try:
        # 验证文件
        if 'image' not in request.files:
            return jsonify({"error": "没有图片上传"}), 400

        file = request.files['image']

        # 读取图片
        input_image = file.read()

        # 调用rembg
        output_image = remove(input_image)

        # 返回结果
        return send_file(
            io.BytesIO(output_image),
            mimetype='image/png',
            as_attachment=False
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500
```

### 6.3 文件处理设计

#### 6.3.1 临时文件管理
```python
import threading
import time
from datetime import datetime, timedelta

def clean_old_files():
    """定时清理2小时前的临时文件"""
    while True:
        try:
            now = datetime.now()
            for filename in os.listdir(UPLOAD_FOLDER):
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                if os.path.isfile(filepath):
                    file_time = datetime.fromtimestamp(
                        os.path.getmtime(filepath)
                    )
                    if now - file_time > timedelta(hours=2):
                        os.remove(filepath)
                        print(f"已清理文件: {filename}")
        except Exception as e:
            print(f"清理文件时出错: {e}")

        time.sleep(3600)  # 每小时检查一次

# 启动清理线程
cleanup_thread = threading.Thread(
    target=clean_old_files,
    daemon=True
)
cleanup_thread.start()
```

#### 6.3.2 文件验证
```python
def allowed_file(filename):
    """检查文件扩展名"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_file_size(file):
    """检查文件大小"""
    file.seek(0, os.SEEK_END)
    file_size = file.tell()
    file.seek(0)
    return file_size <= MAX_FILE_SIZE
```

### 6.4 AI模型集成

#### 6.4.1 rembg配置
```python
from rembg import remove, new_session

# 创建会话（可选，用于性能优化）
session = new_session("u2net")

def remove_background(image_data):
    """使用rembg去除背景"""
    return remove(
        image_data,
        session=session,
        alpha_matting=True,  # 启用alpha抠图优化
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
        alpha_matting_erode_size=10
    )
```

#### 6.4.2 模型性能优化
```python
# 模型缓存
from functools import lru_cache

@lru_cache(maxsize=1)
def get_model_session():
    """缓存模型会话"""
    return new_session("u2net")

# 批量处理
def batch_remove_bg(images):
    """批量处理多张图片"""
    session = get_model_session()
    results = []
    for img in images:
        result = remove(img, session=session)
        results.append(result)
    return results
```

---

## 7. 数据库设计

**注**: 当前版本 (v1.0) 为纯前端处理 + 无状态后端，**不需要数据库**。

### 7.1 无数据库方案

#### 优势
- ✅ 简化部署，无需维护数据库
- ✅ 降低成本，无存储费用
- ✅ 保护隐私，数据不落盘
- ✅ 天然分布式，无单点故障

#### 数据存储策略
| 数据类型 | 存储位置 | 生命周期 |
|---------|---------|---------|
| 九宫格图片 | 前端内存 (state.gridImages) | 会话级 |
| 主图 | 前端内存 (state.mainImage) | 会话级 |
| 生成结果 | Canvas (可导出) | 会话级 |
| 临时抠图文件 | 后端临时目录 | 2小时 |

### 7.2 未来扩展方案（V2.0+）

如需添加用户系统、历史记录等功能，可使用以下数据库设计：

#### 用户表 (users)
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);
```

#### 作品表 (works)
```sql
CREATE TABLE works (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(100),
    grid_images JSON NOT NULL,  -- 九宫格图片URL数组
    main_image VARCHAR(255) NOT NULL,
    result_image VARCHAR(255) NOT NULL,
    parameters JSON,  -- 存储参数设置
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## 8. 接口设计

### 8.1 RESTful API规范

#### 8.1.1 URL设计规则
- 使用名词复数表示资源
- 使用HTTP动词表示操作
- 使用小写字母，单词用连字符分隔

#### 8.1.2 HTTP状态码
| 状态码 | 含义 | 使用场景 |
|-------|------|---------|
| 200 | OK | 请求成功 |
| 201 | Created | 资源创建成功 |
| 400 | Bad Request | 请求参数错误 |
| 404 | Not Found | 资源不存在 |
| 500 | Internal Server Error | 服务器错误 |

### 8.2 API接口清单

| 接口 | 方法 | 描述 | 状态 |
|------|-----|------|------|
| /health | GET | 健康检查 | ✅ 已实现 |
| /remove_bg | POST | AI抠图 | ✅ 已实现 |
| /upload | POST | 文件上传 | ⏳ 预留 |
| /compose | POST | 图片合成 | ⏳ 预留 |
| /download/:id | GET | 下载结果 | ⏳ 预留 |

### 8.3 前端调用示例

#### 8.3.1 抠图API调用
```javascript
async function callRemoveBgAPI(imageDataUrl) {
    // 1. 转换为Blob
    const blob = await dataURLtoBlob(imageDataUrl);

    // 2. 构建FormData
    const formData = new FormData();
    formData.append('image', blob, 'image.jpg');

    // 3. 发送请求
    const response = await fetch('http://localhost:5000/remove_bg', {
        method: 'POST',
        body: formData
    });

    // 4. 处理响应
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 5. 获取结果
    const resultBlob = await response.blob();
    const resultUrl = URL.createObjectURL(resultBlob);

    // 6. 加载图片
    const img = await loadImage(resultUrl);

    // 7. 清理URL
    URL.revokeObjectURL(resultUrl);

    return img;
}
```

#### 8.3.2 错误处理
```javascript
try {
    const result = await callRemoveBgAPI(imageData);
    displayResult(result);
} catch (error) {
    if (error.message.includes('Failed to fetch')) {
        console.error('后端服务不可用，使用原图');
        fallbackToOriginal();
    } else {
        console.error('抠图失败:', error);
        showErrorMessage('处理失败，请重试');
    }
}
```

---

## 9. 算法设计

### 9.1 核心算法概览

| 算法名称 | 复杂度 | 功能 | 优化点 |
|---------|--------|------|--------|
| 九宫格生成 | O(9) | 拼接9张图 | Canvas批量绘制 |
| 背景创建 | O(1) | 创建3:4画布 | 预计算尺寸 |
| 透明裁剪 | O(n×m) | 扫描像素 | 早停优化 |
| 图片缩放 | O(1) | 等比计算 | 缓存比例 |
| 阴影绘制 | O(1) | Canvas API | 硬件加速 |

### 9.2 透明区域裁剪算法详解

#### 9.2.1 算法描述
```
输入: 透明背景PNG图片
输出: 裁剪后的紧凑图片

步骤:
1. 将图片绘制到Canvas
2. 获取像素数据ImageData
3. 遍历所有像素，找到alpha > 0的边界
4. 计算最小包围矩形(minX, minY, maxX, maxY)
5. 裁剪并返回新图片
```

#### 9.2.2 伪代码
```
function cropTransparentArea(image):
    canvas = createCanvas(image.width, image.height)
    ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0)

    imageData = ctx.getImageData(0, 0, image.width, image.height)
    data = imageData.data

    minX = image.width
    minY = image.height
    maxX = 0
    maxY = 0

    for y from 0 to image.height - 1:
        for x from 0 to image.width - 1:
            index = (y * image.width + x) * 4
            alpha = data[index + 3]

            if alpha > 0:
                minX = min(minX, x)
                minY = min(minY, y)
                maxX = max(maxX, x)
                maxY = max(maxY, y)

    if minX > maxX or minY > maxY:
        return image  // 全透明，返回原图

    cropWidth = maxX - minX + 1
    cropHeight = maxY - minY + 1

    croppedCanvas = createCanvas(cropWidth, cropHeight)
    croppedCtx = croppedCanvas.getContext('2d')

    croppedCtx.drawImage(
        canvas,
        minX, minY, cropWidth, cropHeight,
        0, 0, cropWidth, cropHeight
    )

    return canvasToImage(croppedCanvas)
```

#### 9.2.3 优化策略

**1. 早停优化**
```javascript
// 一旦找到第一个非透明像素，记录行号，减少扫描
let firstNonTransparentRow = -1;
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        if (data[...] > 0) {
            firstNonTransparentRow = y;
            break;
        }
    }
    if (firstNonTransparentRow !== -1) break;
}
```

**2. 分块扫描**
```javascript
// 先粗扫描找到大致范围，再精确扫描
const blockSize = 10;
// ... 分块逻辑
```

**3. Web Worker并行**
```javascript
// 将扫描任务分配到多个Worker
const workers = [worker1, worker2, worker3, worker4];
// 分别扫描上下左右四个方向
```

### 9.3 图片缩放算法

#### 9.3.1 等比缩放计算
```javascript
function calculateScaledSize(imgWidth, imgHeight, maxWidth, maxHeight) {
    let drawWidth = imgWidth;
    let drawHeight = imgHeight;

    // 判断是否超出范围
    if (drawWidth > maxWidth || drawHeight > maxHeight) {
        // 计算宽高比
        const ratioW = maxWidth / drawWidth;
        const ratioH = maxHeight / drawHeight;

        // 取较小的比例，确保都不超出
        const ratio = Math.min(ratioW, ratioH);

        drawWidth *= ratio;
        drawHeight *= ratio;
    }

    return { width: drawWidth, height: drawHeight };
}
```

#### 9.3.2 缩放质量优化
```javascript
// 使用高质量缩放算法
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high';

// 对于大图，使用多步缩放
function downsampleImage(img, targetWidth, targetHeight) {
    let currentWidth = img.width;
    let currentHeight = img.height;

    while (currentWidth > targetWidth * 2 || currentHeight > targetHeight * 2) {
        currentWidth = Math.ceil(currentWidth / 2);
        currentHeight = Math.ceil(currentHeight / 2);

        // 中间步骤
        const tempCanvas = createCanvas(currentWidth, currentHeight);
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(img, 0, 0, currentWidth, currentHeight);

        img = tempCanvas;
    }

    // 最终缩放
    const finalCanvas = createCanvas(targetWidth, targetHeight);
    const finalCtx = finalCanvas.getContext('2d');
    finalCtx.drawImage(img, 0, 0, targetWidth, targetHeight);

    return finalCanvas;
}
```

### 9.4 阴影效果算法

```javascript
function applyShadowEffect(ctx, options = {}) {
    const {
        color = 'rgba(0, 0, 0, 0.3)',
        blur = 20,
        offsetX = 5,
        offsetY = 5
    } = options;

    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.shadowOffsetX = offsetX;
    ctx.shadowOffsetY = offsetY;
}

// 绘制后重置阴影
ctx.shadowColor = 'transparent';
ctx.shadowBlur = 0;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
```

---

## 10. UI/UX设计

### 10.1 设计原则

#### 10.1.1 简洁性 (Simplicity)
- 最小化操作步骤
- 清晰的视觉层级
- 减少认知负担

#### 10.1.2 一致性 (Consistency)
- 统一的色彩系统
- 统一的交互方式
- 统一的文案风格

#### 10.1.3 反馈性 (Feedback)
- 即时的视觉反馈
- 清晰的状态提示
- 友好的错误信息

#### 10.1.4 可访问性 (Accessibility)
- 足够的点击区域
- 清晰的文字对比度
- 键盘导航支持

### 10.2 交互设计

#### 10.2.1 上传交互流程
```
[初始状态: 上传框]
    ↓ 点击 / 拖拽
[文件选择器 / 放下文件]
    ↓
[验证文件]
    ↓ 成功
[显示加载动画]
    ↓
[显示预览缩略图]
    ↓
[更新上传计数]
```

#### 10.2.2 拖拽交互状态
| 状态 | 视觉效果 | 触发条件 |
|------|---------|---------|
| 默认 | 正常显示 | 无操作 |
| 悬停 | 放大1.05倍 + 阴影 | 鼠标悬停 |
| 拖拽中 | 透明度0.5 | dragstart |
| 拖拽目标 | 蓝色边框高亮 | dragover |
| 放下 | 交换位置 + 动画 | drop |

#### 10.2.3 滑块交互优化
```javascript
// 防抖优化
let debounceTimer;
slider.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        updatePreview();
    }, 50);  // 50ms防抖
});

// 显示实时数值
slider.addEventListener('input', (e) => {
    valueDisplay.textContent = e.target.value;
});
```

### 10.3 视觉设计规范

#### 10.3.1 按钮状态
```css
/* 主按钮 */
.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: all 0.3s ease;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(102, 126, 234, 0.3);
}

.btn-primary:active {
    transform: translateY(0);
}

.btn-primary:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
}
```

#### 10.3.2 加载动画
```css
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}
```

#### 10.3.3 过渡动画
```css
/* 淡入 */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* 滑入 */
@keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.result-section {
    animation: fadeIn 0.5s ease;
}
```

### 10.4 错误提示设计

#### 10.4.1 提示级别
| 级别 | 颜色 | 图标 | 使用场景 |
|------|-----|------|---------|
| 成功 | 绿色 | ✓ | 上传成功、生成完成 |
| 警告 | 黄色 | ⚠ | 后端不可用 |
| 错误 | 红色 | ✗ | 文件格式错误 |
| 信息 | 蓝色 | ⓘ | 操作提示 |

#### 10.4.2 Toast提示组件
```javascript
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}
```

---

## 11. 安全设计

### 11.1 前端安全

#### 11.1.1 XSS防护
```javascript
// 文本内容转义
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 禁止innerHTML，使用textContent
element.textContent = userInput;  // ✓ 安全
// element.innerHTML = userInput;  // ✗ 危险
```

#### 11.1.2 文件类型验证
```javascript
// 双重验证：扩展名 + MIME类型
function validateImageFile(file) {
    // 1. 检查扩展名
    const validExtensions = ['jpg', 'jpeg', 'png'];
    const ext = file.name.split('.').pop().toLowerCase();
    if (!validExtensions.includes(ext)) {
        return false;
    }

    // 2. 检查MIME类型
    if (!file.type.startsWith('image/')) {
        return false;
    }

    // 3. 检查文件大小
    if (file.size > 10 * 1024 * 1024) {  // 10MB
        return false;
    }

    return true;
}
```

#### 11.1.3 内存泄漏防护
```javascript
// URL清理
const url = URL.createObjectURL(blob);
// ... 使用url
URL.revokeObjectURL(url);  // ✓ 必须清理

// 事件监听器清理
function addUploadListener() {
    const handler = (e) => { /* ... */ };
    uploadBox.addEventListener('click', handler);

    // 返回清理函数
    return () => {
        uploadBox.removeEventListener('click', handler);
    };
}
```

### 11.2 后端安全

#### 11.2.1 文件上传安全
```python
# 文件大小限制
from werkzeug.utils import secure_filename

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return error(400, "无文件")

    file = request.files['file']

    # 安全的文件名
    filename = secure_filename(file.filename)

    # 验证文件类型
    if not allowed_file(filename):
        return error(400, "不支持的文件类型")

    # 验证文件大小
    if not validate_file_size(file):
        return error(400, "文件过大")

    # 保存到安全目录
    safe_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(safe_path)

    return success()
```

#### 11.2.2 路径遍历防护
```python
import os

def safe_join(directory, filename):
    """安全的路径拼接，防止目录遍历攻击"""
    filename = secure_filename(filename)
    filepath = os.path.join(directory, filename)

    # 确保路径在允许的目录内
    if not os.path.abspath(filepath).startswith(
        os.path.abspath(directory)
    ):
        raise ValueError("非法路径")

    return filepath
```

#### 11.2.3 CORS配置
```python
from flask_cors import CORS

# 生产环境：限制来源
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://yourdomain.com"],
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type"]
    }
})

# 开发环境：允许所有来源
CORS(app)
```

### 11.3 数据隐私

#### 11.3.1 本地处理优先
```
用户隐私数据处理策略:
1. 九宫格图片 → 纯前端处理 ✓
2. 图片合成 → 纯前端处理 ✓
3. 参数调整 → 纯前端处理 ✓
4. 主图抠图 → 必须后端处理，但临时文件2小时后删除 ⚠️
```

#### 11.3.2 临时文件管理
```python
# 使用UUID确保文件名唯一
import uuid

def save_temp_file(file):
    temp_filename = f"{uuid.uuid4()}.png"
    temp_path = os.path.join(TEMP_DIR, temp_filename)
    file.save(temp_path)

    # 设置文件权限（仅所有者可读写）
    os.chmod(temp_path, 0o600)

    return temp_path

# 定时清理
def cleanup_temp_files():
    cutoff = datetime.now() - timedelta(hours=2)
    for filename in os.listdir(TEMP_DIR):
        filepath = os.path.join(TEMP_DIR, filename)
        if os.path.getmtime(filepath) < cutoff.timestamp():
            os.remove(filepath)
```

---

## 12. 性能优化

### 12.1 前端性能优化

#### 12.1.1 图片加载优化
```javascript
// 图片预加载
function preloadImages(urls) {
    return Promise.all(
        urls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = url;
            });
        })
    );
}

// 懒加载
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
        }
    });
});
```

#### 12.1.2 Canvas性能优化
```javascript
// 1. 使用离屏Canvas
const offscreenCanvas = document.createElement('canvas');
const offscreenCtx = offscreenCanvas.getContext('2d');

// 在离屏Canvas上进行复杂操作
offscreenCtx.drawImage(...);
offscreenCtx.filter = 'blur(5px)';

// 最后一次性绘制到主Canvas
mainCtx.drawImage(offscreenCanvas, 0, 0);

// 2. 批量操作
ctx.save();
ctx.beginPath();
// ... 多次绘制
ctx.closePath();
ctx.restore();

// 3. 减少状态切换
// ✗ 不好
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 10, 10);
ctx.fillStyle = 'blue';
ctx.fillRect(10, 0, 10, 10);

// ✓ 好
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 10, 10);
ctx.fillRect(20, 0, 10, 10);
ctx.fillStyle = 'blue';
ctx.fillRect(10, 0, 10, 10);
```

#### 12.1.3 防抖与节流
```javascript
// 防抖：等待用户停止操作后再执行
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// 节流：限制执行频率
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 使用
const debouncedUpdate = debounce(updatePreview, 200);
slider.addEventListener('input', debouncedUpdate);
```

#### 12.1.4 资源压缩
```javascript
// 图片压缩
function compressImage(canvas, quality = 0.8) {
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob);
        }, 'image/jpeg', quality);
    });
}

// Base64转Blob（减少内存占用）
function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
```

### 12.2 后端性能优化

#### 12.2.1 模型缓存
```python
from functools import lru_cache

@lru_cache(maxsize=1)
def get_rembg_session():
    """缓存rembg会话，避免重复加载模型"""
    from rembg import new_session
    return new_session("u2net")

def remove_bg_optimized(image_data):
    session = get_rembg_session()
    return remove(image_data, session=session)
```

#### 12.2.2 异步处理
```python
from concurrent.futures import ThreadPoolExecutor
import asyncio

executor = ThreadPoolExecutor(max_workers=4)

@app.route('/remove_bg_async', methods=['POST'])
async def remove_bg_async():
    file = request.files['image']
    image_data = file.read()

    # 异步处理
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(
        executor,
        remove_bg_optimized,
        image_data
    )

    return send_file(io.BytesIO(result), mimetype='image/png')
```

#### 12.2.3 响应压缩
```python
from flask_compress import Compress

app = Flask(__name__)
Compress(app)  # 自动压缩响应
```

### 12.3 网络优化

#### 12.3.1 减少请求次数
```javascript
// 批量上传（预留）
async function batchUpload(files) {
    const formData = new FormData();
    files.forEach((file, index) => {
        formData.append(`image_${index}`, file);
    });

    const response = await fetch('/batch_upload', {
        method: 'POST',
        body: formData
    });

    return response.json();
}
```

#### 12.3.2 请求超时控制
```javascript
// 使用AbortController
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 10000);

try {
    const response = await fetch(url, {
        signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
} catch (error) {
    if (error.name === 'AbortError') {
        console.log('请求超时');
    }
}
```

---

## 13. 测试方案

### 13.1 测试策略

#### 13.1.1 测试金字塔
```
        /\
       /  \  E2E测试 (5%)
      /────\
     /      \  集成测试 (15%)
    /────────\
   /          \  单元测试 (80%)
  /────────────\
```

### 13.2 单元测试

#### 13.2.1 前端单元测试（Jest）
```javascript
// cropTransparentArea.test.js

describe('cropTransparentArea', () => {
    test('应该正确裁剪透明区域', async () => {
        // 创建测试图片
        const canvas = createCanvas(100, 100);
        const ctx = canvas.getContext('2d');

        // 中心绘制50x50红色矩形
        ctx.fillStyle = 'red';
        ctx.fillRect(25, 25, 50, 50);

        const img = await canvasToImage(canvas);

        // 执行裁剪
        const cropped = await cropTransparentArea(img);

        // 验证尺寸
        expect(cropped.width).toBe(50);
        expect(cropped.height).toBe(50);
    });

    test('全透明图片应返回原图', async () => {
        const transparentCanvas = createCanvas(100, 100);
        const img = await canvasToImage(transparentCanvas);

        const cropped = await cropTransparentArea(img);

        expect(cropped.width).toBe(img.width);
        expect(cropped.height).toBe(img.height);
    });
});
```

#### 13.2.2 后端单元测试（pytest）
```python
# test_app.py

import pytest
from app import app, allowed_file

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_health_check(client):
    """测试健康检查接口"""
    rv = client.get('/health')
    assert rv.status_code == 200
    assert b'ok' in rv.data

def test_allowed_file():
    """测试文件验证函数"""
    assert allowed_file('test.jpg') == True
    assert allowed_file('test.png') == True
    assert allowed_file('test.gif') == False
    assert allowed_file('test.exe') == False

def test_remove_bg_no_file(client):
    """测试无文件上传"""
    rv = client.post('/remove_bg')
    assert rv.status_code == 400
```

### 13.3 集成测试

#### 13.3.1 API集成测试
```javascript
describe('API Integration Tests', () => {
    test('完整流程: 上传 -> 抠图 -> 下载', async () => {
        // 1. 上传图片
        const formData = new FormData();
        formData.append('image', testImageBlob);

        const uploadRes = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        expect(uploadRes.ok).toBe(true);

        // 2. 调用抠图
        const removeRes = await fetch('/remove_bg', {
            method: 'POST',
            body: formData
        });
        expect(removeRes.ok).toBe(true);

        // 3. 验证返回类型
        const blob = await removeRes.blob();
        expect(blob.type).toBe('image/png');
    });
});
```

### 13.4 端到端测试（E2E）

#### 13.4.1 Playwright测试
```javascript
// e2e/complete-flow.spec.js

const { test, expect } = require('@playwright/test');

test('完整用户流程', async ({ page }) => {
    // 1. 访问页面
    await page.goto('http://localhost:8080');

    // 2. 上传九宫格图片
    const gridInput = page.locator('#gridFileInput');
    await gridInput.setInputFiles([
        'test/images/1.jpg',
        'test/images/2.jpg',
        // ... 9张图
    ]);

    // 3. 验证上传计数
    const count = page.locator('#gridCount');
    await expect(count).toHaveText('9');

    // 4. 上传主图
    const mainInput = page.locator('#mainFileInput');
    await mainInput.setInputFiles('test/images/main.jpg');

    // 5. 调整参数
    await page.locator('#offsetX').fill('100');
    await page.locator('#scale').fill('1.2');

    // 6. 生成图片
    await page.locator('#generateBtn').click();

    // 7. 等待生成完成
    await page.waitForSelector('#resultCanvas', { state: 'visible' });

    // 8. 下载图片
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator('#downloadBtn').click()
    ]);

    // 9. 验证下载文件
    expect(download.suggestedFilename()).toMatch(/3D-九宫格-\d+\.jpg/);
});
```

### 13.5 性能测试

#### 13.5.1 前端性能测试
```javascript
// performance.test.js

test('Canvas渲染性能', async () => {
    const start = performance.now();

    await createNineGrid(testImages);

    const end = performance.now();
    const duration = end - start;

    // 应该在100ms内完成
    expect(duration).toBeLessThan(100);
});
```

#### 13.5.2 后端负载测试（Locust）
```python
# locustfile.py

from locust import HttpUser, task, between

class LoadTestUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def remove_background(self):
        with open('test_image.jpg', 'rb') as f:
            files = {'image': f}
            self.client.post('/remove_bg', files=files)

    @task(3)
    def health_check(self):
        self.client.get('/health')
```

### 13.6 兼容性测试

#### 13.6.1 浏览器兼容性矩阵
| 浏览器 | 版本 | 状态 | 备注 |
|-------|------|------|------|
| Chrome | 90+ | ✅ 通过 | 主要开发环境 |
| Firefox | 88+ | ✅ 通过 | - |
| Safari | 14+ | ✅ 通过 | Canvas API兼容 |
| Edge | 90+ | ✅ 通过 | Chromium内核 |
| IE 11 | - | ❌ 不支持 | 不支持ES6 |

#### 13.6.2 设备兼容性测试
- ✅ iPhone 12 Pro (iOS 14)
- ✅ Samsung Galaxy S21 (Android 11)
- ✅ iPad Pro 12.9 (iPadOS 14)
- ✅ Windows 10 PC
- ✅ MacBook Pro (macOS Big Sur)

---

## 14. 部署方案

### 14.1 开发环境部署

#### 14.1.1 前端开发环境
```bash
# 使用Live Server（VSCode插件）
1. 安装Live Server插件
2. 右键index.html
3. 选择"Open with Live Server"
4. 自动打开 http://localhost:5500
```

#### 14.1.2 后端开发环境
```bash
# 1. 创建虚拟环境
python -m venv venv

# 2. 激活虚拟环境
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# 3. 安装依赖
pip install -r requirements.txt

# 4. 启动Flask
python app.py

# 5. 访问
# http://localhost:5000
```

### 14.2 生产环境部署

#### 14.2.1 前端部署（Vercel）
```bash
# 1. 安装Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel --prod

# 4. 配置文件 vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

#### 14.2.2 后端部署（Render）
```yaml
# render.yaml

services:
  - type: web
    name: 3d-grid-backend
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: gunicorn app:app
    envVars:
      - key: PYTHON_VERSION
        value: 3.9.0
      - key: PORT
        value: 5000
```

```bash
# 1. 安装gunicorn
pip install gunicorn

# 2. 更新requirements.txt
echo "gunicorn==20.1.0" >> requirements.txt

# 3. 创建Procfile
echo "web: gunicorn app:app" > Procfile

# 4. 推送到GitHub
git add .
git commit -m "Deploy to Render"
git push

# 5. 在Render控制台连接GitHub仓库并部署
```

#### 14.2.3 Docker部署
```dockerfile
# Dockerfile

FROM python:3.9-slim

WORKDIR /app

# 安装系统依赖
RUN apt-get update && apt-get install -y \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && rm -rf /var/lib/apt/lists/*

# 复制依赖文件
COPY requirements.txt .

# 安装Python依赖
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用代码
COPY . .

# 暴露端口
EXPOSE 5000

# 启动命令
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
```

```yaml
# docker-compose.yml

version: '3.8'

services:
  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
    volumes:
      - ./temp_images:/app/temp_images
```

```bash
# 构建并运行
docker-compose up --build
```

### 14.3 CDN配置

#### 14.3.1 静态资源CDN
```html
<!-- 使用CDN加速静态资源 -->
<link rel="stylesheet" href="https://cdn.example.com/style.css">
<script src="https://cdn.example.com/app.js"></script>
```

#### 14.3.2 图片CDN
```javascript
// 配置图片CDN前缀
const CDN_PREFIX = 'https://img.example.com';

function getCDNUrl(path) {
    return `${CDN_PREFIX}/${path}`;
}
```

### 14.4 域名与HTTPS

#### 14.4.1 域名配置
```
前端: https://3d-grid.example.com
后端: https://api.3d-grid.example.com
```

#### 14.4.2 SSL证书（Let's Encrypt）
```bash
# 使用Certbot自动配置
sudo certbot --nginx -d 3d-grid.example.com

# 自动续期
sudo certbot renew --dry-run
```

---

## 15. 运维监控

### 15.1 日志管理

#### 15.1.1 前端日志
```javascript
// 错误日志收集
window.addEventListener('error', (event) => {
    const errorLog = {
        message: event.message,
        source: event.filename,
        line: event.lineno,
        col: event.colno,
        error: event.error?.stack,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
    };

    // 发送到日志服务
    sendToLogService(errorLog);
});

// 性能日志
window.addEventListener('load', () => {
    const perfData = performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

    console.log('页面加载时间:', pageLoadTime, 'ms');
});
```

#### 15.1.2 后端日志
```python
import logging
from logging.handlers import RotatingFileHandler

# 配置日志
handler = RotatingFileHandler(
    'app.log',
    maxBytes=10000000,  # 10MB
    backupCount=5
)

formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
handler.setFormatter(formatter)

app.logger.addHandler(handler)
app.logger.setLevel(logging.INFO)

# 使用
@app.route('/remove_bg', methods=['POST'])
def remove_bg():
    app.logger.info('收到抠图请求')
    try:
        # 处理逻辑
        app.logger.info('抠图处理成功')
        return result
    except Exception as e:
        app.logger.error(f'抠图失败: {str(e)}')
        raise
```

### 15.2 性能监控

#### 15.2.1 前端性能监控
```javascript
// 使用Performance API
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        console.log('资源:', entry.name);
        console.log('耗时:', entry.duration, 'ms');
    }
});

observer.observe({ entryTypes: ['resource', 'measure'] });

// 自定义性能指标
performance.mark('generate-start');
await generateImage();
performance.mark('generate-end');
performance.measure('generate', 'generate-start', 'generate-end');
```

#### 15.2.2 后端性能监控
```python
import time
from functools import wraps

def timing(f):
    """装饰器：记录函数执行时间"""
    @wraps(f)
    def wrap(*args, **kwargs):
        start = time.time()
        result = f(*args, **kwargs)
        end = time.time()

        app.logger.info(f'{f.__name__} 耗时: {end-start:.2f}s')
        return result
    return wrap

@app.route('/remove_bg', methods=['POST'])
@timing
def remove_bg():
    # 处理逻辑
    pass
```

### 15.3 健康检查

#### 15.3.1 服务健康检查
```python
@app.route('/health', methods=['GET'])
def health():
    """健康检查接口"""
    checks = {
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'checks': {
            'disk_space': check_disk_space(),
            'memory': check_memory(),
            'model_loaded': check_model()
        }
    }

    return jsonify(checks)

def check_disk_space():
    """检查磁盘空间"""
    import shutil
    total, used, free = shutil.disk_usage("/")
    free_percent = free / total * 100
    return {
        'status': 'ok' if free_percent > 10 else 'warning',
        'free_percent': f'{free_percent:.2f}%'
    }
```

### 15.4 告警机制

#### 15.4.1 错误告警
```python
# 错误超过阈值时发送邮件
from flask import g

@app.before_request
def before_request():
    g.start_time = time.time()

@app.after_request
def after_request(response):
    diff = time.time() - g.start_time

    # 响应时间过长告警
    if diff > 10:
        send_alert_email(
            subject='响应时间过长',
            body=f'接口 {request.path} 耗时 {diff:.2f}s'
        )

    return response
```

### 15.5 备份策略

#### 15.5.1 代码备份
```bash
# Git版本控制
git add .
git commit -m "Backup: $(date +%Y-%m-%d)"
git push origin main

# 自动化备份脚本
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d)
BACKUP_DIR="/backups"

# 打包代码
tar -czf $BACKUP_DIR/code-$DATE.tar.gz .

# 保留最近7天
find $BACKUP_DIR -name "code-*.tar.gz" -mtime +7 -delete
```

#### 15.5.2 数据备份
```bash
# 定期清理临时文件前备份重要数据
rsync -avz temp_images/ /backup/temp_images_$(date +%Y%m%d)/
```

---

## 附录

### A. 术语表

| 术语 | 英文 | 解释 |
|------|------|------|
| 九宫格 | Nine Grid | 3x3排列的图片布局 |
| 抠图 | Background Removal | 去除图片背景 |
| 3D出格 | 3D Pop-out Effect | 主图突出于背景的视觉效果 |
| Canvas | Canvas | HTML5画布元素 |
| Base64 | Base64 | 图片编码格式 |
| Blob | Binary Large Object | 二进制大对象 |
| CORS | Cross-Origin Resource Sharing | 跨域资源共享 |

### B. 参考资料

- [MDN Web Docs - Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [rembg GitHub](https://github.com/danielgatis/rembg)
- [Pillow Documentation](https://pillow.readthedocs.io/)

### C. 常见问题FAQ

**Q1: 为什么抠图需要后端处理？**
A: rembg是Python库，无法在浏览器中运行。未来可考虑使用TensorFlow.js实现纯前端抠图。

**Q2: 如何提高抠图质量？**
A: 可调整rembg的alpha_matting参数，或使用更高级的模型（如SAM）。

**Q3: 支持视频处理吗？**
A: 当前版本仅支持静态图片。视频处理需要逐帧抠图，性能要求高。

**Q4: 如何处理大图片？**
A: 前端可先压缩图片，或使用Web Worker异步处理。

**Q5: 能否导出PSD格式？**
A: 当前仅支持JPEG/PNG。PSD需要复杂的图层结构，可考虑后续版本实现。

---

**文档结束**

> 本文档描述了AI九宫格3D出图系统 v1.0 的完整设计方案，涵盖架构、功能、接口、算法、安全、性能、测试、部署等各个方面。
>
> **版本历史**:
> - v1.0 (2025-10-18): 初始版本

**撰写人**: 大铭DAMING
**审核人**: -
**批准人**: -
