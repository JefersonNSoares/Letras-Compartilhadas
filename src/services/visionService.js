import * as FileSystem from "expo-file-system"

const GOOGLE_VISION_API_KEY = process.env.GOOGLE_VISION_API_KEY

export async function extractTextFromImage(imageUri) {
  try {
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    })

    const body = {
      requests: [
        {
          image: { content: base64 },
          features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
        },
      ],
    }

    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    )

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro da API Vision:", errorData);
      return "Erro na API Vision.";
    }

    const data = await response.json()

    const extractedText =
      data.responses?.[0]?.fullTextAnnotation?.text || "Nenhum texto encontrado."

    return extractedText
  } catch (error) {
    console.error("Erro ao extrair texto:", error)
    return "Erro ao extrair texto."
  }
}