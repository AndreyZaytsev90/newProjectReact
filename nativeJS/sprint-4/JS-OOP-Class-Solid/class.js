//Класс - это инструкция для создания однотипных объектов
class User {
    constructor(name, site, birth) {
        this.name = name
        this.site = site
        this.dateOfBirth = birth
    }
    hello(){
        console.log(`I am ${this.name} from ${this.site}`)
    }
}

const u1 = new User('Andey', 'www.fanat1k.ru', new Date(1990, 6 ,1))
const u2 = new User('Petr', 'www.petr.ru', new Date(2018, 11 ,9))

console.log(u1)
console.log(u2)

u1.hello()

console.log(u1.hello === User.prototype.hello) //true