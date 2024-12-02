//Класс - это инструкция для создания однотипных объектов

//Инкапсуляция
class User {
    #name = ''

    constructor(name, site, birth) {
        this.name = name
        this.site = site
        this.dateOfBirth = birth
    }

    /* getName(){
         return this.#name
     }*/

    /*setName(value){
        this.#name = value
    }*/
    get name() {
        return this.#name
    }

    set name(value) {
        value === 'DartVader'
            ? this.#name = value + ' is sith!'
            : this.#name = value
    }

    hello() {
        console.log(`I am ${this.name} from ${this.site}`)
    }
}

const u1 = new User('Andrey', 'www.fanat1k.ru', new Date(1990, 6, 1))
const u2 = new User('Petr', 'www.petr.ru', new Date(2018, 11, 9))

console.log(u1)
console.log(u2)

u1.hello()

//u1.setName('DartVader')
u1.name = 'DartVader'
console.log(u1.hello === User.prototype.hello) //true

console.log(u1.name)

//Наследование

class Coder extends User {
    constructor(name, site, birth, tech) {
        super(name, site, birth);
        this.tech = tech
    }
    code() {
        console.log(`I am ${this.name} , here is my code in ${this.tech}: const sum = (a,b) => a + b`)
    }
    hello(){
        super.hello()
        console.log('I am russian')
    }
}

const coder1 = new Coder('Andrey Coder', 'www.weddeveloper2020@.com', new Date(1990, 6, 1), 'JS')

coder1.hello()