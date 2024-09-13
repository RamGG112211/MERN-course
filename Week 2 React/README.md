# WEEK 2 REACT JS

# A Introduction to React.js

## 1. What is React?

React is designed to create sophisticated user interfaces. It allows using HTML-like syntax within JavaScript code (JSx), enabling developers to create reusable components and write less code for UI implementation.

React is widely used in web development due to the following features:

- Code Reusability. It allows for the building and modification of UI components to create new functionality easily.
- Virtual DOM (Document Object Model). It is a lightweight copy of real DOM that enables faster rendering and loading of web pages.

### Setup react using vite

### Create a React App with Vite

- Open your terminal and run the following command to create a new Vite project:

```bash
    npm create vite@latest
```

- It will ask you for the project name. For example:

```bash
        Project name: my-vite-react-app
```

- Then, select React and the variant (JavaScript or TypeScript):

```bash
        Select a framework: React
        Select a variant: JavaScript
```

This will create a new React project using Vite.

- Navigate to the Project Directory
  Change into the project directory you just created:

```bash
        cd my-vite-react-app
```

- Install Dependencies
  Now, install the project dependencies using npm:

```bash
        npm install
```

- Start the Development Server
  After installation, start the development server with:

```bash
        npm run dev
```

- Explore the Project Structure
  Vite creates a basic React project with the following structure:

```bash
        my-vite-react-app/
        ├── index.html
        ├── package.json
        ├── src/
        │   ├── App.jsx
        │   ├── main.jsx
        │   └── assets/
        └── vite.config.js

```

- index.html: The entry point of the app.
- src/App.jsx: Main React component.
- src/main.jsx: Where React is rendered into the DOM.
- vite.config.js: Vite configuration file.

## 2. Components, Props, and State

### Component

- Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. This page provides an introduction to the idea of components. You can find a detailed component API reference here.

- Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

### Function component

The simplest way to define a component is to write a JavaScript function:

```bash
        function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
}

```

This function is a valid React component because it accepts a single “props” (which stands for properties) object argument with data and returns a React element. We call such components “function components” because they are literally JavaScript functions.

### Class component

```bash
        class Welcome extends React.Component {
            render() {
                return <h1>Hello, {this.props.name}</h1>;
            }
        }
```

Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail. A button, a form, a dialog, a screen: in React apps, all those are commonly expressed as components.

For example, we can create an App component that renders Welcome many times:

```bash
        function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
        }

        function App() {
        return (
            <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
            </div>
        );
        }
```

### States and props are two of the most important concepts of React and everything in React is based upon them.

### State

- The state is the real-time data available to use within only that component.

- A state is a variable that exists inside a component, that cannot be accessed and modified outside the component, and can only be used inside the component. Works very similarly to a variable that is declared inside a function that cannot be accessed outside the scope of the function in normal javascript.

### Props

In React props are a way to pass the data or properties from parent component to child components

React allows us to pass information to a Component using something called props (which stands for properties). Props are objects which can be used inside a component. Sometimes we need to change the content inside a component. Props come to play in these cases, as they are passed into the component and the user..

## 3 JSX and Rendering

### JSX

- JSX stands for JavaScript XML. JSX allows us to write HTML in React. JSX makes it easier to write and add HTML in React.

```bash
        const user = 'Bob Burger';
        const greeting = <h1>Hello, {user}</h1>;

        ReactDOM.render(
        greeting,
        document.getElementById('root')
        );
```

We use curly braces {} to embed the variable into our JSX expression. And within those curly braces we could embed any valid JavaScript expression. Such as user.firstName or printName(user)

### Props in JSX

```bash
        function NumberType(props) {
        let answer;
        if (props.number % 2 == 0) {
            answer = <strong>even</strong>;
        } else {
            answer = <i>odd</i>;
        }
        return <div>{props.number} is an {answer} number</div>;
        }
```

### Rendering

And to render a React element into our root node, we pass both to ReactDOM.render(), like so:

```bash
    const element = <h1>Hello!</h1>;
    ReactDOM.render(element, document.getElementById('root'));
```

# React.js Fundamentals

## 1. Handling Events in React

Handling events in React is very similar to handling DOM events in plain HTML, but there are a few differences:

React events are named using camelCase, rather than lowercase.
You pass a function (event handler) as the event handler, not a string.
Example of Handling Events:

```bash
        import React, { useState } from 'react';

        function App() {
        const [message, setMessage] = useState('Hello! Click the button.');

        // Event handler function
        const handleClick = () => {
            setMessage('Button clicked! Message updated.');
        };

        return (
            <div>
            <h1>{message}</h1>
            {/* Handling an event using onClick */}
            <button onClick={handleClick}>Click Me</button>
            </div>
        );
        }

        export default App;

```

## 2. Conditional Rendering in React

Conditional rendering in React allows you to render different components or elements based on certain conditions, like if-else or ternary operators.

```bash
        import React, { useState } from 'react';

        function App() {
        const [isLoggedIn, setIsLoggedIn] = useState(false);

        const handleLogin = () => {
            setIsLoggedIn(true);
        };

        const handleLogout = () => {
            setIsLoggedIn(false);
        };

        return (
            <div>
            {isLoggedIn ? (
                <div>
                <h1>Welcome back, User!</h1>
                <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                <h1>Please log in!</h1>
                <button onClick={handleLogin}>Login</button>
                </div>
            )}
            </div>
        );
        }

        export default App;

```

```bash
        function App() {
        const [hasAccess, setHasAccess] = useState(false);

        return (
            <div>
            {hasAccess ? <h1>Access Granted!</h1> : <h1>Access Denied!</h1>}
            </div>
        );
        }
```

#### If you want to render a component based on a condition without an else part, you can use the && operator:

```bash
        function App() {
        const [isAdmin, setIsAdmin] = useState(true);

        return (
            <div>
            {isAdmin && <h1>Admin Panel</h1>}
            </div>
        );
        }

```

## 3 Lists and Keys in React

Rendering lists in React is easy by mapping over an array of items and rendering components for each item. However, each list item must have a unique key for React to track and update efficiently.

```bash
        function App() {
        const names = ['Alice', 'Bob', 'Charlie'];

        return (
            <div>
            <h1>List of Names:</h1>
            <ul>
                {names.map((name, index) => (
                <li key={index}>{name}</li>
                ))}
            </ul>
            </div>
        );
        }

```

- Note:-
- Key Prop: React requires a key prop to be added to each list element. This key should be unique for each element to avoid unnecessary re-renders.
- The key helps React to identify which items have changed, added, or removed.

#### Rendering a list of object

If you're rendering an array of objects, make sure the key is unique, typically by using a unique property like id

```bash
        function App() {
        const users = [
            { id: 1, name: 'Alice', age: 24 },
            { id: 2, name: 'Bob', age: 27 },
            { id: 3, name: 'Charlie', age: 22 }
        ];

        return (
            <div>
            <h1>Users:</h1>
            <ul>
                {users.map((user) => (
                <li key={user.id}>
                    {user.name} - {user.age} years old
                </li>
                ))}
            </ul>
            </div>
        );
        }

```

# React Router

React Router is a library that helps in adding client-side routing to React applications. It enables navigation between different components or views, mimicking the behavior of a multi-page application while staying within a single-page app (SPA).

React Router primarily provides:

- Routing: Defining different routes for your application.
- Linking: Navigating between different components without page reloads.
- Nested Routes: Creating sub-routes or child routes.

## 1. Client-side Routing

Client-side routing means that the routing (deciding which page/component to render based on the URL) is handled within the browser using JavaScript. React Router allows you to set up routes for different components based on the URL path.

- First, install the React Router library:

```bash
        npm install react-router-dom
```

- Then, set up the router in your App.js:

```bash
        import React from 'react';
        import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

        // Components for different routes
        function Home() {
        return <h2>Home Page</h2>;
        }

        function About() {
        return <h2>About Page</h2>;
        }

        function Contact() {
        return <h2>Contact Page</h2>;
        }

        function App() {
        return (
            <Router>
            <nav>
                <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>

            {/* Define routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
            </Router>
        );
        }

        export default App;
```

#### Setting up React Router

```bash
        import React, { useState } from 'react';

        function App() {
        const [message, setMessage] = useState('Hello! Click the button.');

        // Event handler function
        const handleClick = () => {
            setMessage('Button clicked! Message updated.');
        };

        return (
            <div>
            <h1>{message}</h1>
            {/* Handling an event using onClick */}
            <button onClick={handleClick}>Click Me</button>
            </div>
        );
        }

        export default App;

```

## 2. Nested Routes

React Router also supports nested routes, which means you can have routes inside other routes. This is useful for creating layouts like dashboards, where the layout is shared, but the content changes based on the route.

Example of Nested Routes:

```bash
        import React from 'react';
        import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';

        // Parent component with nested routes
        function Dashboard() {
        return (
            <div>
            <h2>Dashboard</h2>
            <nav>
                <ul>
                <li><Link to="overview">Overview</Link></li>
                <li><Link to="settings">Settings</Link></li>
                </ul>
            </nav>
            {/* Outlet renders the child routes */}
            <Outlet />
            </div>
        );
        }

        // Child components
        function Overview() {
        return <h3>Overview Section</h3>;
        }

        function Settings() {
        return <h3>Settings Section</h3>;
        }

        function App() {
        return (
            <Router>
            <nav>
                <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<h2>Home Page</h2>} />
                {/* Parent Route */}
                <Route path="dashboard" element={<Dashboard />}>
                {/* Nested Routes */}
                <Route path="overview" element={<Overview />} />
                <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
            </Router>
        );
        }

        export default App;

```
