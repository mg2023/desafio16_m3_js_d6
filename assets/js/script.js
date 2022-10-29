const idMontoAConvertir = document.querySelector('#monto-a-convertir')
const idTipoDeCambio = document.querySelector('#tipo-de-cambio')
const idBtnConvertir = document.querySelector('#btn-convertir')

idBtnConvertir.addEventListener('click', () => {
  console.log('entra al presionar el boton')
  // console.log(idMontoAConvertir.value)
  // console.log(idTipoDeCambio.value)
  conversorMoneda(idMontoAConvertir.value, idTipoDeCambio.value)
})

// Para convertir necesito monto y el tipo de cambio
async function conversorMoneda (monto, tipoDeCambio) {
  console.log(monto)
  console.log(tipoDeCambio)
  const relacionDeConversion = await solicitarRelacionDeConversion(tipoDeCambio)
  console.log(relacionDeConversion)
}

async function solicitarRelacionDeConversion (tipoDeCambio) {
  try {
    console.log(tipoDeCambio)
    const res = await fetch('https://mindicador.cl/api')
    const data = await res.json()
    return data[tipoDeCambio].valor
  } catch (error) {
    alert(error.message)
  }
}
