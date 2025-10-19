import { NextRequest, NextResponse } from 'next/server';

// 速率限制配置
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1分钟
  maxRequests: 10, // 最多10次请求
};

// 允许的来源
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://ai-collage-generator-frontend.vercel.app',
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : null,
].filter(Boolean) as string[];

// 速率限制检查
function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const data = rateLimitMap.get(clientId) || {
    count: 0,
    resetTime: now + RATE_LIMIT.windowMs,
  };

  // 时间窗口过期,重置计数器
  if (now > data.resetTime) {
    data.count = 0;
    data.resetTime = now + RATE_LIMIT.windowMs;
  }

  data.count++;
  rateLimitMap.set(clientId, data);

  return data.count <= RATE_LIMIT.maxRequests;
}

export async function POST(request: NextRequest) {
  try {
    // Layer 1: 验证来源
    const origin = request.headers.get('origin') || request.headers.get('referer') || '';
    const isAllowedOrigin = ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed));

    if (!isAllowedOrigin && process.env.NODE_ENV === 'production') {
      console.warn(`Blocked request from unauthorized origin: ${origin}`);
      return NextResponse.json({ error: 'Forbidden - Invalid origin' }, { status: 403 });
    }

    // Layer 2: 验证API密钥
    const clientApiKey = request.headers.get('x-api-key');
    const serverApiKey = process.env.API_SECRET_KEY;

    if (!clientApiKey || !serverApiKey || clientApiKey !== serverApiKey) {
      console.warn('Invalid API key attempt');
      return NextResponse.json({ error: 'Unauthorized - Invalid API key' }, { status: 401 });
    }

    // Layer 3: 速率限制
    const clientId = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';

    if (!checkRateLimit(clientId)) {
      console.warn(`Rate limit exceeded for client: ${clientId}`);
      return NextResponse.json(
        {
          error: 'Too many requests',
          retryAfter: RATE_LIMIT.windowMs / 1000,
        },
        { status: 429 }
      );
    }

    // Layer 4: 验证请求体
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // 验证文件类型
    if (!imageFile.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type - must be an image' }, { status: 400 });
    }

    // 验证文件大小 (10MB限制)
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (imageFile.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large - maximum 10MB' }, { status: 400 });
    }

    // Layer 5: 调用Modal API
    const modalUrl = process.env.MODAL_API_URL;

    if (!modalUrl) {
      console.error('MODAL_API_URL not configured');
      return NextResponse.json(
        { error: 'Background removal service not configured' },
        { status: 503 }
      );
    }

    const modalFormData = new FormData();
    modalFormData.append('file', imageFile);

    console.log(`Calling Modal API: ${modalUrl}/remove_bg`);

    const response = await fetch(`${modalUrl}/remove_bg`, {
      method: 'POST',
      body: modalFormData,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error(`Modal API error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`Modal API error: ${response.statusText}`);
    }

    const blob = await response.blob();

    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Access-Control-Allow-Origin': origin || '*',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Background removal error:', error);
    return NextResponse.json(
      {
        error: 'Failed to remove background',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// 处理CORS预检请求
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin') || '*';

  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
      'Access-Control-Max-Age': '86400',
    },
  });
}
