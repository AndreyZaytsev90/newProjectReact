const sm = document.getElementById('small')
const md = document.getElementById('medium')
const bg = document.getElementById('big')

const handlerSM= (event) => {
    console.log(event)
}

const handlerMD = (event) => {
    console.log(event)
}
const handlerBG = (event) => {
    console.log(event)
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

sm.addEventListener('click', handlerSM, false)
md.addEventListener('click', handlerMD,{capture: false}) //вызов на стадии погружения
bg.addEventListener('click', handlerBG, false) 
