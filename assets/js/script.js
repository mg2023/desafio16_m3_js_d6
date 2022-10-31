const idMontoAConvertir = document.querySelector('#monto-a-convertir')
const idTipoDeCambio = document.querySelector('#tipo-de-cambio')
const idBtnConvertir = document.querySelector('#btn-convertir')
const idResultadoConversion = document.querySelector('#resultado-conversion')
const idMyChart = document.getElementById('myChart')
let chart = ''

idBtnConvertir.addEventListener('click', async () => {
  const resultConversion = await conversorMoneda(idMontoAConvertir.value, idTipoDeCambio.value)
  idResultadoConversion.innerHTML = resultConversion.toFixed(2)

  // if (chart) {
  //   chart.destroy()
  // }
  renderGrafica(idTipoDeCambio.value)
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

// Creacion de la grafica
// Precio en el eje y
// Fecha en el eje x
async function getAndCreateDataToChart (tipoDeCambio) {
  // const res = await fetch('https://api.gael.cloud/general/public/sismos')
  const res = await fetch('https://mindicador.cl/api/' + tipoDeCambio)
  const dataraw = await res.json()

  // Se tienen 10 pares de valores y fechas
  let serie = dataraw.serie.slice(0, 10)
  serie = serie.reverse()

  // Datos para el eje X
  const labelsRaw = serie.map((e) => {
    return e.fecha
  })
  // Se quitan las horas ya que son innecesarias para el grafico
  const labels = []
  for (const x of labelsRaw) {
    labels.unshift(x.slice(0, 10))
  }

  // Datos para el eje Y
  const data = serie.map((e) => {
    return e.valor
  })

  const datasets = [
    {
      label: 'Historial Últimos 10 días',
      borderColor: 'rgb(255, 99, 132)',
      data
    }
  ]
  return { labels, datasets }
}

async function renderGrafica (tipoDeCambio) {
  const data = await getAndCreateDataToChart(tipoDeCambio)
  const config = {
    type: 'line',
    data
  }

  idMyChart.style.backgroundColor = 'white'
  if (chart) {
    chart.destroy()
  }
  chart = new Chart(idMyChart, config)
}
