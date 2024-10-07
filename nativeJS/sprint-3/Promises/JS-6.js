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
    return new Promise((resolve, reject)=> {
    setTimeout(()=> {
        resolve()
        //reject()
    }, 3000)
    })
}

const promise = promiseFetch('yandex.ru') // promise - это объект промиса

console.log(promise)

promise.then((data)=> {
    setState(data)
})