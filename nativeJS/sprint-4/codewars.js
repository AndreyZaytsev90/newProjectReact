function positiveSum(arr) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 0) {
            sum += arr[i]
        }
    }
    return sum
}

/*const result = positiveSum([-1, 2, 3, 1, -1, -100])
console.log(result)*/


const simpleMultiplication = (num) => num % 2 === 0 ? num * 8 : num * 9


function sum(numbers) {
    let sum = 0
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i]
    }
    return numbers.length === 0 ? 0 : sum
}

function friend(friends) {
    let arr = []
    for (let i = 0; i < friends.length; i++) {
        friends[i].length === 4 ? arr.push(friends[i]) : []
    }
    return arr
}

function correct(string) {
    const s = string.indexOf('5')
    const o = string.indexOf('0')
    const one = string.indexOf('1')
    if (s) {
        return string.replace(s, 'S')
    }
    if (o) {
        return string.replace(o, 'O')
    }
    if (one) {
        return string.replace(one, 'I')
    }
}


const result = correct('PAR10')
console.log(result)
