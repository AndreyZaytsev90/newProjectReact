console.log("js-5")

//Евгений Немировский 5 урок

// Lexical environmentm, closure, recursion

// let car = "bmw";

/* function startEngine() {
   //const car = "audi";
   return () => {console.log(car);
   };
 }*/
// console.log(a);
//car = "kia";

// const foo = startEngine();
// foo();

// function foo() {}

// const foo = function () {};
// const foo = () => {};

// var a = 12;

// const globalLexicalEnvironment = {
// 	environmentRecords: {}
// 	outer:
// }

// globalLE {bar: Function, str: undefined} ->

// bar()
// console.log(str)

//const a = 10 // {bar: Function, str: undefined, a: 10}
// let b = 20 // {bar: Function, str: undefined, a: 10, b: 20}
// const foo = () => {} // {bar: Function, str: undefined,, a: 10, b: 20, foo: Function}
// function bar() {}

// foo()

// var str = 'str' // {bar: Function, str: 'str', a: 10, b: 20, foo: Function}

// ---------------

// globalLE {car: 'bmw', foo: func} -> null

// let car = "bmw";

// const foo = () => {
//   // {} => globalLE
//   console.log(car);
// };

// foo();

// car = "audi"; // globalLE { foo: func} -> null

// foo();

// ---------------------------------------

// globalLE {counterCreator: func, counter: } -> null

// const counterCreator = () => {
//   // counterCreatorLE1 {} -> globalLE
//   // counterCreatorLE2 {} -> globalLE
//   let count = 0;

//   return () => {
//     console.log(++count);
//   };
// };

// const counter1 = counterCreator(); // в counter1 будет ссылка на анонимную функцию
// // из counterCreator () => {console.log(++count)}; которая запомнит объект LE counterCreatorLE1 {}
// const counter2 = counterCreator();  // в counter2 будет ссылка на анонимную функцию
// // из counterCreator () => {console.log(++count)}; которая запомнит объект LE counterCreatorLE2 {}

// counter1();
// counter1();
// counter1();

// counter2();
// counter2();
// counter2();

// ----------------------------------

// const saveUser = (logger) => (user) => {
//   logger(`Saving user with id: ${user.id}`);
// };

// const saveAdmin = (logger) => (user) => {
//   logger(`Saving admin with id: ${user.id}`);
// };
// const saveBook = (logger) => (user) => {
//   logger(`Saving book with id: ${user.id}`);
// };
// const logger = (message) => {
//   console.info(`LOG:${message}`);
// };

// const main = () => {
//   const userSaver = saveUser(logger);
//   const adminSaver = saveAdmin(logger);
//   const bookSaver = saveBook(logger);

//   userSaver({ id: "1" });
//   adminSaver({ id: "2" });
//   bookSaver({ id: "3" });
// };
// main();

// -----------------------------------------

// 2(3) --> 2 * 2(2) --> 2 * 2 * 2(1) --> 2 * 2 * 2

// globalLE {pow: func}

// const pow = (x, n) => {
// 	// {x: 2, n: 3} -> globalLE
//   if (n === 1) {
//     return x;
//   } else {
//     return x * pow(x, n - 1);
//   }
// };

// console.log(pow(2, 3));

// const a = () => {}

// const b = () => {
// 	a()
// }

// const c = () => {
// 	b()
// }

// c()

// --------------------------------

// 5! -> 5 * 4! -> 5 * 4 * 3!

/*
const factorial = (x) => {
    if (x === 1) {
        return x;
    } else {
        return x * factorial(x - 1);
    }
};

console.log(factorial(16));*/
