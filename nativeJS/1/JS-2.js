const students = [
    {
        name: "Bob",
        age: 22,
        isMarried: true,
        scores: 85,
    },
    {
        name: "Alex",
        age: 19,
        isMarried: false,
        scores: 100,
    },
    {
        name: "Alex",
        age: 21,
        isMarried: true,
        scores: 89,
    },
    {
        name: "Nick",
        age: 20,
        isMarried: false,
        scores: 120,
    },
    {
        name: "John",
        age: 19,
        isMarried: false,
        scores: 100,
    },
    
];
// Метод — это функция, которая является свойством объекта, и для массивов это особенно актуально. Массивы в JavaScript имеют множество встроенных методов, которые позволяют выполнять различные операции с элементами массива. 

const newStudent = students.map(st => st.name === "Alex" ? {...st, age: 25} : st) // изменение свойства в новом массиве

const newStudent2 = newStudent.filter(st => st.name !== "John") // новый массив без John

console.log(students)
console.log(newStudent)
console.log(newStudent2)
console.log([])

//глобальный объект(функция) предназначенный для создания массивов
console.log(Array.prototype)

const arr = new Array(5)

console.dir(arr.__proto__ === Array.prototype) //true , .__proto__ - это сслыка на глобальный объект Array.prototype

const arr1 = new Array(5, 45, 64)
newArra1 = [...arr1, 69]
console.log(arr)
console.log(arr1)
console.log(newArra1)

Array.prototype.hey = function () {  // объявляем новую функцию в прототипе
    alert("HEY!!")
}

//Array.prototype.hey() // вызываем новую функцию hey()

//arr.hey() //теперь после появления hey() в прототипе глобального объекта Array теперь он доступен для любого массива

console.log(Array.isArray(arr)) // проверка на массив

//THIS

function myLength() {
   //this - тот, кто вызовет функцию
    console.log(this.length)
    return `Длина массива равна ${this.length}`
}

Array.prototype.myLength = myLength

arr.myLength()
arr1.myLength()

//map

Array.prototype.myMap = function map(callback) {
    const result = new Array()
    for (let i = 0; i < this.length; i++) {
        result[i] = callback(this[i])
    }
    return result
}

console.log([1,2,3,4,5].myMap(n => String(n)))

console.log(students.myMap(st => st.name === "Alex"? {...st, name: "Alexis"}: st))


//Filter
Array.prototype.myFilter = function filter(callback) {
    const result = new Array()
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i]) === true){
            result.push(this[i])
        }
    }
    return result
}

console.log(students.myFilter(st => st.name !== "Alex"))

//Find

Array.prototype.myFind = function find(callback) {
    const result = new Array()
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i]) === true){
            result.push(this[i])
            break
        }
    }
    return result.length > 0 ? result : undefined
}


console.log(students.myFind(st => st.name === "Alex"))