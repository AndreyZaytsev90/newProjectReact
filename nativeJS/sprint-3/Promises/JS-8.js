//Функуция генератор
function* name(argument) {
    yield argument + (argument / 100) * 10
    yield argument + (argument / 100) * 15
    yield argument + (argument / 100) * 20
    yield argument + (argument / 100) * 25
    yield argument + (argument / 100) * 30
}

const generator = name(1000)

const result1 = generator.next()
const result2 = generator.next()

console.log(generator)
console.log(generator.next())
console.log(result1.value) //1100
console.log(result2.value) //1150

// eventloop

