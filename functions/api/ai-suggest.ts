interface Env {
  GEMINI_API_KEY?: string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const body = (await context.request.json().catch(() => ({}))) as any;
    const { prompt, language } = body;
    const apiKey = context.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'No GEMINI_API_KEY configured in Cloudflare Pages environment variables. Local smart culinary engine active.',
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Call Gemini Flash API directly from Cloudflare Edge Worker
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const systemPrompt = `You are an authentic Pakistani Master Chef and Certified Culinary Nutritionist. Answer concisely in ${language || 'Urdu'}.
Format JSON: { "reply": "detailed advice", "dishName": "name of dish", "category": "category", "prepTime": "25 mins", "calories": 280, "budgetEstimatePKR": 350 }`;

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nUser asked: "${prompt || 'آج کھانے میں کیا بنائیں؟'}"` }]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        maxOutputTokens: 800
      }
    };

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data: any = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    let parsedData = {};

    try {
      parsedData = JSON.parse(candidateText || '{}');
    } catch {
      parsedData = { reply: candidateText || 'شکریہ' };
    }

    return new Response(
      JSON.stringify({ success: true, data: parsedData }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: err?.message || 'Serverless edge error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
