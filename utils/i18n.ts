// 国际化配置和翻译文本

export type Language = 'en' | 'zh';

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      split: 'Split Tool',
    },

    // Hero Section
    hero: {
      title: 'Free AI Photo Collage Maker',
      subtitle: '3D Grid Generator with AI Background Removal',
      description: 'Create stunning 3D photo collages in 90 seconds. Upload 9 grid photos + 1 main photo, let AI remove the background, and generate professional social media posts. No sign-up required, 5 free collages daily!',
      cta: 'Start Creating Now',
      tryDemo: 'Try Demo',
    },

    // Before/After Gallery
    beforeAfter: {
      title: 'See the Magic: Before & After',
      subtitle: 'Real examples created with our AI Collage Generator',
    },

    // How It Works
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Create professional 3D collages in 3 simple steps',
      step1Title: 'Upload Photos',
      step1Desc: 'Upload 9 grid photos and 1 main photo with subject',
      step2Title: 'AI Processing',
      step2Desc: 'Our AI removes background and creates 3D effect in 90 seconds',
      step3Title: 'Download & Share',
      step3Desc: 'Adjust parameters, download high-quality image, share on social media',
    },

    // Main Tool Section
    tool: {
      uploadGrid: 'Upload Grid Photos',
      uploadGridDesc: 'Upload 9 photos (drag to reorder)',
      uploadMain: 'Upload Main Photo',
      uploadMainDesc: 'Upload 1 photo with clear subject',
      generate: 'Generate Collage',
      download: 'Download Image',
      reset: 'Reset All',
      processing: 'AI Processing...',
      progress: 'Progress',
      scale: 'Scale',
      offsetX: 'Horizontal Offset',
      offsetY: 'Vertical Offset',
      dailyLimit: 'Daily Limit',
      remaining: 'Remaining',
      limitReached: 'Daily limit reached (5/5). Please try again tomorrow!',
      dragHint: 'Drag to reorder photos',
      removeImage: 'Remove image',
      clickToUpload: 'Click to upload',
      or: 'or',
      dragAndDrop: 'drag and drop',
      supportedFormats: 'Supports JPG, PNG, WEBP (max 10MB)',
      preview: 'Preview',
      noPreview: 'Upload photos to see preview',
    },

    // Features
    features: {
      title: 'Why Choose Our AI Collage Generator?',
      subtitle: '6 powerful features to create perfect social media posts',
      feature1Title: 'AI Background Removal',
      feature1Desc: 'Advanced AI automatically removes background from main photo, keeping only the subject for perfect 3D pop-out effect',
      feature2Title: '3D Pop-Out Effect',
      feature2Desc: 'Main subject appears to pop out of the grid background, creating eye-catching depth and professional look',
      feature3Title: 'Real-Time Adjustments',
      feature3Desc: 'Adjust scale, horizontal/vertical position with live preview - see changes instantly before downloading',
      feature4Title: 'Drag & Drop Reorder',
      feature4Desc: 'Easily reorder your 9 grid photos by dragging - no need to re-upload if you want different arrangement',
      feature5Title: 'High-Quality Export',
      feature5Desc: 'Download 1080×1440 (3:4) high-resolution images optimized for Instagram, Facebook, WeChat Moments',
      feature6Title: 'No Sign-Up Required',
      feature6Desc: 'Start creating immediately - no account needed. Get 5 free collage generations daily, no credit card required',
    },

    // Use Cases
    useCases: {
      title: 'Perfect For Every Occasion',
      subtitle: '3 popular use cases for AI photo collages',
      case1Title: 'Travel Memories',
      case1Desc: 'Combine scenic landscape photos as background grid, add yourself as main subject popping out. Perfect for sharing travel highlights on Instagram or Facebook. Create memorable vacation posts that stand out in feeds.',
      case2Title: 'Product Showcase',
      case2Desc: 'Display product from multiple angles in grid background, highlight main product shot with 3D effect. Ideal for e-commerce sellers, small businesses, online shops. Boost engagement and sales with professional-looking product collages.',
      case3Title: 'Event Highlights',
      case3Desc: 'Capture party/wedding moments in grid, feature the star (birthday person, couple) as pop-out subject. Great for celebrations, anniversaries, special occasions. Create shareable memories that friends and family will love.',
    },

    // FAQ
    faq: {
      title: 'Frequently Asked Questions',
      q1: 'How does AI background removal work?',
      a1: 'Our AI uses advanced machine learning to detect the main subject in your photo and automatically remove the background. It works best with clear subjects (people, pets, objects) against any background. The process takes about 90 seconds.',
      q2: 'What image formats are supported?',
      a2: 'We support JPG, JPEG, PNG, and WEBP formats. Each photo can be up to 10MB. For best results, use high-quality images with good lighting and clear subjects.',
      q3: 'Can I use the collages commercially?',
      a3: 'Yes! All collages you create are yours to use however you like - personal posts, business marketing, product listings, etc. No attribution required.',
      q4: 'Why is there a daily limit?',
      a4: 'The 5 collages per day limit helps us provide this free service to everyone. The limit resets at midnight (local time). If you need more, you can bookmark the page and return tomorrow!',
      q5: 'Do you store my photos?',
      a5: 'No. All processing happens in your browser and our secure servers. Photos are automatically deleted after processing. We don\'t store, share, or use your images for any purpose.',
      q6: 'What if the AI doesn\'t remove the background perfectly?',
      a6: 'Our AI works well with most photos, but complex backgrounds or low-contrast subjects may need adjustments. Try using photos with clear subject-background separation for best results. You can also upload a different main photo and try again.',
    },

    // CTA Section
    cta: {
      title: 'Ready to Create Your First 3D Collage?',
      subtitle: 'Free AI-powered tool. No sign-up. 5 collages daily.',
      button: 'Start Creating Now',
    },

    // Footer
    footer: {
      about: 'About AI Collage Generator',
      aboutText: 'Free online tool to create stunning 3D photo collages with AI background removal. Upload 9 grid photos + 1 main photo, our AI removes the background and generates professional-looking images perfect for Instagram, Facebook, WeChat Moments. No sign-up required, get 5 free collage generations daily. Built with Next.js and advanced AI technology.',
      keywords: 'Keywords',
      keywordsList: 'ai collage generator, photo grid maker, 3d photo collage, ai background removal, instagram grid, photo split tool, free collage maker, grid photo generator',
      seoText: 'Create professional AI photo collages for free. Our 3D grid generator with AI background removal lets you make stunning social media posts in 90 seconds. Perfect for Instagram, Facebook, and WeChat Moments. No sign-up needed - start making beautiful photo grids today!',
      rights: 'All rights reserved.',
    },

    // Split Tool - Hero
    splitHero: {
      title: 'Free Photo Grid Split Tool',
      subtitle: 'Split Images into 4-Grid (2×2) or 9-Grid (3×3) for Instagram',
      description: 'Upload one photo and split it into multiple grid cells for Instagram carousel posts. Customize gap size, download all at once or individually. No watermarks, no sign-up required!',
      cta: 'Start Splitting Now',
    },

    // Split Demo Gallery
    splitDemo: {
      title: 'See the Results',
      subtitle: 'Examples of 2×2 and 3×3 grid splits',
    },

    // Split How It Works
    splitHowItWorks: {
      title: 'How to Split Photos',
      subtitle: 'Create Instagram grid posts in 3 easy steps',
      step1Title: 'Upload Photo',
      step1Desc: 'Upload one image (JPG, PNG, WEBP, max 10MB)',
      step2Title: 'Choose Grid',
      step2Desc: 'Select 2×2 (4 photos) or 3×3 (9 photos), adjust gap size',
      step3Title: 'Download',
      step3Desc: 'Download all cells at once or individually, post on Instagram in order',
    },

    // Split Tool Section
    splitTool: {
      upload: 'Upload Photo',
      uploadDesc: 'Upload one image to split',
      gridSize: 'Grid Size',
      grid2x2: '2×2 (4 photos)',
      grid3x3: '3×3 (9 photos)',
      gapSize: 'Gap Size',
      gapSmall: 'Small',
      gapMedium: 'Medium',
      gapLarge: 'Large',
      split: 'Split Image',
      downloadAll: 'Download All',
      preview: 'Preview',
      noPreview: 'Upload photo to see preview',
      clickToUpload: 'Click to upload',
      or: 'or',
      dragAndDrop: 'drag and drop',
      supportedFormats: 'Supports JPG, PNG, WEBP (max 10MB)',
      downloading: 'Downloading...',
      download: 'Download',
    },

    // Split Use Cases
    splitUseCases: {
      title: 'Perfect For Instagram',
      subtitle: '3 popular ways to use grid split photos',
      case1Title: 'Panoramic Views',
      case1Desc: 'Split wide landscape photos into grids to create stunning panoramic effect on your Instagram profile. Perfect for travel photography, cityscapes, and nature shots. Make your feed stand out with cohesive grid layouts.',
      case2Title: 'Product Close-Ups',
      case2Desc: 'Showcase product details by splitting high-res images into grids. Great for e-commerce, fashion, jewelry, food photography. Let followers zoom in on different parts by swiping through carousel.',
      case3Title: 'Story Sequences',
      case3Desc: 'Create visual stories or step-by-step tutorials by splitting images into grid sequences. Ideal for recipes, DIY projects, before/after transformations. Engage followers with swipeable content.',
    },
  },

  zh: {
    // 导航栏
    nav: {
      home: '首页',
      split: '切图工具',
    },

    // 英雄区
    hero: {
      title: '免费AI拼图生成器',
      subtitle: '3D网格生成器 + AI智能抠图',
      description: '90秒创建惊艳的3D照片拼图。上传9张网格照片 + 1张主图,AI自动去除背景,生成专业社交媒体图片。无需注册,每天免费生成5张拼图!',
      cta: '立即开始创作',
      tryDemo: '试用演示',
    },

    // 前后对比画廊
    beforeAfter: {
      title: '见证魔法:前后对比',
      subtitle: '使用我们的AI拼图生成器创建的真实案例',
    },

    // 使用步骤
    howItWorks: {
      title: '使用方法',
      subtitle: '3个简单步骤创建专业3D拼图',
      step1Title: '上传照片',
      step1Desc: '上传9张网格照片和1张带主体的照片',
      step2Title: 'AI处理',
      step2Desc: '我们的AI在90秒内去除背景并创建3D效果',
      step3Title: '下载分享',
      step3Desc: '调整参数,下载高清图片,分享到社交媒体',
    },

    // 主工具区
    tool: {
      uploadGrid: '上传网格照片',
      uploadGridDesc: '上传9张照片(可拖拽排序)',
      uploadMain: '上传主图',
      uploadMainDesc: '上传1张带清晰主体的照片',
      generate: '生成拼图',
      download: '下载图片',
      reset: '全部重置',
      processing: 'AI处理中...',
      progress: '进度',
      scale: '缩放',
      offsetX: '水平偏移',
      offsetY: '垂直偏移',
      dailyLimit: '每日限额',
      remaining: '剩余',
      limitReached: '已达每日限额(5/5),请明天再试!',
      dragHint: '拖拽照片可排序',
      removeImage: '移除图片',
      clickToUpload: '点击上传',
      or: '或',
      dragAndDrop: '拖拽上传',
      supportedFormats: '支持JPG、PNG、WEBP格式(最大10MB)',
      preview: '预览',
      noPreview: '上传照片后显示预览',
    },

    // 功能特点
    features: {
      title: '为什么选择我们的AI拼图生成器?',
      subtitle: '6大强大功能助您创建完美社交媒体图片',
      feature1Title: 'AI智能抠图',
      feature1Desc: '先进AI自动去除主图背景,只保留主体,完美实现3D出格效果',
      feature2Title: '3D出格效果',
      feature2Desc: '主体从网格背景中跳出,创造吸引眼球的景深和专业效果',
      feature3Title: '实时调整',
      feature3Desc: '实时预览缩放、水平/垂直位置调整 - 下载前即可看到效果',
      feature4Title: '拖拽排序',
      feature4Desc: '轻松拖拽重新排列9张网格照片 - 无需重新上传即可调整布局',
      feature5Title: '高清导出',
      feature5Desc: '下载1080×1440 (3:4)高分辨率图片,专为Instagram、Facebook、微信朋友圈优化',
      feature6Title: '无需注册',
      feature6Desc: '立即开始创作 - 无需账号。每天免费生成5张拼图,无需信用卡',
    },

    // 使用场景
    useCases: {
      title: '适合各种场景',
      subtitle: 'AI照片拼图的3种热门用途',
      case1Title: '旅行回忆',
      case1Desc: '将风景照片作为网格背景,添加自己作为跳出的主体。非常适合在Instagram或Facebook分享旅行精彩瞬间。创建在动态中脱颖而出的难忘旅行帖子。',
      case2Title: '产品展示',
      case2Desc: '在网格背景中展示产品多角度,用3D效果突出主产品图。适合电商卖家、小企业、网店。用专业产品拼图提升互动和销量。',
      case3Title: '活动精彩',
      case3Desc: '在网格中捕捉派对/婚礼瞬间,突出明星(寿星、新人)作为跳出主体。适合庆祝活动、纪念日、特殊场合。创建朋友和家人都会喜欢的可分享回忆。',
    },

    // 常见问题
    faq: {
      title: '常见问题',
      q1: 'AI抠图是如何工作的?',
      a1: '我们的AI使用先进机器学习检测照片中的主体并自动去除背景。对清晰主体(人物、宠物、物品)效果最佳,任何背景都可以。处理大约需要90秒。',
      q2: '支持哪些图片格式?',
      a2: '我们支持JPG、JPEG、PNG和WEBP格式。每张照片最大10MB。为获得最佳效果,请使用光线充足、主体清晰的高质量图片。',
      q3: '我可以商用这些拼图吗?',
      a3: '可以!您创建的所有拼图都属于您,可以随意使用 - 个人帖子、商业营销、产品列表等。无需署名。',
      q4: '为什么有每日限额?',
      a4: '每天5张拼图的限制帮助我们为所有人提供免费服务。限额在午夜(本地时间)重置。如需更多,您可以收藏页面明天再来!',
      q5: '你们会存储我的照片吗?',
      a5: '不会。所有处理都在您的浏览器和我们的安全服务器中进行。照片在处理后自动删除。我们不会存储、分享或将您的图片用于任何目的。',
      q6: '如果AI没有完美去除背景怎么办?',
      a6: '我们的AI对大多数照片效果很好,但复杂背景或低对比度主体可能需要调整。尝试使用主体-背景分离清晰的照片以获得最佳效果。您也可以上传不同的主图再试一次。',
    },

    // CTA区域
    cta: {
      title: '准备创建您的第一张3D拼图?',
      subtitle: '免费AI工具。无需注册。每天5张拼图。',
      button: '立即开始创作',
    },

    // 页脚
    footer: {
      about: '关于AI拼图生成器',
      aboutText: '免费在线工具,使用AI抠图创建惊艳的3D照片拼图。上传9张网格照片 + 1张主图,我们的AI去除背景并生成适合Instagram、Facebook、微信朋友圈的专业图片。无需注册,每天免费生成5张拼图。采用Next.js和先进AI技术构建。',
      keywords: '关键词',
      keywordsList: 'AI拼图生成器,照片网格制作,3D照片拼图,AI抠图,Instagram网格,照片切图工具,免费拼图制作,网格照片生成器',
      seoText: '免费创建专业AI照片拼图。我们的3D网格生成器配备AI抠图功能,让您在90秒内制作惊艳的社交媒体帖子。适合Instagram、Facebook和微信朋友圈。无需注册 - 立即开始制作漂亮的照片网格!',
      rights: '版权所有。',
    },

    // 切图工具 - 英雄区
    splitHero: {
      title: '免费照片网格切图工具',
      subtitle: '将图片切割为4宫格(2×2)或9宫格(3×3)用于Instagram',
      description: '上传一张照片并切割为多个网格单元,用于Instagram轮播帖子。自定义间隙大小,批量或单独下载。无水印,无需注册!',
      cta: '立即开始切图',
    },

    // 切图演示画廊
    splitDemo: {
      title: '查看效果',
      subtitle: '2×2和3×3网格切割示例',
    },

    // 切图使用步骤
    splitHowItWorks: {
      title: '如何切割照片',
      subtitle: '3个简单步骤创建Instagram网格帖子',
      step1Title: '上传照片',
      step1Desc: '上传一张图片(JPG、PNG、WEBP,最大10MB)',
      step2Title: '选择网格',
      step2Desc: '选择2×2(4张照片)或3×3(9张照片),调整间隙大小',
      step3Title: '下载',
      step3Desc: '批量下载所有单元或单独下载,按顺序发布到Instagram',
    },

    // 切图工具区
    splitTool: {
      upload: '上传照片',
      uploadDesc: '上传一张图片进行切割',
      gridSize: '网格大小',
      grid2x2: '2×2 (4张照片)',
      grid3x3: '3×3 (9张照片)',
      gapSize: '间隙大小',
      gapSmall: '小',
      gapMedium: '中',
      gapLarge: '大',
      split: '切割图片',
      downloadAll: '下载全部',
      preview: '预览',
      noPreview: '上传照片后显示预览',
      clickToUpload: '点击上传',
      or: '或',
      dragAndDrop: '拖拽上传',
      supportedFormats: '支持JPG、PNG、WEBP格式(最大10MB)',
      downloading: '下载中...',
      download: '下载',
    },

    // 切图使用场景
    splitUseCases: {
      title: '完美适配Instagram',
      subtitle: '网格切图照片的3种热门用途',
      case1Title: '全景视图',
      case1Desc: '将宽幅风景照片切割为网格,在Instagram个人资料上创建惊艳的全景效果。适合旅行摄影、城市景观和自然风光。让您的动态以统一的网格布局脱颖而出。',
      case2Title: '产品特写',
      case2Desc: '通过将高分辨率图片切割为网格来展示产品细节。适合电商、时尚、珠宝、美食摄影。让关注者通过滑动轮播放大不同部分。',
      case3Title: '故事序列',
      case3Desc: '通过将图片切割为网格序列创建视觉故事或分步教程。适合食谱、DIY项目、前后对比。用可滑动内容吸引关注者。',
    },
  },
};

// 语言检测和管理
export class LanguageManager {
  private static STORAGE_KEY = 'preferred-language';

  // 检测用户首选语言
  static detectLanguage(): Language {
    if (typeof window === 'undefined') {
      return 'en';
    }

    // 1. 检查localStorage中的用户设置
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved === 'zh' || saved === 'en') {
      return saved;
    }

    // 2. 检测浏览器语言
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) {
      return 'zh';
    }

    // 3. 默认英文
    return 'en';
  }

  // 保存用户语言偏好
  static saveLanguage(lang: Language): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, lang);
    }
  }

  // 获取翻译文本
  static getTranslation(lang: Language) {
    return translations[lang];
  }
}
