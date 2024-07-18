function Id() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

const todolistId1 = Id()
const todolistId2 = Id()

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
        {id: Id(), title: "HTML", isDone: true},
        {id: Id(), title: "CSS", isDone: true},
        {id: Id(), title: "ES6/TS", isDone: false},
        {id: Id(), title: "REACT", isDone: false},
    ],
    [todolistId2]: [
        {id: Id(), title: "Milk", isDone: true},
        {id: Id(), title: "Bread", isDone: true},
        {id: Id(), title: "Eggs", isDone: false},
        {id: Id(), title: "Butter", isDone: false},
    ],
    [12 + 58]: [], //70
    [key]: [], // интерпритатор прочитает значение переменной key, приведет к строке результат и назначит в качестве ключа - 70
    [12 < 58]: [], //true
    [Id()]: []  // результат выполнения функции Id() будет приведен к строке и передан в качестве ключа
}

console.log(tasks[todolistId1])

console.log(tasks[todolistId1].filter((t)=> t.id !== 'SQntd05JEsPI'))