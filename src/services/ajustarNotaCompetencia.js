export default function ajustarNotaCompetencia(nota) {
  const notasPermitidas = [0, 40, 80, 120, 160, 200]

  // Se a nota já for permitida, retorna-a
  if (notasPermitidas.includes(nota)) {
    return nota
  }

  // Procura a nota permitida mais próxima
  const notaAjustada = notasPermitidas.reduce((prev, curr) => {
    const diffPrev = Math.abs(prev - nota)
    const diffCurr = Math.abs(curr - nota)

    // Se a diferença for menor para o valor atual, retorna o valor atual
    // Em caso de empate, retorna o maior valor (Math.max)
    if (diffCurr < diffPrev) {
      return curr
    } else if (diffCurr === diffPrev) {
      return Math.max(prev, curr)
    } else {
      return prev
    }
  })

  return notaAjustada
}
