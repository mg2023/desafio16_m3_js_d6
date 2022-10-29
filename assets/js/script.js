const idMontoAConvertir = document.querySelector('#monto-a-convertir')
const idTipoDeCambio = document.querySelector('#tipo-de-cambio')
const idBtnConvertir = document.querySelector('#btn-convertir')
const idResultadoConversion = document.querySelector('#resultado-conversion')

idBtnConvertir.addEventListener('click', async () => {
  console.log(`(1)idMontoAConvertir.value = ${idMontoAConvertir.value}`)
  console.log(`(2)idTipoDeCambio.value = ${idTipoDeCambio.value}`)

  const resultConversion = await conversorMoneda(idMontoAConvertir.value, idTipoDeCambio.value)
  console.log('(7)vuelve ok')
  console.log(`resultConversion ${resultConversion}`)
  idResultadoConversion.innerHTML = resultConversion.toFixed(2)
})

// Para convertir necesito monto y el tipo de cambio
async function conversorMoneda (monto, tipoDeCambio) {
  console.log('(3)typeof monto')
  console.log(typeof (monto))
  console.log(tipoDeCambio)
  const relacionDeConversion = await solicitarRelacionDeConversion(tipoDeCambio)
  console.log(`(6)relacionDeConversion  ${relacionDeConversion}`)
  const resultado = parseFloat(monto / relacionDeConversion)
  return (resultado)
}

async function solicitarRelacionDeConversion (tipoDeCambio) {
  try {
    console.log((4))
    console.log(tipoDeCambio)
    const res = await fetch('https://mindicador.cl/api')
    const data = await res.json()
    console.log(`(5) ${typeof (data[tipoDeCambio].valor)}`)
    return data[tipoDeCambio].valor
  } catch (error) {
    console.log(error)
    alert(error.message)
  }
}
