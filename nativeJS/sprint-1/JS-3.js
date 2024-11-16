const sm = document.getElementById("small")
const md = document.getElementById("medium")
const bg = document.getElementById("big")

const handlerSM = (event) => {
  console.log(event.currentTarget)
  //event.stopPropagation()
  /*event.currentTarget.tagName === "small" ? alert("small"): ''*/

  event.target.tagName === "BUTTON" ? alert(event.target.id) : ""
}

const handlerMD = (event) => {
  console.log(event.currentTarget)
}
const handlerBG = (event) => {
  console.log(event.currentTarget)
}
//Вызов функции во время клика на <div id="small">
/*
sm.onclick = handlerSM1 //не сработает
sm.onclick = handlerSM2
sm.onclick = null*/

/*
sm.addEventListener('click', handlerSM1) // handlerSM1({...event...})
sm.addEventListener('click', handlerSM2)
sm.removeEventListener('click', handlerSM2)
*/

sm.addEventListener("click", handlerSM, false)
/*md.addEventListener('click', handlerMD,{capture: false}) //вызов на стадии погружения
bg.addEventListener('click', handlerBG, false) */

//Метод addEventListener позволяет
// 1) удобно вешать несколько событий(обработчиков) на один элемент
// 2) Обработчики не хранятся вместе с элементов. Его удобнее удалять
// 3) Он предоставляет объект с опциями для управления обработки событий

const a = document.getElementById("a")
a.addEventListener("click", a_click)

function a_click(e) {
  e.preventDefault() // отменяет действие браузера по-умолчанию
  alert("hey")
}
