function Id() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

const todolistId1 = '1'
const todolistId2 = '2'

const todolist = [
  {
    id: todolistId1,
    title: 'What to learn',
    filter: 'all',
    /*tasks: [
        {id: Id(), title: "HTML", isDone: true},
        {id: Id(), title: "CSS", isDone: true},
        {id: Id(), title: "ES6/TS", isDone: false},
        {id: Id(), title: "REACT", isDone: false},
    ]*/
  },
  {
    id: todolistId2,
    title: 'What to buy',
    filter: 'all',
    /*tasks: [
        {id: Id(), title: "Milk", isDone: true},
        {id: Id(), title: "Bread", isDone: true},
        {id: Id(), title: "Eggs", isDone: false},
        {id: Id(), title: "Butter", isDone: false},
    ]*/
  }
]

console.log(todolist[0]["title"])

/*const tasks = [
    {id: Id(), todolistId: todolistId1, title: "HTML", isDone: true},
    {id: Id(), todolistId: todolistId1, title: "CSS", isDone: true},
    {id: Id(), todolistId: todolistId1, title: "ES6/TS", isDone: false},
    {id: Id(), todolistId: todolistId1, title: "REACT", isDone: false},
    {id: Id(), todolistId: todolistId2, title: "Milk", isDone: true},
    {id: Id(), todolistId: todolistId2, title: "Bread", isDone: true},
    {id: Id(), todolistId: todolistId2, title: "Eggs", isDone: false},
    {id: Id(), todolistId: todolistId2, title: "Butter", isDone: false},
]*/
let key = 12 + 58

const tasks = {
  // В JavaScript квадратные скобки [] в объявлении объекта используются для вычисляемых свойств.
  // Это означает, что значение внутри квадратных скобок будет вычислено и использовано как ключ объекта.
  [todolistId1]: [
    { id: '3', title: "HTML", isDone: true },
    { id: '4', title: "CSS", isDone: true },
    { id: '5', title: "ES6/TS", isDone: false },
    { id: '6', title: "REACT", isDone: false },
  ],
  [todolistId2]: [
    { id: '7', title: "Milk", isDone: true },
    { id: '8', title: "Bread", isDone: true },
    { id: '9', title: "Eggs", isDone: false },
    { id: '10', title: "Butter", isDone: false },
  ],
  /* [12 + 58]: [], //70
   [key]: [], // интерпретатор прочитает значение переменной key, приведет к строке результат и назначит в качестве ключа - 70
   [12 < 58]: [], //true
   [Id()]: []  // результат выполнения функции Id() будет приведен к строке и передан в качестве ключа*/
}

//console.log(tasks[todolistId1])

/*console.log(tasks[todolistId1].filter((t)=> t.id !== '4')) //удаление таски с id 4
console.log(tasks[todolistId2].filter((t)=> t.id !== '7')) //удаление таски с id 7*/

/*
console.log(tasks[todolistId1][3])*/


const todolistTasks = tasks[todolistId1]
const todolistTasks2 = tasks[todolistId2]


const filteredTasks = todolistTasks.filter((t) => t.id !== '4')
const filteredTasks2 = todolistTasks2.filter((t) => t.id !== '9')

const copyTasks = { ...tasks }
copyTasks[todolistId1] = filteredTasks
copyTasks[todolistId2] = filteredTasks2


console.log(tasks)
console.log(copyTasks)
const todolistTasks3 = copyTasks[todolistId1]

/*const newCopyTasks = {...copyTasks}
const filteredTasks3 = todolistTasks3.map((t)=> t.id === '5'? {...t, isDone: true}: t)
newCopyTasks[todolistId1] = filteredTasks3*/

console.log({ ...copyTasks, [todolistId1]: todolistTasks3.map((t) => t.id === '5' ? { ...t, "isDone": true } : t) })

/*console.log(tasks[todolistId1][0]['isDone'])*/


const arrayOfObjects = [
  { id: 1, name: 'Andrey', age: 34 },
  { id: 2, name: 'Olga', age: 36 },
  { id: 3, name: 'Petr', age: 5 }
];


const newObject = {}
// Преобразование массива arrayOfObjects в объект для ускорения поиска по ключам
for (let i = 0; i < arrayOfObjects.length; i++) {
  newObject[arrayOfObjects[i].id + "-" + [Id()]] = arrayOfObjects[i]
}

console.log(newObject) // {1-7S2KXKzWFDuc: {id: 1, name: 'Andrey', age: 34}, 2-xN7NyAdyK22t: {id: 2, name: 'Olga', age: 36}, 3-R4siF1sNsSnF: {id: 3, name: 'Petr', age: 5}}


const nums = [1, 2, 3, 4, 5]

const result = nums.reduce((acc, el) => {
  return acc + el
}, 0)

console.log(nums.reduce((acc, el) => acc + el, 0))


console.log(arrayOfObjects.reduce((acc, el) => {
  acc[el.id] = el
  delete acc[el.id].id
  return acc
}, {}))

// удаление с помощью reduce

const copyArrayOfObjects = [...arrayOfObjects]

console.log(copyArrayOfObjects.reduce((acc, el) => {
  if (el.id !== 1) {
    acc.push(el)
  }
  return acc
}, []))
