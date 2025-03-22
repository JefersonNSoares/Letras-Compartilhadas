export default function ajustarNotasGeral(nota) {
  // Gera um array com valores permitidos: 0, 40, 80, ..., 1000
  const notasPermitidas = []
  for (let i = 0; i <= 1000; i += 40) {
    notasPermitidas.push(i)
  }

  // Se a nota já é permitida, retorna-a
  if (notasPermitidas.includes(nota)) {
    return nota
  }

  // Procura a nota permitida mais próxima
  const notaAjustada = notasPermitidas.reduce((prev, curr) => {
    const diffPrev = Math.abs(prev - nota)
    const diffCurr = Math.abs(curr - nota)

    if (diffCurr < diffPrev) {
      return curr
    } else if (diffCurr === diffPrev) {
      // Em caso de empate, retorna o maior valor
      return Math.max(prev, curr)
    } else {
      return prev
    }
  })

  return notaAjustada
}
