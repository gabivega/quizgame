"use strict";
// import axios from "axios";
// export async function translateText(text: string, targetLang = "es"): Promise<string> {
//   try {
//     console.log(`🟡 Traduciendo: "${text}"`);
//     const response = await axios.post("https://libretranslate.de/translate", {
//       q: text,
//       source: "en",
//       target: targetLang,
//       format: "text"
//     }, {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });
//     const translated = response.data.translatedText;
//     console.log(`✅ Traducción completa: "${translated}"`);
//     return translated;
//   } catch (error) {
//     console.error("❌ Error en translateText():", error);
//     throw error;
//   }
// }
