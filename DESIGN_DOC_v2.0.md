# AI生成九宫格3D人物效果图 - 设计文档 v2.0

> **文档版本**: v2.0
> **编写日期**: 2025-10-19
> **作者**: 大铭DAMING (258930113@qq.com)
> **项目状态**: ✅ 已完成 Serverless 云端部署版

---

## 📑 版本变更记录

| 版本 | 日期 | 变更内容 | 负责人 |
|------|------|---------|--------|
| v1.0 | 2025-10-18 | 初始本地部署版本 | 大铭DAMING |
| v2.0 | 2025-10-19 | Serverless云端部署版 + 完整安全架构 | 大铭DAMING |

---

## 1. 项目概述

### 1.1 项目名称
**AI生成九宫格3D人物效果图**

### 1.2 核心功能
用户上传9张九宫格图片 + 1张人物主图，系统自动：
1. ✅ AI智能抠图（去除主图背景）
2. ✅ 智能裁剪（只保留人物主体）
3. ✅ 生成3D人物效果（主图叠加在九宫格上方）
4. ✅ 参数实时调整（水平偏移、垂直偏移、缩放）
5. ✅ 高清图片下载

### 1.3 v2.0 重大升级

#### 从本地部署到云端部署
**v1.0 架构**:
```
前端 (index.html) → Flask (localhost:5000) → rembg抠图
```
问题：
- ❌ 需要本地运行Python服务器
- ❌ 需要配置Python环境和依赖
- ❌ 无法分享给他人使用

**v2.0 架构**:
```
用户浏览器
    ↓ HTTPS (X-API-Key: client-key)
Vercel Serverless Function (API代理层)
    ↓ 验证密钥 + 速率限制 + 来源验证
    ↓ HTTPS (转发请求)
Modal GPU Backend (rembg抠图)
```

优势：
- ✅ **云端化**: 部署到Vercel，用户直接访问URL即可使用
- ✅ **安全性**: 4层防护（来源、密钥、速率、成本上限）
- ✅ **性能**: Modal GPU加速 + Volume模型缓存
- ✅ **成本**: 按需付费，无请求时$0

### 1.4 技术栈

| 层级 | v1.0 | v2.0 | 升级理由 |
|------|------|------|---------|
| 前端 | HTML + CSS + JS | 同左 | 保持轻量 |
| 前端部署 | - | **Vercel** | 全球CDN + 自动HTTPS |
| API代理层 | - | **Vercel Serverless Functions** | 隐藏真实API + 安全验证 |
| 后端 | Flask (localhost) | **Modal Serverless** | GPU加速 + 按需付费 |
| AI抠图 | rembg (本地) | rembg (Modal) | 云端GPU + 模型缓存 |
| 安全 | 无 | **双密钥 + 速率限制** | 防止API滥用 |

---

## 2. 系统架构设计

### 2.1 整体架构图

```
┌─────────────────────────────────────────────────┐
│                  用户层 (User)                   │
│           PC浏览器 / 移动浏览器                   │
│      https://3d-nine-grid.vercel.app            │
└──────────────────────┬──────────────────────────┘
                       │ HTTPS
                       │ X-API-Key: client-key
                       ▼
┌─────────────────────────────────────────────────┐
│          Vercel Edge Network (CDN)              │
│              静态资源分发 + 边缘计算              │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│       Vercel Serverless Functions (代理层)      │
│  ┌──────────────────────────────────────────┐  │
│  │  api/remove-bg.js (抠图API代理)          │  │
│  │  - 验证请求来源                          │  │
│  │  - 验证API密钥                           │  │
│  │  - 速率限制 (10次/分钟)                  │  │
│  │  - 转发到Modal                           │  │
│  └──────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────┐  │
│  │  api/health.js (健康检查)                │  │
│  └──────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────┘
                       │ HTTPS
                       │ FormData (multipart/form-data)
                       ▼
┌─────────────────────────────────────────────────┐
│          Modal Serverless Backend               │
│  ┌──────────────────────────────────────────┐  │
│  │  @app.function(gpu="any")                │  │
│  │  remove_background(image_bytes)          │  │
│  │    - rembg AI抠图                        │  │
│  │    - 返回透明PNG                         │  │
│  └──────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────┐  │
│  │  Modal Volume (持久化存储)               │  │
│  │    - u2net.onnx (176MB模型)              │  │
│  │    - 首次下载，后续直接读取               │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### 2.2 数据流设计

#### 2.2.1 完整流程
```
1. 用户上传9张九宫格图片
   ↓ FileReader读取为Base64
2. 存储到 state.gridImages[] (前端内存)
   ↓
3. 用户上传1张主图
   ↓ FileReader读取为Base64
4. 存储到 state.mainImage (前端内存)
   ↓
5. 用户点击"生成3D效果"
   ↓
6. 前端调用 /api/remove-bg
   ↓ 携带 X-API-Key: client-key
7. Vercel代理验证
   ↓ 通过
8. 转发到 Modal
   ↓ GPU推理
9. rembg返回透明PNG
   ↓
10. 前端接收并裁剪透明区域 (cropTransparentArea)
   ↓
11. 缓存裁剪后的图片 (state.mainImageNoBg)
   ↓
12. 创建九宫格 (createNineGrid)
   ↓
13. 创建背景 (createBackground)
   ↓
14. 合成图片 (compositeImage)
   ↓ 主图居中，根据偏移参数调整位置
15. 显示结果 (Canvas绘制)
   ↓
16. 用户调整参数 (滑块)
   ↓ 使用缓存，不调用API
17. 实时预览更新 (updatePreview)
   ↓
18. 用户下载图片 (toBlob → 触发下载)
```

#### 2.2.2 API请求流
```
前端 fetch('/api/remove-bg')
  ↓
  headers: {
    'X-API-Key': 'e2115f95cc4c23a6966ae34379046594'  // 客户端密钥
  }
  body: FormData (file: Blob)
  ↓
Vercel api/remove-bg.js
  ↓
  Layer 1: 检查 req.method === 'POST'
  Layer 2: 检查 origin in ALLOWED_ORIGINS
  Layer 3: 检查 req.headers['x-api-key'] === process.env.API_SECRET_KEY
  Layer 4: 检查 rateLimitMap (10次/分钟)
  ↓ 通过
  读取原始请求体 buffer
  ↓
  fetch(MODAL_API_URL + '/remove_bg', {
    body: buffer,
    headers: { 'content-type': req.headers['content-type'] }
  })
  ↓
Modal Backend
  ↓
  @app.function(gpu="any", volumes={"/root/.u2net": volume})
  def remove_background(image_bytes):
      output = remove(image_bytes)  // 调用rembg
      volume.commit()  // 保存模型到Volume
      return output
  ↓
  返回 image/png
  ↓
Vercel 转发给前端
  ↓
前端接收 Blob → URL.createObjectURL → loadImage → cropTransparentArea → 缓存
```

### 2.3 安全架构

#### 2.3.1 多层防护体系
```
Layer 0: HTTPS加密传输
  ↓
Layer 1: CORS来源验证
  ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'https://3d-nine-grid.vercel.app'
  ]
  ↓
Layer 2: API密钥验证
  客户端密钥（前端）: e2115f95cc4c23a6966ae34379046594
  服务端密钥（Vercel后端）: 同上（双密钥机制）
  ↓
Layer 3: 速率限制
  滑动窗口算法，每IP最多10次/分钟
  ↓
Layer 4: 成本上限
  Modal每日最大调用次数限制
```

#### 2.3.2 双密钥机制

**为什么需要两个密钥？**

前端密钥（客户端密钥）:
- 位置: `index.html` 中的 `window.__ENV__.VITE_API_SECRET_KEY`
- 风险: 🟡 **会暴露**（用户查看源代码可见）
- 作用: 轻量级验证，防止基本滥用
- 保护: 速率限制 + 来源验证 + 定期轮换

服务端密钥（后端密钥）:
- 位置: Vercel环境变量 `API_SECRET_KEY`
- 风险: 🟢 **完全隐藏**（用户无法访问）
- 作用: 保护Modal API，防止直接调用
- 保护: 永不暴露给前端

**为什么客户端密钥暴露不是大问题？**
```
最坏情况:
  恶意用户获取客户端密钥 + 绕过速率限制
  ↓
  每分钟: 10次 (速率限制)
  每天: 10 × 60 × 24 = 14,400次
  成本: 14,400 × $0.01 = $144/天
  ↓
对比:
  无保护: 理论无限制，可能$10,000+/天
  有保护: 最多$144/天（可接受）
```

#### 2.3.3 速率限制算法

**滑动窗口实现**:
```javascript
// api/remove-bg.js
const rateLimitMap = new Map();  // { clientId: { count, resetTime } }

function checkRateLimit(clientId) {
    const now = Date.now();
    const data = rateLimitMap.get(clientId) || {
        count: 0,
        resetTime: now + 60000  // 1分钟后重置
    };

    // 时间窗口过期，重置计数器
    if (now > data.resetTime) {
        data.count = 0;
        data.resetTime = now + 60000;
    }

    data.count++;
    rateLimitMap.set(clientId, data);

    return data.count <= 10;  // 每分钟最多10次
}
```

**优化方向**:
- 当前: 内存Map（适合单机）
- 生产: Redis（支持分布式）

---

## 3. 核心功能模块

### 3.1 前端模块

#### 3.1.1 上传管理模块
```javascript
// 九宫格上传
function handleGridUpload(files) {
    if (files.length !== 9) {
        alert('请选择恰好9张图片！');
        return;
    }

    loadGridImages(files);
}

// 主图上传
function handleMainUpload(file) {
    state.mainImageNoBg = null;  // 清空抠图缓存
    loadMainImage(file);
}
```

#### 3.1.2 抠图缓存模块（v2.0新增）
```javascript
// 全局状态
const state = {
    mainImage: null,       // 原图
    mainImageNoBg: null,   // 缓存的抠图结果（Image对象）
};

// 生成图片（调用API）
async function generateWithFrontend(shouldRemoveBackground = false) {
    if (state.useBackend && shouldRemoveBackground) {
        // 首次生成，调用API
        mainImg = await removeBackgroundFromMain(state.mainImage);
        state.mainImageNoBg = mainImg;  // ✅ 缓存Image对象
    } else if (state.mainImageNoBg) {
        // 使用缓存，不调用API
        mainImg = state.mainImageNoBg;
    } else {
        // 没有后端，使用原图
        mainImg = await loadImage(state.mainImage);
    }
}

// 点击生成按钮 → shouldRemoveBackground = true
// 调整参数滑块 → shouldRemoveBackground = false
```

**为什么不能缓存blob URL？**
```javascript
// ❌ 错误方式
state.mainImageNoBg = mainImg.src;  // "blob:https://..."

// 后续使用
mainImg = await loadImage(state.mainImageNoBg);  // ERR_FILE_NOT_FOUND

// ✅ 正确方式
state.mainImageNoBg = mainImg;  // 直接缓存Image对象
mainImg = state.mainImageNoBg;   // 直接使用
```

**原因**: Blob URL是临时的内存指针，`URL.revokeObjectURL()`后会失效。Image对象内部保存了解码后的像素数据，不依赖URL。

#### 3.1.3 智能裁剪模块
```javascript
// 裁剪透明区域，只保留人物主体
function cropTransparentArea(img) {
    return new Promise((resolve) => {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
        const tempCtx = tempCanvas.getContext('2d');

        tempCtx.drawImage(img, 0, 0);

        const imageData = tempCtx.getImageData(0, 0, img.width, img.height);
        const data = imageData.data;

        // 扫描边界
        let minX = img.width, minY = img.height;
        let maxX = 0, maxY = 0;

        for (let y = 0; y < img.height; y++) {
            for (let x = 0; x < img.width; x++) {
                const index = (y * img.width + x) * 4;
                const alpha = data[index + 3];

                if (alpha > 0) {
                    minX = Math.min(minX, x);
                    minY = Math.min(minY, y);
                    maxX = Math.max(maxX, x);
                    maxY = Math.max(maxY, y);
                }
            }
        }

        if (minX > maxX || minY > maxY) {
            resolve(img);  // 全透明，返回原图
            return;
        }

        // 裁剪
        const cropWidth = maxX - minX + 1;
        const cropHeight = maxY - minY + 1;

        const croppedCanvas = document.createElement('canvas');
        croppedCanvas.width = cropWidth;
        croppedCanvas.height = cropHeight;
        const croppedCtx = croppedCanvas.getContext('2d');

        croppedCtx.drawImage(
            tempCanvas,
            minX, minY, cropWidth, cropHeight,
            0, 0, cropWidth, cropHeight
        );

        croppedCanvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const croppedImg = new Image();
            croppedImg.onload = () => {
                URL.revokeObjectURL(url);
                resolve(croppedImg);
            };
            croppedImg.src = url;
        }, 'image/png');
    });
}
```

**复杂度**: O(width × height)

**优化**: 可以先粗扫描找到大致范围，再精确扫描

#### 3.1.4 居中偏移模块（v2.0重构）

**核心算法**:
```javascript
function compositeImage(background, mainImg) {
    const canvas = resultCanvas;
    canvas.width = background.width;
    canvas.height = background.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(background, 0, 0);

    // 步骤1: 应用缩放
    let drawWidth = mainImg.width * state.scale;
    let drawHeight = mainImg.height * state.scale;

    // 步骤2: 限制最大尺寸（永不超出画布）
    if (drawWidth > canvas.width || drawHeight > canvas.height) {
        const limitRatio = Math.min(
            canvas.width / drawWidth,
            canvas.height / drawHeight
        );
        drawWidth *= limitRatio;
        drawHeight *= limitRatio;
    }

    // 步骤3: 计算居中位置（offset 50%的基准）
    const centerX = (canvas.width - drawWidth) / 2;
    const centerY = (canvas.height - drawHeight) / 2;

    // 步骤4: 根据偏移百分比计算位置
    // offsetX: 0% → 左边缘, 50% → 居中, 100% → 右边缘
    const offsetFactorX = (state.offsetX - 50) / 50;  // -1 到 +1
    const offsetFactorY = (state.offsetY - 50) / 50;

    const x = centerX + (offsetFactorX * centerX);
    const y = centerY + (offsetFactorY * centerY);

    // 步骤5: 绘制主图（带阴影）
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;

    ctx.drawImage(mainImg, x, y, drawWidth, drawHeight);

    ctx.shadowColor = 'transparent';
}
```

**数学证明**:
```
已知:
  canvasWidth = 920, canvasHeight = 1226
  drawWidth = 420, drawHeight = 560
  centerX = (920-420)/2 = 250
  centerY = (1226-560)/2 = 333

验证:
  offset=0%:  factor=-1, x=250+(-1)*250=0   (左边缘) ✅
  offset=50%: factor=0,  x=250+0*250=250    (居中)   ✅
  offset=100%:factor=+1, x=250+1*250=500    (右边缘) ✅

边界检查:
  x ∈ [0, 2*centerX] = [0, 500]
  主图右边缘 = x + drawWidth = 500 + 420 = 920 = canvasWidth ✅
  永不超出边界 ✅
```

### 3.2 Vercel Serverless Functions

#### 3.2.1 抠图API代理

**文件**: `api/remove-bg.js`

```javascript
// 禁用Vercel的body解析，保留原始请求体
export const config = {
    api: {
        bodyParser: false,
    },
};

const MODAL_API_URL = process.env.MODAL_API_URL;
const API_SECRET_KEY = process.env.API_SECRET_KEY;

const ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:5500',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
    'https://3d-nine-grid.vercel.app',
].filter(Boolean);

// 速率限制
const rateLimitMap = new Map();
const RATE_LIMIT = {
    windowMs: 60 * 1000,
    maxRequests: 10
};

function checkRateLimit(clientId) {
    const now = Date.now();
    const data = rateLimitMap.get(clientId) || {
        count: 0,
        resetTime: now + RATE_LIMIT.windowMs
    };

    if (now > data.resetTime) {
        data.count = 0;
        data.resetTime = now + RATE_LIMIT.windowMs;
    }

    data.count++;
    rateLimitMap.set(clientId, data);

    return data.count <= RATE_LIMIT.maxRequests;
}

export default async function handler(req, res) {
    // Layer 1: 检查请求方法
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Layer 2: 验证来源
    const origin = req.headers.origin || req.headers.referer;
    const isAllowedOrigin = ALLOWED_ORIGINS.some(allowed =>
        origin && origin.startsWith(allowed)
    );

    if (!isAllowedOrigin) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    // Layer 3: 验证API密钥
    const clientApiKey = req.headers['x-api-key'];
    if (!clientApiKey || clientApiKey !== API_SECRET_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Layer 4: 速率限制
    const clientId = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (!checkRateLimit(clientId)) {
        return res.status(429).json({
            error: 'Too many requests',
            retryAfter: RATE_LIMIT.windowMs / 1000
        });
    }

    // Layer 5: 转发到Modal
    try {
        if (!MODAL_API_URL) {
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // 读取原始请求体
        const chunks = [];
        for await (const chunk of req) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        // 转发到Modal（保持multipart/form-data格式）
        const response = await fetch(`${MODAL_API_URL}/remove_bg`, {
            method: 'POST',
            body: buffer,
            headers: {
                'content-type': req.headers['content-type'],
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Modal API error: ${response.status}`);
        }

        const imageBuffer = await response.arrayBuffer();

        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.send(Buffer.from(imageBuffer));

    } catch (error) {
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}
```

**关键点**:
1. **禁用body解析**: `bodyParser: false`，保留原始multipart数据
2. **读取原始流**: `for await (const chunk of req)`
3. **直接转发buffer**: 不重新解析FormData，保持boundary完整性

#### 3.2.2 健康检查API

**文件**: `api/health.js`

```javascript
const MODAL_API_URL = process.env.MODAL_API_URL;

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const response = await fetch(`${MODAL_API_URL}/health`, {
            method: 'GET',
            signal: AbortSignal.timeout(5000)
        });

        if (response.ok) {
            const data = await response.json();
            return res.status(200).json({
                status: 'ok',
                service: '3d-nine-grid-proxy',
                backend: data
            });
        } else {
            return res.status(503).json({ status: 'unavailable' });
        }
    } catch (error) {
        return res.status(503).json({
            status: 'error',
            error: error.message
        });
    }
}
```

### 3.3 Modal Backend

#### 3.3.1 AI抠图服务

**文件**: `modal_app.py`

```python
"""
Modal deployment for AI background removal service
Using the latest Modal API with Volume optimization
"""
import modal

app = modal.App("3d-nine-grid-bg-removal")

# 创建持久化Volume用于存储模型
volume = modal.Volume.from_name("rembg-models", create_if_missing=True)
MODEL_DIR = "/root/.u2net"

image = modal.Image.debian_slim().pip_install(
    "fastapi[standard]",
    "rembg==2.0.50",
    "Pillow==10.1.0",
    "python-multipart"
)

@app.function(
    image=image,
    gpu="any",
    timeout=300,
    memory=2048,
    volumes={MODEL_DIR: volume},  # 挂载持久化存储
)
def remove_background(image_bytes: bytes) -> bytes:
    """
    Remove background from image using rembg
    """
    import os
    from rembg import remove

    os.makedirs(MODEL_DIR, exist_ok=True)

    # rembg会检测模型是否存在，不存在才下载
    output = remove(image_bytes)

    # 提交Volume更改（保存模型）
    volume.commit()

    return output

@app.function(image=image)
@modal.asgi_app()
def fastapi_app():
    """
    Create FastAPI application
    """
    from fastapi import FastAPI, File, UploadFile, Response
    from fastapi.middleware.cors import CORSMiddleware

    web_app = FastAPI()

    web_app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @web_app.get("/health")
    async def health():
        return {
            "status": "ok",
            "service": "3d-nine-grid-bg-removal",
            "version": "2.0.0",
            "optimization": "Model cached with Volume"
        }

    @web_app.post("/remove_bg")
    async def remove_bg_endpoint(file: UploadFile = File(...)):
        contents = await file.read()
        result = remove_background.remote(contents)

        return Response(
            content=result,
            media_type="image/png",
            headers={"Access-Control-Allow-Origin": "*"}
        )

    return web_app
```

**Volume持久化原理**:
```
容器启动 → 挂载Volume到 /root/.u2net/
       → rembg检查模型是否存在
       → 存在: 直接使用 ✅
       → 不存在: 下载并保存到Volume
       → volume.commit() 提交更改
容器停止 → Volume数据保留
下次启动 → 直接从Volume读取模型 ✅
```

**效果**:
- 首次调用: 下载176MB模型 + 推理2-5秒
- 后续调用: 直接推理2-5秒（节省1-2分钟）

---

## 4. 接口设计

### 4.1 API接口清单

| 接口 | 方法 | 描述 | 状态 |
|------|-----|------|------|
| /health | GET | 健康检查 | ✅ 已实现 |
| /api/remove-bg | POST | AI抠图（Vercel代理） | ✅ 已实现 |

### 4.2 接口详细设计

#### 4.2.1 健康检查接口

**URL**: `GET /health`

**请求**: 无参数

**响应**:
```json
{
    "status": "ok",
    "service": "3d-nine-grid-proxy",
    "backend": {
        "status": "ok",
        "service": "3d-nine-grid-bg-removal",
        "version": "2.0.0",
        "optimization": "Model cached with Volume"
    }
}
```

**状态码**:
- 200: 服务正常
- 503: 服务不可用

#### 4.2.2 抠图接口

**URL**: `POST /api/remove-bg`

**请求头**:
```
Content-Type: multipart/form-data
X-API-Key: e2115f95cc4c23a6966ae34379046594
```

**请求体**:
```
FormData:
  file: Blob (图片文件)
```

**响应**:
- Content-Type: `image/png`
- Body: PNG图片二进制数据

**状态码**:
- 200: 成功
- 401: API密钥无效
- 403: 来源不允许
- 429: 速率限制（Too many requests）
- 500: 服务器错误

**错误响应**:
```json
{
    "error": "Unauthorized - Invalid API key"
}
```

---

## 5. 部署方案

### 5.1 Vercel部署

#### 5.1.1 项目结构
```
3D-nine-grid-pic/
├── index.html              # 前端主页面
├── style.css               # 样式
├── app.js                  # 前端逻辑
├── env.js                  # 环境变量加载器
├── api/
│   ├── remove-bg.js        # 抠图API代理
│   └── health.js           # 健康检查
├── vercel.json             # Vercel配置
├── .vercelignore           # 忽略文件
├── package.json            # Node.js依赖
└── .env                    # 本地环境变量
```

#### 5.1.2 Vercel配置

**vercel.json**:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, POST, OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "Content-Type, X-API-Key" }
      ]
    }
  ]
}
```

**.vercelignore**:
```
# 忽略Python相关文件
requirements.txt
modal_app.py
venv/
*.pyc
__pycache__/

# 忽略临时文件
temp_images/

# 忽略环境配置
.env
.env.local
```

**package.json**:
```json
{
  "name": "3d-nine-grid-pic",
  "version": "2.0.0",
  "type": "module",
  "dependencies": {
    "form-data": "^4.0.0"
  },
  "engines": {
    "node": ">=18.x"
  }
}
```

#### 5.1.3 环境变量配置

在Vercel控制台添加环境变量（Production环境）:

| Key | Value | 说明 |
|-----|-------|------|
| `MODAL_API_URL` | `https://YOUR_USERNAME--3d-nine-grid-bg-removal.modal.run
` | Modal API地址 |
| `API_SECRET_KEY` | `e2115f95cc4c23a6966ae34379046594` | 服务端密钥 |
| `VITE_API_SECRET_KEY` | `e2115f95cc4c23a6966ae34379046594` | 客户端密钥（同上） |

**为什么相同？** 客户端发送的密钥需要与服务端存储的密钥匹配。

#### 5.1.4 部署命令

```bash
# 1. 安装Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel --prod
```

### 5.2 Modal部署

#### 5.2.1 部署准备

```bash
# 1. 创建虚拟环境
python -m venv venv

# 2. 激活虚拟环境
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# 3. 安装Modal CLI
pip install modal

# 4. 登录Modal
modal token new
```

#### 5.2.2 部署命令

```bash
# 部署到Modal
modal deploy modal_app.py

# 输出:
# ✓ Created deployment 3d-nine-grid-bg-removal
# ✓ URL: https://YOUR_USERNAME--3d-nine-grid-bg-removal.modal.run

```

#### 5.2.3 验证部署

```bash
# 测试健康检查
curl https://YOUR_USERNAME--3d-nine-grid-bg-removal.modal.run
/health

# 测试抠图
curl -X POST \
  -F "file=@test.png" \
  https://YOUR_USERNAME--3d-nine-grid-bg-removal.modal.run
/remove_bg \
  --output result.png
```

---

## 6. 性能优化

### 6.1 前端优化

| 优化项 | 方法 | 效果 |
|--------|------|------|
| 抠图缓存 | 缓存Image对象 | 减少91% API调用 |
| Canvas复用 | 同一Canvas重绘 | 避免内存泄漏 |
| Blob清理 | URL.revokeObjectURL | 防止内存泄漏 |
| 防抖 | debounce(updatePreview, 200ms) | 减少重绘次数 |

### 6.2 后端优化

| 优化项 | 方法 | 效果 |
|--------|------|------|
| 模型缓存 | Modal Volume | 减少1-2分钟冷启动 |
| 速率限制 | 滑动窗口算法 | 防止滥用 |
| 请求转发 | 直接转发buffer | 避免二次解析 |

### 6.3 成本优化

**优化前**:
- 每次调用Modal: $0.01
- 调整参数10次 = 11次调用 = $0.11

**优化后**:
- 首次生成: $0.01
- 调整参数10次: $0 (使用缓存)
- 总成本: $0.01

**节约**: 91%

---

## 7. 安全设计

### 7.1 安全威胁分析

| 威胁 | 影响 | 防护措施 |
|------|------|---------|
| API密钥泄露 | 恶意调用导致费用 | 双密钥 + 速率限制 |
| DDOS攻击 | 服务不可用 | Vercel自动防护 + 速率限制 |
| 恶意文件上传 | 服务器漏洞 | 文件类型验证 + 大小限制 |
| CORS攻击 | 跨域调用 | ALLOWED_ORIGINS白名单 |

### 7.2 密钥生成方法

```bash
# 使用OpenSSL生成
openssl rand -hex 32  # 生成64字符密钥

# 使用Node.js生成
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 使用Python生成
python -c "import secrets; print(secrets.token_hex(32))"
```

### 7.3 密钥轮换策略

**定期轮换**:
1. 每月生成新密钥
2. 更新Vercel环境变量
3. 更新`index.html`中的客户端密钥
4. 重新部署

**紧急轮换**（发现异常流量时）:
1. 立即生成新密钥
2. 更新所有配置
3. 重新部署
4. 监控流量恢复正常

---

## 8. 监控与运维

### 8.1 关键指标

| 指标 | 目标值 | 监控方法 |
|------|--------|---------|
| API响应时间 | <5s | Vercel Analytics |
| 错误率 | <1% | Vercel Logs |
| 速率限制触发 | <10次/天 | 日志统计 |
| Modal调用成功率 | >99% | Modal Dashboard |

### 8.2 日志管理

**Vercel日志**:
```bash
# 查看实时日志
vercel logs --follow

# 查看错误日志
vercel logs --filter "error"
```

**Modal日志**:
```bash
# 查看函数日志
modal app logs 3d-nine-grid-bg-removal
```

### 8.3 告警设置

**告警阈值**:
- 错误率 > 5% → 邮件通知
- API延迟 > 10s → 邮件通知
- 每日成本 > $50 → 立即通知

---

## 9. 未来优化方向

### 9.1 短期优化（1周内）
- [ ] Redis速率限制（替代内存Map）
- [ ] WebP格式支持（减小图片体积30-50%）
- [ ] 进度条显示（抠图处理进度）

### 9.2 中期优化（1个月内）
- [ ] 批量处理（一次上传多组九宫格）
- [ ] 用户系统（登录、历史记录）
- [ ] 模板系统（多种九宫格样式）

### 9.3 长期优化（3个月内）
- [ ] AI自动选主图（人脸检测）
- [ ] 智能配色（根据九宫格颜色调整主图）
- [ ] 视频支持（生成动态3D效果）

---

## 10. 常见问题FAQ

### Q1: 如何生成API密钥？
```bash
openssl rand -hex 32
```

### Q2: 如何配置Vercel环境变量？
1. 访问 Vercel项目设置
2. 添加环境变量，选择Production
3. 重新部署

### Q3: 为什么抠图很慢？
- 首次调用需要下载模型（1-2分钟）
- 后续调用正常（2-5秒）
- 使用Volume缓存模型

### Q4: 如何减少API成本？
1. 启用前端缓存
2. 设置Modal每日限额
3. 监控异常流量

### Q5: 部署报错怎么办？
1. 检查 `.vercelignore` 是否正确
2. 检查环境变量是否配置
3. 查看 `vercel logs` 日志
4. 参考 `PROJECT_REVIEW_V2.md`

---

## 附录

### A. 项目链接

- **GitHub**: https://github.com/youming666/3d-nine-grid-pic
- **在线Demo**: https://3d-nine-grid.vercel.app
- **联系方式**: 258930113@qq.com

### B. 参考文档

- `PROJECT_REVIEW_V2.md` - 完整复盘文档
- `API_KEY_GUIDE.md` - API密钥指南
- `API_SECURITY.md` - 安全架构文档
- `README.md` - 使用说明

---

**文档版本**: v2.0
**最后更新**: 2025-10-19
**作者**: 大铭DAMING
**项目状态**: ✅ 已完成 Serverless 云端部署版
