# 部署检查清单

在部署前,请确保完成以下所有步骤:

## ✅ 本地开发配置

- [ ] 已安装Node.js 18+
- [ ] 已运行 `npm install`
- [ ] 已创建 `.env.local` 文件
- [ ] 已生成并配置API密钥
- [ ] 本地开发服务器正常运行 (`npm run dev`)
- [ ] 测试完整流程:
  - [ ] 上传九宫格图片
  - [ ] 上传主图
  - [ ] 抠图成功
  - [ ] 生成拼图成功
  - [ ] 参数调整实时预览
  - [ ] 下载图片成功

## ✅ Vercel部署配置

### 环境变量设置

访问: https://vercel.com/your-project/settings/environment-variables

添加以下环境变量 (Environment: **Production**):

```
MODAL_API_URL = 
API_SECRET_KEY = [你的密钥]
NEXT_PUBLIC_API_SECRET_KEY = [相同的密钥]
```

### 密钥生成命令

```bash
openssl rand -hex 32
```

**重要**: 复制生成的密钥,粘贴到上面两个位置!

### 部署步骤

1. 安装Vercel CLI:
```bash
npm install -g vercel
```

2. 登录:
```bash
vercel login
```

3. 部署:
```bash
vercel --prod
```

4. 等待部署完成,记录部署URL

## ✅ 部署后验证

访问部署的URL,依次测试:

- [ ] 页面正常加载
- [ ] 上传九宫格图片正常
- [ ] 上传主图正常
- [ ] 点击"抠图去背景"
  - [ ] 不报401错误 (密钥正确)
  - [ ] 不报429错误 (速率限制正常)
  - [ ] 2-5秒内返回结果 (Modal API正常)
  - [ ] 按钮变为"✓ 已抠图"
- [ ] 点击"生成3D拼图"正常
- [ ] 调整参数实时预览正常
- [ ] 下载图片正常

## ⚠️ 常见错误排查

### 401 Unauthorized

**原因**: API密钥配置错误

**检查**:
1. Vercel环境变量是否都配置了
2. `API_SECRET_KEY` 和 `NEXT_PUBLIC_API_SECRET_KEY` 是否相同
3. 配置后是否重新部署

**解决**: 重新生成密钥,更新Vercel环境变量,重新部署

### 429 Too Many Requests

**原因**: 触发速率限制 (10次/分钟)

**解决**: 等待1分钟后重试

### 500 Internal Server Error

**原因**: Modal API无法连接

**检查**:
1. `MODAL_API_URL` 是否正确
2. Modal服务是否运行中

**解决**: 访问 Modal Dashboard 检查服务状态

## 📊 成功指标

部署成功后,应该看到:

- ✅ 首次抠图: 2-5秒完成
- ✅ 后续抠图: 使用缓存,无需重复调用
- ✅ 参数调整: 实时预览,无延迟
- ✅ 50%偏移: 完全居中
- ✅ 错误提示: 清晰明确

## 🔧 更新环境变量

如果需要更新API密钥:

1. 生成新密钥: `openssl rand -hex 32`
2. 更新Vercel环境变量
3. 重新部署: `vercel --prod`
4. 等待5-10分钟生效

## 📞 支持

遇到问题? 检查以下文档:

- `SETUP.md` - 完整配置指南
- `API_KEY_GUIDE.md` - API密钥详细说明
- `PROJECT_REVIEW_V2.md` - 项目完整复盘

---

**检查清单完成日期**: ___________
**部署URL**: ___________
**部署人**: ___________
