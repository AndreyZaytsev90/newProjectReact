/*
const promise = new Promise((res, rej) => {
    setTimeout(() => {

           res("Data")


          // rej("Error")


    }, 2000)
})
promise.then((response)=>{
    console.log(response.data)
})*/

/*fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err)=> console.log(err))*/


const foo = async () => {
    try {
        //setLoader(true) отображение крутилки
        const dataFromPosts1 = await fetch('https://jsonplaceholder.typicode.com/posts/1').then((res)=>res.json())
        console.log("Первый пост :", dataFromPosts1.title)

        const dataFromAlbum1 = await fetch('https://jsonplaceholder.typicode.com/albums/1').then((res)=>res.json())
        console.log("Первый альбом :", dataFromAlbum1.title)
    }
    catch (error) {
        console.log("Ошибка :", error)
    }
    finally {
        //setLoader(false) отображение крутилки прекращено
    }
}

const something = foo()

console.log(something)

//-----------------------all

const pr1 = fetch('https://jsonplaceholder.typicode.com/posts/1')
const pr2 = fetch('https://jsonplaceholder.typicode.com/albfefefeums/1')

/*const bigData = Promise.all([pr1, pr2])

bigData.then((data)=> {
    console.log(data)
}).catch((error)=>{
    console.log("Error :" , error)
})*/


//-----------------------race (возвращает результат изменения любое из промисов, остальные игнарирует)
/*const bigData = Promise.race([pr1, pr2])

bigData.then((data)=> {
    console.log(data)
}).catch((error)=>{
    console.log("Error :" , error)
})*/


//--------------------------any (можно сделать несколько запросов на одинаковою информацию на разные сайты и вернется та, что пришла быстрее всех)

/*const bigData = Promise.any([pr1, pr2])

bigData.then((data)=> {
    console.log(data)
}).catch((error)=>{
    console.log("Error :" , error)
})*/

//------------------------------------allSettled (возвращает массив со status и value запросов, ни когда не реджектится)

const bigData = Promise.allSettled([pr1, pr2])

bigData.then((data)=> {
    console.log(data)
})