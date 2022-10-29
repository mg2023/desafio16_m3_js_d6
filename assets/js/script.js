const idMontoAConvertir = document.querySelector('#monto-a-convertir')
const idTipoDeCambio = document.querySelector('#tipo-de-cambio')
const idBtnConvertir = document.querySelector('#btn-convertir')
const idResultadoConversion = document.querySelector('#resultado-conversion')

idBtnConvertir.addEventListener('click', async () => {
  const resultConversion = await conversorMoneda(idMontoAConvertir.value, idTipoDeCambio.value)
  idResultadoConversion.innerHTML = resultConversion.toFixed(2)
})

// Para convertir necesito monto y el tipo de cambio
async function conversorMoneda (monto, tipoDeCambio) {
  const relacionDeConversion = await solicitarRelacionDeConversion(tipoDeCambio)
  const resultado = parseFloat(monto / relacionDeConversion)
  return (resultado)
}

async function solicitarRelacionDeConversion (tipoDeCambio) {
  try {
    const res = await fetch('https://mindicador.cl/api')
    const data = await res.json()
    return data[tipoDeCambio].valor
  } catch (error) {
    alert(error.message)
  }
}
