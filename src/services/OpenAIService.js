// openAIServices.js
import axios from "axios"

// Idealmente, armazene a chave de API em uma variável de ambiente
const API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY

const openAI = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
})

export const generateEvaluation = async (redacao) => {
  // Constrói o prompt com o texto da redação
  const prompt = `
Você é um corretor especializado do ENEM. Sua tarefa é avaliar a seguinte redação com base nas cinco competências do ENEM. Para cada competência, atribua uma nota de 0 a 200 e forneça justificativas detalhadas, analisando aspectos específicos conforme descrito abaixo:

Redação:
${redacao}

### Instruções de Avaliação:

1. **Competência 1 – Gramática e Norma Culta:**
   - **Nota:** Atribua uma das seguintes pontuações padronizadas: 0, 40, 80, 120, 160 ou 200, conforme o nível de desempenho do candidato na competência avaliada.
   - **Descrição:** Explique os principais pontos relacionados à gramática, ortografia, concordância e uso da norma culta. Avalie ortografia, acentuação, pontuação, regência verbal e nominal, concordância, estrutura sintática e adequação ao registro formal da língua portuguesa.
   - **Sugestão de Melhoria:** Forneça sugestões para aprimorar a correção gramatical e o uso da norma culta.

2. **Competência 2 – Compreensão da Proposta:**
   - **Nota:** Atribua uma das seguintes pontuações padronizadas: 0, 40, 80, 120, 160 ou 200, conforme o nível de desempenho do candidato na competência avaliada.
   - **Descrição:** Avalie como o texto aborda o tema proposto e se cumpre os requisitos da proposta. Avalie se a redação aborda o tema de forma completa e se segue a estrutura dissertativo-argumentativa exigida. Verifique se há uso de repertório pertinente e legitimado.
   - **Sugestão de Melhoria:** Indique como o aluno pode melhorar a aderência ao tema, o aprofundamento da análise e a exploração de diferentes perspectivas.

3. **Competência 3 – Argumentação:**
   - **Nota:** Atribua uma das seguintes pontuações padronizadas: 0, 40, 80, 120, 160 ou 200, conforme o nível de desempenho do candidato na competência avaliada.
   - **Descrição:** Analise a clareza, coesão e relevância dos argumentos, bem como o uso de repertório sociocultural. Avalie a seleção, organização e consistência dos argumentos. O texto apresenta uma tese clara? Os argumentos são bem fundamentados e articulados?
   - **Sugestão de Melhoria:** Sugira maneiras de estruturar e fortalecer os argumentos. Indique maneiras de fortalecer a argumentação, como o uso de exemplos mais concretos, dados estatísticos, alusões históricas ou citações de especialistas.

4. **Competência 4 – Coesão e Coerência:**
   - **Nota:** Atribua uma das seguintes pontuações padronizadas: 0, 40, 80, 120, 160 ou 200, conforme o nível de desempenho do candidato na competência avaliada.
   - **Descrição:** Avalie a conexão entre as ideias, a organização do texto e a fluidez da argumentação. Avalie a organização das ideias, a fluidez entre os parágrafos e o uso adequado de mecanismos coesivos (como conectores, pronomes e elipses). O texto evita repetições excessivas e faz uso correto de pronomes e substituições lexicais?
   - **Sugestão de Melhoria:** Ofereça recomendações para melhorar a articulação e a sequência lógica do texto. Recomende formas de aprimorar a conexão entre as ideias, evitando trechos truncados ou confusos.

5. **Competência 5 – Proposta de Intervenção:**
   - **Nota:** Atribua uma das seguintes pontuações padronizadas: 0, 40, 80, 120, 160 ou 200, conforme o nível de desempenho do candidato na competência avaliada.
   - **Descrição:** Examine a pertinência e viabilidade da proposta de intervenção apresentada, bem como a capacidade de oferecer soluções para o problema abordado. Avalie a proposta de intervenção em relação à sua clareza, detalhamento e viabilidade.
   - **Sugestão de Melhoria:** Indique como a proposta pode ser aprimorada em termos de criatividade e exequibilidade. Indique como a proposta pode ser mais concreta, específica e inovadora.

6. **Sugestões Gerais de Melhoria:**
  - **Nota:**  Soma total das notas de todas as competencias.   
  - **Descrição:** Após a avaliação das competências, forneça um resumo com sugestões gerais para melhorar a redação como um todo.

### Formato de Resposta:
Retorne a avaliação no seguinte formato JSON, onde cada objeto representa uma competência e um objeto adicional para sugestões gerais:

[
  {
    "titulo": "Competência 1",
    "nota": 0,
    "descricao": "...",
    "sugesao_de_melhoria": "..."
  },
  {
    "titulo": "Competência 2",
    "nota": 0,
    "descricao": "...",
    "sugesao_de_melhoria": "..."
  },
  {
    "titulo": "Competência 3",
    "nota": 0,
    "descricao": "...",
    "sugesao_de_melhoria": "..."
  },
  {
    "titulo": "Competência 4",
    "nota": 0,
    "descricao": "...",
    "sugesao_de_melhoria": "..."
  },
  {
    "titulo": "Competência 5",
    "nota": 0,
    "descricao": "...",
    "sugesao_de_melhoria": "..."
  },
  {
    "titulo": "Melhoria Geral",
    "nota": ...,
    "descricao": "...",
  }
]
`

  try {
    const response = await openAI.post("/chat/completions", {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Você é um corretor especializado do ENEM.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 2048,
      temperature: 1.0,
    })
    const text = response.data.choices[0].message.content.trim()
    // Tenta converter a resposta para objeto JSON
    const evaluation = JSON.parse(text)
    return evaluation
  } catch (error) {
    console.error("Error generating evaluation:", error)
    throw error
  }
}
