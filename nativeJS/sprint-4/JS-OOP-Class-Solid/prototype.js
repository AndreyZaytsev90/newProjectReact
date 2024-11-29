//функция-конструктор
function DeleteUserAction (userId){
    //this = {}
    this.type = "DELETE-USER";
    this.payload = {
        userId: userId
    }
    //return this
}
//Экземпляр функции-конструктора DeleteUserAction
/*const action1 = new DeleteUserAction('343432frdfr')
console.log(action1)*/


// with prototype
function User(name, site, birth){
    this.name = name
    this.site = site
    this.dateOfBirth = birth
}

User.prototype.hello = function (){
    console.log(`I am ${this.name} from ${this.site}`)
}

const u1 = new User('Andey', 'www.fanat1k.ru', new Date(1990, 6 ,1))
const u2 = new User('Petr', 'www.petr.ru', new Date(2018, 11 ,9))

u1.hello()

