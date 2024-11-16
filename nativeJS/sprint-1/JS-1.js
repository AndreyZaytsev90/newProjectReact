//Примитивы
console.log(typeof null) // "object" - задумывался как ссылка на не существующий объект (определенное отсутствие)
console.log(typeof typeof null) // string
console.log(typeof undefined) // "undefined" (отсутствие определенности)
console.log(typeof 123) // "number"
console.log(typeof NaN) // "number" - не число
console.log(typeof Infinity) // "number" - не число

console.log(10 * null) // 0
console.log(10 * "0") // 0
console.log(10 * undefined) // NaN

console.log(10 + "0") // 100

console.log(10 / 0) // Infinity

//Symbol
console.log(typeof Symbol) // function
//BigInt
console.log(typeof BigInt) // function

let number //undefined
const func = () => {}
console.log(func()) // undefined (нет явного return у функции func)

// Объекты:

// ARRAYS => "object" => Array.isArray([]) => true || false
// OBJECTS => "object"
// FUNCTION => "function"

// 1 - Сложные или составные типы данных (состоят из примитивов)
// 2 - имеют свойства и методы
// 3 - представляют собой ссылочный тип данных

const bob = {
  // ссылка на объект (ссылка на ячейку в памяти, допустим #123)
  name: "Bob",
  age: 34,
} // Инструкция по созданию объекта с ключом/свойством "name" и значением "Bob"

const alex = bob // новая ссылка на объект в ячейку #123 (НОВЫЙ ОБЪЕКТ НЕ СОЗДАЕТСЯ)

// {} литерал объекта,
// new Object() - класс, функция-конструктор для создания объекта

// [] литерал массива, состоит из элементов
// new Array() - функция-конструктор для создания объекта

bob.age = 35
console.log(bob) // Объект мутировал, что плохо

//Иммутабельные изменения

let copyBob = { ...bob, age: 36 } // делаем копию и вносим изменения в нужное свойство (или добавляем новое свойство) #124
console.log(copyBob) // Далее работаем с копией

const user = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  },
]
const todos = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: "et porro tempora",
    completed: true,
  },
]

//CRUD

// add todo

/*const copy = structuredClone(todos)*/
const newTodo = { userId: 1, id: 5, title: "newTodo", completed: false }
const copy1_todos = [...todos, newTodo]

// delete todo

const copy2_todos = todos.filter((t) => t.id !== 4) //оставь только те todo, у которых id не равно выбранному

// update todo

const copy3_todos = todos.map((t) =>
  t.id === 2 ? { ...t, title: "SPARTAK!!", completed: true, address: "Russia" } : t,
)
const copy1_user = user.map((el) =>
  el.id === 1 ? { ...el, address: { ...el.address, city: "Moscow" }, company: { ...el.company, name: "Yandex" } } : el,
)

const copy4_todos = todos.map((todo) => todo) // [...todos]
const copy5_todos = todos.map((todo) => ({ ...todo })) // глубокая копия

// read todo

console.log(user)
console.log(todos)
console.log(copy1_todos)
console.log(copy2_todos)
console.log(copy3_todos)
console.log("copy4_todos", copy4_todos)
console.log("copy5_todos", copy5_todos)

// console.log(copy1_user)
