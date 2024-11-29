const deleteUser = (userId) => {
    const action = {
        type: "DELETE-USER",
        payload: {
            userId: userId
        },
        m(){

        }
    }
    return action
}

//const action1 = deleteUser('q3543ret')

//console.log(action1)



function commonHello(){
    console.log(`I am ${this.name} from ${this.site}`)
}
const userFabric = (name) => {
    const user = {
        name: name,
        site: 'fanat1k.ru',
        dateOfBirth: new Date (1990, 6, 1),
        hello: commonHello
    }
    return user
}


const  user1 = userFabric('Andrey')
user1.hello()
console.log(user1)