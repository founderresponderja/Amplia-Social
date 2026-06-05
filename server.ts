import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize GoogleGenAI client on the server
const defaultApiKey = process.env.GEMINI_API_KEY;
const defaultAi = new GoogleGenAI({
  apiKey: defaultApiKey || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Helper to resolve correct Gemini Client dynamically
function getActiveClient(customApiKey?: string) {
  if (customApiKey && typeof customApiKey === "string" && customApiKey.trim().length > 10) {
    return new GoogleGenAI({
      apiKey: customApiKey.trim(),
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return defaultAi;
}

// JSON body parser with generous limit
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Endpoint to generate social media texts/image prompts
app.post("/api/generate-drafts", async (req, res) => {
  const { idea, tone, language, customApiKey } = req.body;

  if (!idea) {
    return res.status(400).json({ error: "An idea or topic is required." });
  }

  const promptTone = tone || "professional";
  const targetLanguage = language || "English";

  try {
    const prompt = `Create tailored social media posts based on this concept/idea: "${idea}". 
The desired tone is "${promptTone}".
The target language is "${targetLanguage}". ALL post content copy must be written entirely in "${targetLanguage}".

Tone Styling Guide:
- professional: Polished, authoritative, industry-oriented, clear.
- witty: Quick-minded, slightly comedic, smart commentary.
- urgent: Creates FOMO, high action, immediate relevance, active verbs.
- inspirational: Uplifting, motivational, vision-focused, sharing inspiring lessons or metaphors.
- educational: Deeply informative, teaching key concepts, useful step-by-step takeaways, bullet points or statistics.
- humorous: Funny, playful, memes or lighthearted jokes, relatable situations.
- controversial: Engaging, thought-provoking, playing devil's advocate, challenging industry myths or standard assumptions in a professional and debate-spurring way.

Generate customized content and specific image prompt suggestions for LinkedIn, Twitter, Instagram, Facebook, and TikTok in the selected language.

Requirements for each platform:
1. LinkedIn (Long-Form & Structural):
   - Professional, inspiring, structuring with line breaks. Write in ${targetLanguage}.
   - Start with a compelling headline/hook.
   - Use list/bullet points if relevant to explain features.
   - Include 2-3 strategic hashtags in ${targetLanguage} at the bottom.
   - Image should use a landscape aspect ratio ("4:3").

2. Twitter/X (Short & Punchy):
   - Fast-paced, concise, must be strictly under 280 characters. Write in ${targetLanguage}.
   - Include 1 relevant hashtag at most.
   - Engaging call to action / thought-provoking question.
   - Image should use widescreen aspect ratio ("16:9").

3. Instagram (Visual & Hashtag-Rich):
   - Lifestyle/storytelling style, utilizing descriptive and emotionally resonant language. Write in ${targetLanguage}.
   - Generous use of relevant emojis.
   - Call to action ("Double tap if...", "Share your thoughts below!").
   - Include a dense hashtag block (5-10 strategic, relevant hashtags in ${targetLanguage}).
   - Image should use portrait/square aspect ratio ("1:1").

4. Facebook (Engaging & Community-Focused):
   - Warm, approachable, conversational copy. Write in ${targetLanguage}.
   - Clear and friendly call-to-action to spark discussion, shares, or comments.
   - Use page structure/paragraphs and 3-4 targeted hashtags.
   - Image should use standard landscape aspect ratio ("4:3").

5. TikTok (Highly Visual/Short Script Layout):
   - Dynamic structural script format: outline the Visual Scene, Voiceover copy, and On-Screen overlay captions (all written in ${targetLanguage}).
   - High energy, engaging hooks within the first 3 seconds.
   - Include suggestions for trending audios/vibes and 4-6 viral hashtags in ${targetLanguage}.
   - Image should use the vertical portrait aspect ratio ("9:16").

Images Prompt Rules (Always written in English so the image model understands perfectly):
- Create a detailed, descriptive art directive for a generated header or visual that encapsulates the post's core message.
- Include style (e.g. photorealistic tech workplace, high-contrast flat vector illustration, colorful isometric render, minimalist pastel aesthetic).
- DO NOT contain text or text overlays in the images. Focus purely on scenery, objects, humans, or abstract shapes to avoid typographic issues.`;

    const response = await getActiveClient(customApiKey).models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are an elite, highly creative multi-channel growth marketer and social media director. You write copy exactly matching the specified tone (professional, witty, urgent, inspirational, educational, humorous, or controversial) and custom tailors it for LinkedIn, Twitter, Instagram, Facebook, and TikTok. You write the actual content copy completely in the requested target language, but output your response as a valid JSON object matching the requested schema. Do not include any text outside the JSON block.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            linkedin: {
              type: Type.OBJECT,
              properties: {
                platform: { type: Type.STRING, description: "Must be 'LinkedIn'" },
                content: { type: Type.STRING, description: "The written long-form post content in selected language" },
                imagePrompt: { type: Type.STRING, description: "Detailed visual image generator prompt in English with strict instructions: 'No text or letters inside the design'" },
                aspectRatio: { type: Type.STRING, description: "Aspect ratio, strictly '4:3'" }
              },
              required: ["platform", "content", "imagePrompt", "aspectRatio"]
            },
            twitter: {
              type: Type.OBJECT,
              properties: {
                platform: { type: Type.STRING, description: "Must be 'Twitter'" },
                content: { type: Type.STRING, description: "Punchy tweet content in selected language, strictly under 280 characters total" },
                imagePrompt: { type: Type.STRING, description: "Detailed visual image generator prompt in English with strict instructions: 'No text or letters inside the design'" },
                aspectRatio: { type: Type.STRING, description: "Aspect ratio, strictly '16:9'" }
              },
              required: ["platform", "content", "imagePrompt", "aspectRatio"]
            },
            instagram: {
              type: Type.OBJECT,
              properties: {
                platform: { type: Type.STRING, description: "Must be 'Instagram'" },
                content: { type: Type.STRING, description: "Visual storytelling Instagram caption in selected language" },
                imagePrompt: { type: Type.STRING, description: "Detailed visual image generator prompt in English with strict instructions: 'No text or letters inside the design'" },
                aspectRatio: { type: Type.STRING, description: "Aspect ratio, strictly '1:1'" }
              },
              required: ["platform", "content", "imagePrompt", "aspectRatio"]
            },
            facebook: {
              type: Type.OBJECT,
              properties: {
                platform: { type: Type.STRING, description: "Must be 'Facebook'" },
                content: { type: Type.STRING, description: "Warm, conversational Facebook community copy in selected language" },
                imagePrompt: { type: Type.STRING, description: "Detailed visual image generator prompt in English with strict instructions: 'No text or letters inside the design'" },
                aspectRatio: { type: Type.STRING, description: "Aspect ratio, strictly '4:3'" }
              },
              required: ["platform", "content", "imagePrompt", "aspectRatio"]
            },
            tiktok: {
              type: Type.OBJECT,
              properties: {
                platform: { type: Type.STRING, description: "Must be 'TikTok'" },
                content: { type: Type.STRING, description: "Engaging TikTok quick narration screen script or hook content in selected language" },
                imagePrompt: { type: Type.STRING, description: "Detailed visual image generator prompt in English with strict instructions: 'No text or letters inside the design'" },
                aspectRatio: { type: Type.STRING, description: "Aspect ratio, strictly '9:16'" }
              },
              required: ["platform", "content", "imagePrompt", "aspectRatio"]
            }
          },
          required: ["linkedin", "twitter", "instagram", "facebook", "tiktok"]
        }
      }
    });

    const textResult = response.text;
    if (!textResult) {
      throw new Error("Empty response received from Gemini.");
    }

    const parsed = JSON.parse(textResult.trim());
    res.json(parsed);
  } catch (error: any) {
    console.error("Error generating texts:", error);
    res.status(500).json({ error: error?.message || "Failed to generate social content drafts." });
  }
});

// Endpoint to translate individual posts into other languages dynamically
app.post("/api/translate-text", async (req, res) => {
  const { text, targetLanguage, customApiKey } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text content is required for translation." });
  }
  const target = targetLanguage || "English";

  try {
    const prompt = `Please translate the following social media post perfectly into "${target}". 
Preserve all specific spacing, original emojis, mentions, links, and layout structure. 
Strictly translate any hashtags to fit native speakers of "${target}" naturally.
Do not insert any conversational remarks, intros, or markdown blocks like \`\`\`. Give ONLY the translated content text.

Post Content to Translate:
"${text}"`;

    const response = await getActiveClient(customApiKey).models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const translatedText = response.text || "";
    res.json({ translatedText: translatedText.trim() });
  } catch (error: any) {
    console.error("Error active translation:", error);
    res.status(500).json({ error: error?.message || "Could not translate post draft." });
  }
});

// Endpoint to generate runtime image tailored by aspect ratio using gemini-2.5-flash-image
app.post("/api/generate-image", async (req, res) => {
  const { prompt, aspectRatio, customApiKey } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "An image prompt description is required." });
  }

  const validAspectRatio = aspectRatio || "1:1";

  try {
    // Generate image runtime call using gemini-2.5-flash-image which supports 1:1, 4:3, 16:9
    const response = await getActiveClient(customApiKey).models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          {
            text: `${prompt}. Artistic layout, highly aesthetic, visually impactful, detailed composition. Prohibit all embedded words, text, or letters inside.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: validAspectRatio,
        },
      },
    });

    let base64Image = "";
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          base64Image = part.inlineData.data;
          break;
        }
      }
    }

    if (!base64Image) {
      throw new Error("No image data returned from image generation model.");
    }

    res.json({ imageUrl: `data:image/png;base64,${base64Image}` });
  } catch (error: any) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: error?.message || "Failed to generate visual content. Please make sure secrets are configured with a valid API key and terms are accepted." });
  }
});

// Server boot-up and static path routing
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
