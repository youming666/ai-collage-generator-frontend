- ## 完整流程
```
1. 用户上传9张九宫格图片
   ↓ FileReader读取为Base64，支持拖拽上传
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
   ↓9 张图按顺序自动排布成九宫格，带白色间隙   | 间隙可配置（默认 10px）
13. 创建背景 (createBackground)
   ↓九宫格叠加到空白背景上，底部对齐，上部留空一行 | 背景比例 3:4
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
- 非常棒，接下来稍微做下SEO，围绕“ai collage generator”，“grid photo split”类似关键词进行SEO优化，同时修改显示语言，代码里保留中文的注释，但是会显示在网站上的文字，无论常显示还是提示词，都改成英文。