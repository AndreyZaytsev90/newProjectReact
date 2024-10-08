//promise

//import callbackFetch from './/ffdfdf'
//как было раньше. До прописов код был тяжело читаемым и сложно понятным и уходил вправо
/*
callbackFetch('bookstore.com/authors', (err, data) => {
    if (err) console.log(err)
    else {
        callbackFetch(`bookstore.com/authors/${data.id}`, (err, data) => {
            if (err) console.log(err)
            else {
                callbackFetch(`bookstore.com/authors/author/${data.books}`, (err, data) => {
                    if (err) console.log(err)
                    else {
                        callbackFetch(`bookstore.com/authors/author/book/${data.bookId}`, (err, data) => {
                            if (err) console.log(err)
                            else {
                                callbackFetch(`bookstore.com/authors/author/book/bookId/${data.pageId}`, (err, data) => {
                                    if (err) console.log(err)
                                    else {
                                        //...
                                        setPage(data)
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
})*/

/*function Promise(executor){
    const resolve = (data) => {
        return {
            state: 'fulfilled',
            result: data
        }
    }

    const reject = (err) => {
        return {
            state: 'rejected',
            result: err
        }
    }
    executor(resolve, reject)
}*/

/*
const promiseFetch = (url) => {
    return new Promise((resolve, reject)=> {
       fs.readFileSync(url, (err, data)=> {
           if (err) reject(err)
           else {
               resolve(data)
           }
       })
    })
}

const promise = promiseFetch('yandex.ru') // promise - это объект промиса*/


const promiseFetch = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("DATA") //- успех (тогда then)
            //reject() // - провал (тогда catch)
        }, 3000)
    })
}

const promise = promiseFetch('yandex.ru') // promise - это объект промиса, к котором зарезолвился data (DATA YOPTA)
//У объекта promise есть 3 метода: 
// then: для обработки resolve, 
// catch: для обработки reject, 
// finally: отработает в любом случае , чтобы не дублировать код в then и catch (например отключить крутилку)

// каждый метод так же возвращает promise для цепочки
console.log(promise)
//Подписываемся на успешное изменение промиса с пендинг на фулфилд (resolve)
promise.then(
    (data) => {
        //если промис зарезолвился, то метод then запустит колбэк и данные придут из свойства PromiseResult
        console.log("then :", data)
    },
    //можно обработать ошибку прямо из метода then (но так делают редко)
    /* (error)=> {
         console.log("catch from then:" , error)
     }*/)

//Подписываемся на неуспешное изменение промиса с пендинг на реджектед (reject)
promise.catch((error) => {
    //если промис зареджектился, то метод catch запустит колбэк и данные придут из свойства PromiseResult
    console.log("catch :", error)
})

promise.finally(() => {
    console.log("finally")
})


//Цепочка промисов
const promiseChain = promiseFetch('yandex.ru')
    .then((data) => {
        console.log("then1 :", data) //"DATA"
        // если не сделать return, то вслед промисе будет в data будет undefined
        return data + ' next'
    })
    .then((dataFromPromise1) => {
        console.log("then2 : ", dataFromPromise1) //"DATA next"
        throw new Error("some error")
    })
    .then(() => {
        console.log("then3 :") //undefined
    })

//Задача №1
const delay = (ms) => {
    if (ms >= 1000)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Hello!")
            }, ms)
        })
    else {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject("ms need > 1000 !")
            }, 1000)
        })
    }
}

delay(1000).then((data) => console.log(data)).catch((error)=> console.log(error))