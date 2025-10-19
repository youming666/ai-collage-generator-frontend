# API 密钥生成与使用指南

> 详细说明 API 密钥的原理、生成方法、配置流程

---

## 🔑 什么是 API 密钥？

API 密钥（API Key）是一个**随机生成的字符串**，用于验证请求者的身份，防止未授权访问。

### 类比理解

```
API 密钥 = 门禁卡

- 你的家门锁（API 端点）
- 只有持有正确门禁卡（API 密钥）的人才能进入
- 没有门禁卡或门禁卡错误 = 被拒绝访问（401 Unauthorized）
```

---

## 🎯 本项目的双密钥机制

### 为什么需要两个密钥？

本项目使用**两层密钥**来保护 API：

```
前端（用户浏览器）
  ↓ 携带【客户端密钥】
Vercel Serverless Function（代理）
  ↓ 验证客户端密钥
  ↓ 携带【服务端密钥】
Modal API（真实后端）
```

### 两个密钥的区别

| 密钥类型 | 变量名 | 位置 | 暴露风险 | 作用 |
|---------|-------|------|---------|------|
| **客户端密钥** | `VITE_API_SECRET_KEY` | 前端代码中 | 🟡 会暴露（在浏览器中可见） | 轻量级验证，防止基本滥用 |
| **服务端密钥** | `API_SECRET_KEY` | Vercel 后端环境变量 | 🟢 完全隐藏 | 强验证，保护 Modal API |

---

## 📐 密钥生成原理

### 什么是安全的密钥？

安全的 API 密钥需要：
1. **足够长**：至少 16-32 个字符
2. **随机性**：完全随机生成，无法猜测
3. **唯一性**：每个项目/环境都不同

### 生成方法对比

#### ❌ 不安全的密钥

```
password123          # 太简单，容易被猜到
myapikey            # 无随机性
123456789           # 纯数字，容易暴力破解
```

#### ✅ 安全的密钥

```
a7f3c9e2d8b4f1a6e9c3d7b2f5a8e1c4    # 32个随机十六进制字符
7d3f8a1c9e4b2f6a8d1c5e9b3a7f2d8c4e1a6f9c3b7d2a5e8f1c4b9d6a3e7f    # 64个字符（更安全）
```

---

## 🛠️ 密钥生成步骤

### 方法1: 使用 OpenSSL（推荐）

**Windows**:
```bash
# 生成 32 个字符（16 字节）的客户端密钥
openssl rand -hex 16

# 输出示例:
# 7d3f8a1c9e4b2f6a8d1c5e9b3a7f2d8c

# 生成 64 个字符（32 字节）的服务端密钥（更安全）
openssl rand -hex 32

# 输出示例:
# a7f3c9e2d8b4f1a6e9c3d7b2f5a8e1c4d9a3e7f2b5c8d1a4e7f3b6c9d2a5e8f1
```

**命令解释**:
- `openssl`: 加密工具
- `rand`: 生成随机数
- `-hex`: 以十六进制输出
- `16`: 生成 16 字节（= 32 个十六进制字符）
- `32`: 生成 32 字节（= 64 个十六进制字符）

### 方法2: 使用 Node.js

```bash
# 生成客户端密钥（32 字符）
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"

# 生成服务端密钥（64 字符）
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 方法3: 使用 Python

```bash
# 生成客户端密钥
python -c "import secrets; print(secrets.token_hex(16))"

# 生成服务端密钥
python -c "import secrets; print(secrets.token_hex(32))"
```

### 方法4: 在线生成器（不推荐）

访问：https://www.uuidgenerator.net/api/guid

⚠️ **注意**：在线工具可能不够安全，建议使用本地命令生成。

---

## 📋 完整配置步骤

### 第1步：生成两个密钥

在命令行执行：

```bash
# 1. 生成客户端密钥（保存这个值）
openssl rand -hex 16

# 假设输出: 7d3f8a1c9e4b2f6a8d1c5e9b3a7f2d8c
# 复制这个值，记为：CLIENT_KEY

# 2. 生成服务端密钥（保存这个值）
openssl rand -hex 32

# 假设输出: a7f3c9e2d8b4f1a6e9c3d7b2f5a8e1c4d9a3e7f2b5c8d1a4e7f3b6c9d2a5e8f1
# 复制这个值，记为：SERVER_KEY
```

**记录到安全的地方**（如密码管理器）：
```
CLIENT_KEY = 7d3f8a1c9e4b2f6a8d1c5e9b3a7f2d8c
SERVER_KEY = a7f3c9e2d8b4f1a6e9c3d7b2f5a8e1c4d9a3e7f2b5c8d1a4e7f3b6c9d2a5e8f1
```

### 第2步：配置 Vercel 环境变量

#### 方式A：通过 Vercel 控制台（推荐）

1. **访问 Vercel 项目设置**
   ```
   https://vercel.com/liu-mings-projects-0a83d044/3d-nine-grid/settings/environment-variables
   ```

2. **添加三个环境变量**

   **变量1：Modal API 地址**
   ```
   Key:   MODAL_API_URL
   Value: 
   Environment: Production
   ```

   **变量2：服务端密钥（强验证）**
   ```
   Key:   API_SECRET_KEY
   Value: a7f3c9e2d8b4f1a6e9c3d7b2f5a8e1c4d9a3e7f2b5c8d1a4e7f3b6c9d2a5e8f1
   Environment: Production
   ```

   **变量3：客户端密钥（前端使用）**
   ```
   Key:   VITE_API_SECRET_KEY
   Value: 7d3f8a1c9e4b2f6a8d1c5e9b3a7f2d8c
   Environment: Production
   ```

3. **点击 "Save" 保存每个变量**

#### 方式B：通过 Vercel CLI

```bash
# 进入项目目录
cd D:\work\CC\3D-nine-grid-pic

# 添加 Modal API URL
vercel env add MODAL_API_URL production
# 粘贴: https://YOUR_USERNAME--3d-nine-grid-bg-removal.modal.run


# 添加服务端密钥
vercel env add API_SECRET_KEY production
# 粘贴: a7f3c9e2d8b4f1a6e9c3d7b2f5a8e1c4d9a3e7f2b5c8d1a4e7f3b6c9d2a5e8f1

# 添加客户端密钥
vercel env add VITE_API_SECRET_KEY production
# 粘贴: 7d3f8a1c9e4b2f6a8d1c5e9b3a7f2d8c
```

### 第3步：更新前端配置

编辑 `index.html`，设置客户端密钥：

```html
<!-- 简化的环境变量配置 -->
<script>
  // 为 Vercel 部署设置默认值
  window.__ENV__ = {
    VITE_API_BASE_URL: '/api',
    VITE_API_SECRET_KEY: '7d3f8a1c9e4b2f6a8d1c5e9b3a7f2d8c' // 你的客户端密钥
  };
</script>
```

或者在 `.env` 文件中（本地开发）：

```bash
VITE_API_BASE_URL=/api
VITE_API_SECRET_KEY=7d3f8a1c9e4b2f6a8d1c5e9b3a7f2d8c
```

### 第4步：重新部署

```bash
vercel --prod
```

---

## 🔍 工作原理详解

### 请求流程

```
1. 用户点击"生成3D效果"
   ↓
2. 前端 app.js 发送请求:
   fetch('/api/remove-bg', {
     headers: {
       'X-API-Key': '7d3f8a1c9e4b2f6a8d1c5e9b3a7f2d8c'  // 客户端密钥
     },
     body: formData
   })
   ↓
3. Vercel Serverless Function (api/remove-bg.js) 接收:
   - 检查 req.headers['x-api-key']
   - 对比 process.env.API_SECRET_KEY
   - ✅ 匹配 → 继续
   - ❌ 不匹配 → 返回 401 Unauthorized
   ↓
4. 转发到 Modal API:
   fetch(process.env.MODAL_API_URL + '/remove_bg', {
     body: formData
   })
   ↓
5. Modal 处理完成，返回图片
   ↓
6. Vercel 转发给前端
   ↓
7. 前端显示结果
```

### 代码层面

**前端（app.js）**:
```javascript
const API_SECRET_KEY = getEnv('VITE_API_SECRET_KEY', '');

const response = await fetch(`${API_BASE_URL}/remove-bg`, {
    headers: {
        'X-API-Key': API_SECRET_KEY  // 发送客户端密钥
    },
    body: formData
});
```

**后端（api/remove-bg.js）**:
```javascript
const API_SECRET_KEY = process.env.API_SECRET_KEY;  // 从环境变量读取

// 验证客户端密钥
const clientApiKey = req.headers['x-api-key'];
if (!clientApiKey || clientApiKey !== API_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized - Invalid API key' });
}

// 密钥正确，转发到 Modal
const MODAL_API_URL = process.env.MODAL_API_URL;
fetch(`${MODAL_API_URL}/remove_bg`, { ... });
```

---

## ❌ 当前错误分析

### 错误信息

```json
{
  "error": "Unauthorized - Invalid API key"
}
```

### 错误原因

这个错误说明：
1. ❌ **客户端密钥不匹配**
   - 前端发送的密钥：`req.headers['x-api-key']`
   - 后端期望的密钥：`process.env.API_SECRET_KEY`
   - 两者不一致！

### 可能的原因

**原因1：Vercel 环境变量未设置**
- 在 Vercel 控制台没有添加 `API_SECRET_KEY`
- 或者添加了但环境选错了（应该是 Production）

**原因2：前端密钥未配置**
- `index.html` 中的 `VITE_API_SECRET_KEY` 为空字符串
- 前端发送了空密钥，后端拒绝

**原因3：密钥不匹配**
- 前端使用的密钥：`7d3f8a1c...`
- 后端期望的密钥：`a7f3c9e2...`
- 两者必须**完全相同**！

**原因4：部署后未重新构建**
- 修改了环境变量后，需要重新部署
- 旧的部署没有新的环境变量

---

## ✅ 修复步骤

### 1. 生成密钥

```bash
openssl rand -hex 32
```

假设输出：`abc123def456...`（实际会是64个字符）

### 2. 配置 Vercel（两个地方都要设置相同的密钥）

在 Vercel 控制台添加：

| Key | Value | Environment |
|-----|-------|-------------|
| `MODAL_API_URL` | `https://YOUR_USERNAME--3d-nine-grid-bg-removal.modal.run
` | Production |
| `API_SECRET_KEY` | `abc123def456...`（你生成的密钥） | Production |

### 3. 更新前端代码

编辑 `D:\work\CC\3D-nine-grid-pic\index.html`:

```html
<script>
  window.__ENV__ = {
    VITE_API_BASE_URL: '/api',
    VITE_API_SECRET_KEY: 'abc123def456...' // 相同的密钥！
  };
</script>
```

### 4. 重新部署

```bash
cd D:\work\CC\3D-nine-grid-pic
vercel --prod
```

### 5. 验证

访问部署后的网站，打开浏览器控制台：

```javascript
// 检查环境变量是否正确
console.log(window.ENV);
// 应该输出: { VITE_API_BASE_URL: '/api', VITE_API_SECRET_KEY: 'abc123def456...' }

// 检查密钥是否发送
// 在 Network 标签中查看请求头，应该有:
// X-API-Key: abc123def456...
```

---

## 🔒 安全最佳实践

### 1. 密钥管理

- ✅ 使用密码管理器保存密钥（如 1Password、Bitwarden）
- ✅ 定期更换密钥（建议每月一次）
- ❌ 不要在代码中硬编码密钥（除了客户端密钥）
- ❌ 不要将 `.env` 文件提交到 Git

### 2. 密钥强度

| 长度 | 安全性 | 使用场景 |
|-----|-------|---------|
| 16 字符 | 🟡 中等 | 客户端密钥（会暴露） |
| 32 字符 | 🟢 高 | 服务端密钥（推荐） |
| 64 字符 | 🟢 很高 | 高敏感应用 |

### 3. 密钥轮换

发现异常流量时，立即更换密钥：

```bash
# 1. 生成新密钥
openssl rand -hex 32

# 2. 更新 Vercel 环境变量
vercel env rm API_SECRET_KEY production
vercel env add API_SECRET_KEY production
# 输入新密钥

# 3. 更新前端代码中的 VITE_API_SECRET_KEY

# 4. 重新部署
vercel --prod
```

---

## 🧪 测试验证

### 测试1: 验证密钥配置

```bash
# 访问部署后的网站
# 打开浏览器控制台
console.log(window.ENV.VITE_API_SECRET_KEY);
# 应该输出你的密钥
```

### 测试2: 测试错误密钥

```bash
# 在控制台手动发送错误密钥
fetch('/api/remove-bg', {
  method: 'POST',
  headers: {
    'X-API-Key': 'wrong-key'
  }
});

// 应该返回 401 Unauthorized
```

### 测试3: 测试正确密钥

```bash
# 上传图片测试抠图功能
# 如果成功，说明密钥配置正确
```

---

## 📚 常见问题

### Q1: 客户端密钥会暴露吗？

**A**: 是的，客户端密钥会暴露在浏览器中。

**但这不是问题**，因为：
1. ✅ 有速率限制保护（10次/分钟）
2. ✅ 有来源验证（只允许你的域名）
3. ✅ 可以随时更换密钥
4. ✅ 成本有上限（每天最多 $26）

### Q2: 为什么不直接使用一个密钥？

**A**: 因为前端密钥必然会暴露。

如果只用一个密钥：
- 暴露了这个密钥 = 暴露了所有权限
- 无法区分前端请求和恶意请求

双密钥机制：
- 客户端密钥暴露 = 仅暴露有限权限
- 服务端密钥永不暴露 = Modal API 完全安全

### Q3: 我需要在哪些地方配置密钥？

**A**: 三个地方

1. **Vercel 环境变量**（后端）
   - `API_SECRET_KEY`
   - `MODAL_API_URL`

2. **前端代码**（`index.html`）
   - `VITE_API_SECRET_KEY`

3. **本地开发**（`.env` 文件）
   - `VITE_API_SECRET_KEY`

### Q4: 密钥泄露了怎么办？

**A**: 立即更换

```bash
# 1. 生成新密钥
openssl rand -hex 32

# 2. 更新 Vercel
# 3. 更新前端代码
# 4. 重新部署
```

在更换期间（5-10分钟），服务会暂时不可用。

---

## 📊 密钥对比

| 特性 | 客户端密钥 | 服务端密钥 |
|-----|----------|-----------|
| 变量名 | `VITE_API_SECRET_KEY` | `API_SECRET_KEY` |
| 长度 | 32 字符（16 字节） | 64 字符（32 字节） |
| 位置 | 前端代码 | Vercel 后端 |
| 可见性 | 🔴 公开（浏览器可见） | 🟢 完全隐藏 |
| 作用 | 基础验证 | 保护 Modal API |
| 更换频率 | 每月 | 每季度 |
| 泄露风险 | 🟡 中（有速率限制保护） | 🔴 高（需立即更换） |

---

**最后更新**: 2025-10-18
**状态**: ✅ 详细文档
**注意**: 请妥善保管你的密钥，不要分享给他人！
