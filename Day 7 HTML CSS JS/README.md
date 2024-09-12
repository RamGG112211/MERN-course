# Day 5 JS

## 1. Variables and Data Types

Understanding how to declare variables and different data types is fundamental to working with React.

### File: variables.js

```bash
        // ES6 variable declarations
        let name = 'John'; // Block-scoped variable
        const age = 30; // Constant (can't be re-assigned)

        // Primitive data types
        const isStudent = true; // Boolean
        const score = null; // Null
        const grade = undefined; // Undefined
        const id = Symbol('id'); // Symbol

        // Objects
        const user = {
        name: 'John',
        age: 30
        };
        console.log(user.name); // 'John'

```

## 2. let, const, and var

JavaScript has three keywords for declaring variables: let, const, and var. Understanding the differences is crucial for writing clean and bug-free code.

let and const (ES6):
Both let and const are block-scoped (i.e., they are only accessible within the block they are defined in).

let:
Use let when you want to declare a variable whose value can change later.

### File: let.js

```bash
        let counter = 0;
        counter++;
        console.log(counter); // 1

        if (true) {
        let insideBlock = 'I am inside a block';
        console.log(insideBlock); // 'I am inside a block'
        }
        // console.log(insideBlock); // Error: insideBlock is not defined (because it's block-scoped)

```

const:
Use const when you want to declare a constant (a variable that should not be reassigned after being defined).
You cannot reassign a const variable, but if it holds an object or array, you can modify the contents of the object/array.

### File: const.js

```bash
       const PI = 3.14;
        console.log(PI); // 3.14

        // PI = 3.15; // Error: Assignment to constant variable

        const user = { name: 'John', age: 25 };
        user.age = 26; // This is allowed
        console.log(user.age); // 26

```

var (Old way of declaring variables):
var is function-scoped or globally-scoped and allows redeclaration, which can lead to unexpected behavior.
var variables can be hoisted (i.e., they can be used before they are declared, which can cause bugs).
It's generally recommended to avoid using var in modern JavaScript.

### File: var.js

```bash
        var x = 10;
        console.log(x); // 10

        if (true) {
        var y = 20;
        }
        console.log(y); // 20 (y is not block-scoped, so it's accessible outside the block)

        console.log(a); // undefined (due to hoisting)
        var a = 5;
```

## Key Differences:

### Scope:

- var is function-scoped or global-scoped.
- let and const are block-scoped
  .

### Reassignability:

- var and let can be reassigned.
- const cannot be reassigned, though object properties or array elements can be changed.

### Hoisting:

- var is hoisted, so it can be used before it's declared (but it will be undefined).
- let and const are not accessible before their declaration.

### Examples of hoisting

```bash
        console.log(foo); // undefined due to hoisting
        var foo = 'bar';

        console.log(bar); // Error: Cannot access 'bar' before initialization
        let bar = 'foo';

```

## 3. Functions

Functions are essential for React components, event handling, and more.

### File: functions.js

```bash
        // Function Declaration
        function greet(name) {
        return `Hello, ${name}`;
        }

        // Function Expression
        const add = function(a, b) {
        return a + b;
        };

        // Arrow Functions (commonly used in React)
        const multiply = (a, b) => a * b;

        console.log(greet('React')); // Hello, React
        console.log(add(5, 3)); // 8
        console.log(multiply(4, 2)); // 8
```

## 4. Array Methods

React often deals with lists of items, so being familiar with array methods is crucial.

### File: array.js

```bash
        const numbers = [1, 2, 3, 4, 5];

        // .map() - transforms array elements (commonly used in React rendering)
        const doubled = numbers.map(num => num * 2);

        // .filter() - filters elements based on a condition
        const evens = numbers.filter(num => num % 2 === 0);

        // .reduce() - reduces array to a single value
        const sum = numbers.reduce((acc, curr) => acc + curr, 0);

        console.log(doubled); // [2, 4, 6, 8, 10]
        console.log(evens); // [2, 4]
        console.log(sum); // 15

```

## 5. Objects and Destructuring

In React, you often work with objects (props, state), and destructuring makes it easier to access values.

### File: object.js

```bash
        // Object Destructuring
        const person = {
        name: 'Alice',
        age: 25,
        location: 'New York'
        };

        const { name, age } = person;
        console.log(name, age); // Alice 25

        // Array Destructuring (useful in hooks like useState)
        const numbers = [1, 2, 3];
        const [first, second] = numbers;
        console.log(first, second); // 1 2


```

## 6. Spread and Rest Operators

The spread and rest operators (...) are widely used in React, especially for managing props and state.

### File: spread.js

```bash
        // Spread - copying or combining arrays and objects
        const arr1 = [1, 2, 3];
        const arr2 = [4, 5, 6];
        const combinedArr = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

        const obj1 = { name: 'Alice' };
        const obj2 = { age: 25 };
        const combinedObj = { ...obj1, ...obj2 }; // { name: 'Alice', age: 25 }

        // Rest - handling function arguments
        function sum(...numbers) {
        return numbers.reduce((acc, curr) => acc + curr, 0);
        }

        console.log(sum(1, 2, 3)); // 6


```

## 7. Promises and Async/Await

Asynchronous JavaScript is essential for handling API requests in React.

### File: promises.js

```bash
        // Promise Example
        const fetchData = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve('Data received'), 2000);
        });
        };

        fetchData().then(data => console.log(data)); // Data received

        // Async/Await Example
        async function getData() {
        const data = await fetchData();
        console.log(data); // Data received
        }
        getData();


```

## 8. Classes

Although React uses function components more frequently now, understanding classes is still important for older projects (class components).

### File: classes.js

```bash
       // ES6 Class Syntax
        class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        greet() {
            console.log(`Hello, my name is ${this.name}`);
        }
        }

        const john = new Person('John', 30);
        john.greet(); // Hello, my name is John

```

## 9. Modules (Import/Export)

Modules are crucial in React for splitting code across different files.

### File: modules.js

```bash
        // myModule.js
        export const sayHello = (name) => `Hello, ${name}`;

        // main.js
        import { sayHello } from './myModule';
        console.log(sayHello('React')); // Hello, React


```

## 10. template Literals

Template literals make it easier to work with strings and are frequently used in React for JSX rendering.

### File: template-literals.js

```bash
        const name = 'React';
        const welcomeMessage = `Welcome to ${name}!`;
        console.log(welcomeMessage); // Welcome to React!

```

## 11. Higher-Order Functions

Higher-order functions (functions that take other functions as arguments or return functions) are central to how React works.

### File: higher-order-function.js

```bash
       // Higher-order function example
        function withLogging(fn) {
        return function(...args) {
            console.log('Function is being called');
            return fn(...args);
        };
        }

        const sum = (a, b) => a + b;
        const sumWithLogging = withLogging(sum);

        console.log(sumWithLogging(3, 4)); // Logs: "Function is being called" and 7

```

## 12. Event Handling

Understanding how JavaScript handles events is essential for React components.

### File: event.js

```bash
        document.getElementById('btn').addEventListener('click', () => {
        console.log('Button clicked!');
        });

```

## 13. Ternary Operator

Ternary operators are commonly used for conditional rendering in React.

### File: ternary.js

Ternary operators are commonly used for conditional rendering in React.

```bash
        const isLoggedIn = true;
        const message = isLoggedIn ? 'Welcome back!' : 'Please log in';
        console.log(message); // Welcome back!

```

## 14. Closures

Closures allow a function to access variables from its outer scope, useful for handling events and callbacks in React.

### File: closures.js

```bash
        function makeCounter() {
        let count = 0;
        return function() {
            count++;
            console.log(count);
        };
        }

        const counter = makeCounter();
        counter(); // 1
        counter(); // 2


```

## 15. Array of Objects

An array of objects is a collection where each element is an object. It's a common data structure used in React, especially for lists (like rendering items from an API).

### Explanation:

- Each element in the array is an object with key-value pairs.
- You can access, manipulate, and filter objects within the array using array methods like .map(), .filter(), etc.

### File: objects-array.js

```bash
        const users = [
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Charlie', age: 35 },
        ];

        // Accessing an object
        console.log(users[0].name); // 'Alice'

        // Using .map() to get all names
        const names = users.map(user => user.name);
        console.log(names); // ['Alice', 'Bob', 'Charlie']

        // Using .filter() to get users above 30 years
        const olderUsers = users.filter(user => user.age > 30);
        console.log(olderUsers); // [{ id: 3, name: 'Charlie', age: 35 }]

```

## 16. Objects

In JavaScript, an object is a collection of key-value pairs. Objects are fundamental to React because props and state are often objects.

### Explanation:

- Each object consists of properties, where each property has a key (or name) and a value.
- Values can be of any data type (strings, numbers, arrays, functions, even other objects).

### File: objects.js

```bash
        // Creating an object
        const person = {
        name: 'John',
        age: 28,
        isStudent: false,
        greet: function() {
            return `Hello, my name is ${this.name}`;
        }
        };

        // Accessing properties
        console.log(person.name); // 'John'

        // Modifying properties
        person.age = 29;
        console.log(person.age); // 29

        // Adding a new property
        person.city = 'New York';
        console.log(person.city); // 'New York'

        // Using a method inside the object
        console.log(person.greet()); // 'Hello, my name is John'
```
