
import { GoogleGenAI } from "@google/genai";

// Generate images using gemini-2.5-flash-image as the default for business infographics.
export const generateInfographicImage = async (prompt: string, language: 'English' | 'Traditional Chinese' = 'Traditional Chinese'): Promise<string | null> => {
  // Always use a direct reference to process.env.API_KEY when initializing.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const textRequirement = language === 'English' 
    ? "MANDATORY: Use ONLY English text. Strictly NO Chinese characters. Ensure text is professional and minimalist." 
    : "必須使用「繁體中文」呈現所有文字。確保文字極其清晰且易於閱讀。";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Create a professional flat design infographic or illustration based on this concept: ${prompt}.
            
            Core Requirements:
            1. Language: ${textRequirement}
            2. Style: Minimalist vector icons, clean lines, professional flat design.
            3. Palette: Use sophisticated blues, whites, and dark slate tones.
            4. Layout: Perfectly balanced composition, no clutter, clear visual hierarchy.
            5. Content: Do not use realistic photos. Use iconography to explain the concept.`
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      },
    });

    // The output response may contain both image and text parts; iterate through all parts to find the image part.
    const candidate = response.candidates[0];
    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("生成圖片時出錯:", error);
    return null;
  }
};

// Edit existing business visual assets using instructions and image context.
export const editExistingImage = async (base64Image: string, instruction: string): Promise<string | null> => {
  // Always use a direct reference to process.env.API_KEY when initializing.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1], // Extracting base64 data string
              mimeType: 'image/png',
            },
          },
          {
            text: `請根據此指令修改圖片：${instruction}`,
          },
        ],
      },
    });

    // Find the image part in the response, do not assume it is the first part.
    const candidate = response.candidates[0];
    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("編輯圖片時出錯:", error);
    return null;
  }
};