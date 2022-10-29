const idBtnConvertir = document.querySelector('#btn-convertir')
const idMontoAConvertir = document.querySelector('#monto-a-convertir')
const idTipoDeCambio = document.querySelector('#tipo-de-cambio')

idBtnConvertir.addEventListener('click', () => {
  console.log('entra al presionar el boton')
  console.log(idMontoAConvertir.value)
  console.log(idTipoDeCambio.value)
  conversorMoneda()
})

// Para convertir necesito monto y el tipo de cambio
async function conversorMoneda () {
  const res = await fetch('https://mindicador.cl/api')
  const data = await res.json()
  console.log(data)
}

// const tareas = []
// btnAgregar.addEventListener('click', () => {
//   console.log('entra')
//   /* Agregamos el invitado al arreglo */
//   const nombreTarea = tareaInput.value
//   tareas.push({ id: Date.now(), nombre: nombreTarea })
//   tareaInput.value = ''
//   /* Actualizamos la información en el HTML */
//   renderInvitados()
// })

// function borrar (id) {
//   const index = tareas.findIndex((ele) => ele.id === id) /* 2.1 */
//   tareas.splice(index, 1) /* 2.2 */
//   renderInvitados()
// }

// /* Actualizamos la información en el HTML */
// function renderInvitados () {
//   let html = ''
//   for (const value of tareas) {
//     html += `<li>${value.nombre} <button
//     onclick="borrar(${value.id})"> x </button> </li>`
//   }
//   listaDeTareas.innerHTML = html
//   cuentaTareas.innerHTML = tareas.length
// }
