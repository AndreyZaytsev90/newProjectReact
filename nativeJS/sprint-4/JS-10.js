// this

// 1. Global scope
// 2. Function -> arrow function || simple function
// 3. call, apply, bind
// 4. Function constructors

// ------------------------
// 1. Global scope

// "use strict";

// console.log(this);

// ------------------------
// 2. Function -> arrow function || simple function

// arrow function

// "use strict";

// function foo() {
//   // this
//   const arrowFunc = () => {
//     console.log(this);
//   };

//   arrowFunc();
// }
// foo();

// const arrowFunc = () => {
//   console.log(this);
// };

// arrowFunc();

// simple function

// "use strict";

// function foo() {
//   console.log(this);
// }

// window.foo();

// let car = {
//   brand: "bmw",
//   startEngine() {
//     console.log(`start ${this.brand}`);
//   },
// };

// const car2 = car;
// car = null;

// car2.startEngine();

// function startEngine() {
//   console.log(`start ${this.brand}`);
// }

// const car1 = {
//   brand: "bmw",
// };

// const car2 = {
//   brand: "kia",
// };

// car1.f = startEngine;
// car2.f = startEngine;

// car1.f();
// car2.f();

// var brand = "toyota";

// let car = {
//   brand: "bmw",
//   startEngine() {
//     // this
//     (() => {
//       console.log(`start ${this.brand}`);
//     })();
//   },
// };

// car.startEngine();

// ----------------------

// 3. call, apply, bind

// var speed = 100;

// const car = {
//   brand: "bmw",
//   speed: 200,
//   showMaxSpeed: () => {
//     console.log(this.speed);
//   },
// };

// const scooter = {
//   brand: "honda",
//   speed: 60,
// };

// const ferrari = {
//   brand: "ferrari",
//   speed: 300,
// };

// // car.showMaxSpeed.call(scooter, 10, 20);
// // car.showMaxSpeed.apply(scooter, [10, 20]);

// car.showMaxSpeed.bind(scooter).call(ferrari);

// let car = {
//   brand: "bmw",
//   speed: 200,
//   showMaxSpeed() {
//     console.log(this.speed);
//   },
// };

// setTimeout(car.showMaxSpeed.bind(car), 2000);
// setTimeout(function () {
//   car.showMaxSpeed();
// }, 2000);

// setTimeout(car.showMaxSpeed(), 2000);

// function setTimeout(callback, delay){
// 	// delay
// 	callback() () => car.showMaxSpeed()
// }

// ----------------------
// 4. Function constructors

// const car1 = {
// 	brand: 'bmw'
// }

// const car2 = {
// 	brand: 'kia'
// }

// const car3 = {
// 	brand: 'audi'
// }

// function CarCreator(brand) {
//   this.brand = brand;
// }

// const car1 = new CarCreator("bmw");
// const car2 = new CarCreator("kia");
// const car3 = new CarCreator("audi");

// console.log(car1, car2, car3);

// ------------------------

// var name = "Bob";

// class Person {
//   constructor(name) {
//     this.name = name;
//   }

//   greet() {
//     console.log(`Hello, my name is ${this.name}`);
//   }

//   delayedGreet() {
//     setTimeout(function () {
//       console.log(`Hello, my name is ${this.name}`);
//     }, 1000);
//   }

//   delayedGreetArrow() {
//     setTimeout(() => {
//       console.log(`Hello, my name is ${this.name}`);
//     }, 1000);
//   }
// }

// const person = new Person("John");
// person.greet();
// person.delayedGreet();
// person.delayedGreetArrow();

// --------------------------

// const person = {
//   firsname: "Alice",
//   friends: ["Bob", "Charlie"],
//   printFriends() {
//     this.friends.forEach(function (friend) {
//       console.log(`${this.firsname} knows ${friend}`);
//     });
//   },
//   printFriendsArrow() {
//     // this
//     this.friends.forEach((friend) => {
//       console.log(`${this.firsname} knows ${friend}`);
//     });
//   },
// };

// person.printFriends(); // 'Alice, knows bob', 'Alice, knows Charlie'

// person.printFriendsArrow(); // 'undefined, knows bob', 'undefined, knows Charlie'

// ------------------------------------

// const anotherPerson = {
//   name: "Liam",
// };
// const person = {
//   name: "Emma",
//   greet() {
//     console.log(`Hello, my name is ${this.name}`);
//   },
// };

// // const anotheranotherPerson = {
// //   name: "Bob",
// // };

// const greet = person.greet;
// greet(); // ''
// greet.call(anotherPerson); // Liam
// greet.bind(anotherPerson)(); // Liam
// // greet.call(anotherPerson);

// ------------------------------------

// "use strict";

// const person = {
//   name: "Oliver",
//   outerGreet() {
//     console.log(`Outer hello, my name is ${this.name}`);

//     function innerGreet() {
//       console.log(`Inner hello, my name is ${this.name}`);
//     }

//     innerGreet();
//   },
// };

// person.outerGreet();

const counter = {
    count: 0,
    increment() {
        this.count++;
        console.log(this.count);
    },
    delayedIncrement() {
        setTimeout(function () {
            console.log(this.count);
        }, 1000);
    },
    delayedIncrementWithBind() {
        setTimeout(
            function () {
                console.log(this.count);
            }.bind(this),
            1000
        );
    },
    delayedIncrementWithArrow() {
        setTimeout(() => {
            console.log(this.count);
        }, 1000);
    },
};
counter.increment(); // Что выведет?
counter.delayedIncrement(); // Что выведет?
counter.delayedIncrementWithBind(); // Что выведет?
counter.delayedIncrementWithArrow(); // Что выведет?
