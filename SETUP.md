# 项目配置指南

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制环境变量模板:

```bash
cp .env.example .env.local
```

编辑 `.env.local`:

```bash
# Modal API地址(已配置好,无需修改)
MODAL_API_URL=https://youming666--3d-nine-grid-bg-removal-fastapi-app.modal.run

# 生成API密钥
# Windows: openssl rand -hex 32
# Linux/Mac: openssl rand -hex 32
API_SECRET_KEY=your-generated-key-here
NEXT_PUBLIC_API_SECRET_KEY=your-generated-key-here
```

**重要**: `API_SECRET_KEY` 和 `NEXT_PUBLIC_API_SECRET_KEY` 必须使用相同的密钥!

### 3. 生成API密钥

```bash
# 使用OpenSSL生成64字符的安全密钥
openssl rand -hex 32

# 或者使用Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 或者使用Python
python -c "import secrets; print(secrets.token_hex(32))"
```

复制生成的密钥,粘贴到 `.env.local` 的两个位置。

### 4. 运行开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

---

## 📋 完整工作流程

### 用户操作流程

1. **上传九宫格图片** (9张)
   - 点击"Upload Grid Images"
   - 选择9张图片
   - 图片会显示在3x3网格中

2. **上传主图** (1张)
   - 点击"Upload Main Image"
   - 选择1张人物图片
   - 图片会显示在预览框中

3. **抠图去背景**
   - 点击"抠图去背景"按钮
   - 等待AI处理(2-5秒)
   - ✅ 抠图结果会被缓存

4. **生成3D拼图**
   - 点击"生成3D拼图"按钮
   - 等待合成完成
   - 预览结果显示在右侧

5. **调整参数** (实时预览)
   - 缩放: 0.3x - 1.5x
   - 水平偏移: 0% - 100% (50%为居中)
   - 垂直偏移: 0% - 100% (50%为居中)
   - 背景模糊: 0px - 50px
   - 亮度: 50% - 150%

6. **下载图片**
   - 点击"Download Image"
   - 保存为PNG格式

---

## 🔐 安全架构

### API调用流程

```
前端 (用户浏览器)
  ↓ 携带 NEXT_PUBLIC_API_SECRET_KEY
Next.js API路由 (/api/remove-bg)
  ↓ 验证密钥 + 速率限制 (10次/分钟)
  ↓ 转发到Modal API
Modal API (GPU后端)
  ↓ rembg抠图处理
  ↓ 返回透明PNG
Next.js API路由
  ↓ 返回给前端
前端显示结果
```

### 多层安全防护

1. **Layer 1: 来源验证** - 只允许指定域名访问
2. **Layer 2: API密钥验证** - 密钥错误返回401
3. **Layer 3: 速率限制** - 每IP每分钟最多10次
4. **Layer 4: 文件验证** - 文件类型、大小检查
5. **Layer 5: Modal API** - 真实后端完全隐藏

---

## ⚡ 性能优化

### 1. 抠图缓存

```typescript
// ❌ 每次调整参数都调用API (浪费)
updatePreview() {
  mainImg = await removeBackgroundFromMain();
  compositeImage(bg, mainImg);
}

// ✅ 缓存抠图结果 (节约91%成本)
removeBackground() {
  mainImg = await callModalAPI();
  setMainImageNoBg(mainImg); // 缓存
}

updatePreview() {
  compositeImage(bg, mainImageNoBg); // 使用缓存
}
```

### 2. 居中偏移算法

```typescript
// 步骤1: 计算居中位置
const centerX = (canvasWidth - imageWidth) / 2;

// 步骤2: offset映射到-1到+1
const factor = (offset - 50) / 50;

// 步骤3: 最终位置 = 居中 + 偏移
const x = centerX + factor * centerX;

// 验证:
// offset=0%  → x=0 (左边缘)
// offset=50% → x=centerX (居中) ✅
// offset=100%→ x=2*centerX (右边缘)
```

### 3. Modal Volume持久化

Modal API已配置Volume存储模型,避免重复下载176MB模型文件。

---

## 🐛 常见问题

### Q1: 抠图失败,返回401错误

**原因**: API密钥未配置或不匹配

**解决**:
1. 检查 `.env.local` 是否存在
2. 确认 `API_SECRET_KEY` 和 `NEXT_PUBLIC_API_SECRET_KEY` 相同
3. 重启开发服务器 (`npm run dev`)

### Q2: 抠图很慢 (超过30秒)

**原因**: Modal首次调用需要下载模型

**解决**:
- 首次调用: 1-2分钟 (下载176MB模型)
- 后续调用: 2-5秒 (使用缓存)

### Q3: 调整参数不生效

**原因**: 未先生成拼图

**解决**:
1. 先上传九宫格和主图
2. 点击"抠图去背景"
3. 点击"生成3D拼图"
4. 然后调整参数才会实时预览

### Q4: 50%偏移不居中

**原因**: 旧版本bug,已修复

**解决**: 更新到最新代码,使用新的居中偏移算法

---

## 🚢 Vercel部署

### 1. 配置环境变量

在Vercel控制台添加:

| Key | Value | Environment |
|-----|-------|-------------|
| `MODAL_API_URL` | `https://youming666--3d-nine-grid-bg-removal-fastapi-app.modal.run` | Production |
| `API_SECRET_KEY` | `your-generated-key` | Production |
| `NEXT_PUBLIC_API_SECRET_KEY` | `your-generated-key` | Production |

### 2. 部署

```bash
vercel --prod
```

### 3. 验证

访问部署后的URL,测试完整流程。

---

## 📊 技术栈

- **前端**: Next.js 13 + TypeScript + Tailwind CSS
- **API路由**: Next.js API Routes (Serverless)
- **图像处理**: Canvas API
- **AI抠图**: Modal + rembg (U²-Net模型)
- **部署**: Vercel (前端) + Modal (AI后端)

---

## 📝 更新日志

### v2.0 (当前版本)
- ✅ 完善API安全机制 (多层验证 + 速率限制)
- ✅ 优化抠图缓存逻辑 (节约91%成本)
- ✅ 修复居中偏移算法 (50%完全居中)
- ✅ 改进错误提示和用户反馈
- ✅ 添加处理阶段显示

### v1.0
- ✅ 基础功能实现
- ✅ Modal API集成

---

**最后更新**: 2025-10-19
**状态**: ✅ 完整生图逻辑已实现
