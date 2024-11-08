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

# Hooks

Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks don’t work inside classes — they let you use React without classes.

React provides a few built-in Hooks like useState. You can also create your own Hooks to reuse stateful behavior between different components. We’ll look at the built-in Hooks first.

## 1. useState, useEffect

- The useState hook is used to declare and manage state in functional components. In a doctor appointment website, we might want to store the details of a doctor, such as their availability status.

Example: Managing doctor availability

```bash
        import React, { useState } from 'react';

        const DoctorAvailability = () => {
        const [isAvailable, setIsAvailable] = useState(true);

        const toggleAvailability = () => {
            setIsAvailable(prevState => !prevState);
        };

        return (
            <div>
            <h3>Doctor's Availability</h3>
            <p>The doctor is currently: {isAvailable ? "Available" : "Unavailable"}</p>
            <button onClick={toggleAvailability}>
                {isAvailable ? "Mark Unavailable" : "Mark Available"}
            </button>
            </div>
        );
        };

        export default DoctorAvailability;

```

- The useEffect hook allows you to perform side effects like fetching data, subscribing to events, or updating the DOM. In our doctor portal, we can use it to fetch appointment details when a component loads.

Example: Fetching doctor appointments

```bash
       import React, { useState, useEffect } from 'react';

        const Appointments = () => {
        const [appointments, setAppointments] = useState([]);

        useEffect(() => {
            // Simulate fetching appointment data from an API
            fetch("/api/appointments")
            .then(res => res.json())
            .then(data => setAppointments(data));
        }, []); // Empty dependency array to run on mount only

        return (
            <div>
            <h3>Doctor's Appointments</h3>
            <ul>
                {appointments.map(appointment => (
                <li key={appointment.id}>
                    {appointment.patientName} - {appointment.date}
                </li>
                ))}
            </ul>
            </div>
        );
        };

        export default Appointments;

```

## 2. customHook

Custom hooks allow you to extract and reuse logic across components. For example, we might want a custom hook to handle the fetching of doctor details.

Example: Custom hook to fetch doctor details

```bash
        import { useState, useEffect } from 'react';

        const useDoctorDetails = (doctorId) => {
        const [doctor, setDoctor] = useState(null);

        useEffect(() => {
            fetch(`/api/doctors/${doctorId}`)
            .then(res => res.json())
            .then(data => setDoctor(data));
        }, [doctorId]);

        return doctor;
        };

        export default useDoctorDetails;


```

#### Using the custom hook in a component:

```bash
        import React from 'react';
        import useDoctorDetails from './useDoctorDetails';

        const DoctorProfile = ({ doctorId }) => {
        const doctor = useDoctorDetails(doctorId);

        if (!doctor) return <p>Loading...</p>;

        return (
            <div>
            <h2>{doctor.name}</h2>
            <p>Specialty: {doctor.specialty}</p>
            <p>Experience: {doctor.experience} years</p>
            </div>
        );
        };

        export default DoctorProfile;
```

# State Management

## 1. Context API

The Context API is used for global state management in React. It helps avoid "prop drilling" by making data accessible to all components without passing it down explicitly through props.

Example: Context for user authentication

```bash
        import React, { createContext, useContext, useState } from 'react';

        // Create a context
        const AuthContext = createContext();

        // AuthProvider component that wraps around your app
        export const AuthProvider = ({ children }) => {
        const [user, setUser] = useState(null);

        const login = (userData) => setUser(userData);
        const logout = () => setUser(null);

        return (
            <AuthContext.Provider value={{ user, login, logout }}>
            {children}
            </AuthContext.Provider>
        );
        };

        // Custom hook to use AuthContext
        export const useAuth = () => {
        return useContext(AuthContext);
        };

        // Example component using the context
        const UserProfile = () => {
        const { user, logout } = useAuth();

        if (!user) return <p>Please log in.</p>;

        return (
            <div>
            <h3>Welcome, {user.name}</h3>
            <button onClick={logout}>Logout</button>
            </div>
        );
        };

        export default UserProfile;
```

## 2. Redux Basics

Redux is a state management library that helps manage application state using actions, reducers, and a central store. In our doctor portal, we could use Redux to manage appointments globally.

Example: Redux to manage appointments

- Action Types

```bash
    // actions/types.js
    export const ADD_APPOINTMENT = 'ADD_APPOINTMENT';
    export const REMOVE_APPOINTMENT = 'REMOVE_APPOINTMENT';
```

- Actions

```bash
    // actions/appointmentActions.js
    import { ADD_APPOINTMENT, REMOVE_APPOINTMENT } from './types';

    export const addAppointment = (appointment) => ({
    type: ADD_APPOINTMENT,
    payload: appointment,
    });

    export const removeAppointment = (id) => ({
    type: REMOVE_APPOINTMENT,
    payload: id,
    });

```

- Reducer

```bash
    // reducers/appointmentReducer.js
    import { ADD_APPOINTMENT, REMOVE_APPOINTMENT } from '../actions/types';

    const initialState = {
    appointments: []
    };

    export const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_APPOINTMENT:
        return {
            ...state,
            appointments: [...state.appointments, action.payload],
        };
        case REMOVE_APPOINTMENT:
        return {
            ...state,
            appointments: state.appointments.filter(apt => apt.id !== action.payload),
        };
        default:
        return state;
    }
    };

```

- Store

```bash
    // store.js
    import { createStore, combineReducers } from 'redux';
    import { appointmentReducer } from './reducers/appointmentReducer';

    const rootReducer = combineReducers({
    appointments: appointmentReducer,
    });

    const store = createStore(rootReducer);

    export default store;

```

- using redux in component

```bash
    import React from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import { addAppointment, removeAppointment } from './actions/appointmentActions';

    const AppointmentManager = () => {
    const appointments = useSelector(state => state.appointments.appointments);
    const dispatch = useDispatch();

    const handleAddAppointment = () => {
        const newAppointment = {
        id: Date.now(),
        patientName: "John Doe",
        date: "2024-09-18",
        };
        dispatch(addAppointment(newAppointment));
    };

    return (
        <div>
        <h3>Doctor's Appointments</h3>
        <button onClick={handleAddAppointment}>Add Appointment</button>
        <ul>
            {appointments.map((appointment) => (
            <li key={appointment.id}>
                {appointment.patientName} - {appointment.date}
                <button onClick={() => dispatch(removeAppointment(appointment.id))}>
                Cancel
                </button>
            </li>
            ))}
        </ul>
        </div>
    );
    };

    export default AppointmentManager;

```

## Navbar

```bash

import { useCallback, useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import {
  IoLocationOutline,
  IoCallOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaHamburger } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Button from "./Button";
import Wrapper from "./Wrapper";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => {
        const windowWidth = window.innerWidth;
        setWidth(windowWidth);
      });
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", () => {
          const windowWidth = window.innerWidth;
          setWidth(windowWidth);
        });
      }
    };
  }, []);

  const handleMobileMenu = useCallback(() => {
    if (width > 768) setIsMenuOpen(false);
  }, [width]);

  useEffect(() => {
    handleMobileMenu();
  }, [handleMobileMenu]);

  const menuItems = [
    {
      path: "/",
      itemName: "Home",
      clickFn: () => {
        closeMobileMenu();
      },
    },
    {
      path: "/doctors",
      itemName: "Doctors",
      clickFn: () => {
        closeMobileMenu();
      },
    },
    {
      path: "/hospitals",
      itemName: "Hospitals",
      clickFn: () => {
        closeMobileMenu();
      },
    },
    {
      path: "/contact",
      itemName: "Contact",
      clickFn: () => {
        closeMobileMenu();
      },
    },
  ];

  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <Wrapper className="flex flex-col sm:flex-row gap-1 justify-between py-2 bg-primary text-white text-sm_paragraph">
        <span className=" flex items-center gap-1">
          <IoLocationOutline />
          <span>Pokhara-13, Nepal</span>
        </span>

        <div className="flex items-center gap-5 md:gap-7">
          <span className="flex items-center gap-1">
            <IoCallOutline />
            <span>+977 9879797097</span>
          </span>

          <span className="flex items-center gap-1">
            <AiOutlineMail />
            <span>doctorhub3438@gmail.com</span>
          </span>
        </div>
      </Wrapper>

      <Wrapper className=" sticky z-50 top-0 bg-white py-3 flex justify-between items-center gap-2 shadow-md">
        {/* <nav className=""> */}
        <Link to={"/"} className="flex items-center xl:w-[30%]  gap-2">
          <div className=" p-3 bg-primary w-max rounded-full">
            <img
              src="/images/logo.png"
              alt="Logo"
              width={1024}
              height={1024}
              className=" object-center object-cover w-[35px] h-[35px]"
            />
          </div>

          <span className="font-semibold lg:text-xl">Doctor Hub</span>
        </Link>

        <div
          className={`absolute lg:static w-full lg:w-max xl:w-[70%] top-full left-0 px-6 sm:px-8 md:px-12 lg:pb-0 lg:px-0 bg-white grid shadow-md lg:shadow-none ${
            isMenuOpen ? "grid-rows-[1fr] pb-3 md:pb-5" : "grid-rows-[0fr] pb-0"
          } transition-all duration-300 lg:block`}
        >
          <div className=" overflow-hidden lg:flex gap-2 xl:justify-between">
            <ul className=" lg:flex divide-y-[4px] divide-transparent gap-1 items-center">
              {menuItems.map((item, i) => {
                const { path, itemName, clickFn } = item;

                return (
                  <li key={i}>
                    <Link
                      to={path}
                      onClick={clickFn}
                      className={`${
                        pathname == path ? " bg-secondary/20 text-primary" : ""
                      } p-2 px-5 rounded-full block hover:bg-secondary/20 hover:text-primary transition-all duration-200`}
                    >
                      {itemName}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div
              className={`lg:absolute xl:static lg:w-max lg:top-full lg:right-16 lg:px-6 xl:px-0 xl:pb-0 bg-white grid shadow-md xl:shadow-none ${
                isMenuOpen
                  ? "grid-rows-[1fr] pb-3 md:pb-5"
                  : "grid-rows-[0fr] pb-0"
              } transition-all duration-300 xl:block`}
            >
              <div className=" lg:overflow-hidden">
                <div className="py-2 px-2 flex flex-col xl:flex-row gap-2 items-start lg:items-end">
                  <Link to={"/auth"} onClick={closeMobileMenu}>
                    <Button className="flex items-center gap-2 whitespace-nowrap">
                      <FaRegCircleUser className="text-lg" />
                      <span>Login/Register</span>
                    </Button>
                  </Link>

                  <Link to={"/doctor-signup"} onClick={closeMobileMenu}>
                    <Button
                      variant="outlined"
                      className="flex items-center gap-2 bg-primary whitespace-nowrap"
                    >
                      <IoHomeOutline className="text-lg" />
                      <span>Register as a Doctor</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          className="p-2 hover:scale-105 transition duration-200 xl:hidden text-lg md:text-xl"
          onClickFn={handleMenuToggler}
        >
          {!isMenuOpen ? <FaHamburger /> : <ImCross />}
        </Button>
        {/* </nav> */}
      </Wrapper>
    </>
  );
}

```

## tailwind.config.js

```bash
    /** @type {import('tailwindcss').Config} */
    export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
        colors: {
            primary: "#228B22",
        },
        },
    },
    plugins: [],
    };

```

## Wrapper.jsx

```bash
    /* eslint-disable react/prop-types */

    export default function Wrapper({ children, className }) {
    return (
        <div className={`${className} px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 `}>
        {children}
        </div>
    );
    }

```

## Button.jsx

```bash
    /* eslint-disable react/prop-types */
    "use client";

    export default function Button({
    className,
    children,
    onClickFn,
    type,
    variant = "default",
    disabled,
    }) {
    return (
        <button
        disabled={disabled}
        type={type}
        className={` ${
            variant == "default"
            ? " !bg-primary bg-opacity-90 hover:bg-opacity-100 !text-white border !border-primary hover:!border-primary "
            : variant == "secondary"
            ? " !bg-gray-100 hover:!bg-gray-200"
            : "  !bg-white dark:!bg-inherit hover:!text-white dark:!text-inherit hover:!bg-primary border !border-primary !text-primary "
        } rounded-md py-2 px-4 transition duration-200 capitalize ${className}`}
        onClick={onClickFn}
        >
        {children}
        </button>
    );
    }

```

# Redux Toolkit

### 1. Install Redux Toolkit and React-Redux

```bash
  npm install @reduxjs/toolkit react-redux
```

### 2. Configure the Redux Store by creating store folder within src directory

```bash
  import { configureStore } from '@reduxjs/toolkit';
  import counterReducer from './counterSlice';

  export const store = configureStore({
    reducer: {
      counter: counterReducer,
    },
  });

  export default store;

```

### 3. Create Doctors Slice (store/doctorsSlice.js)

```bash
  import { createSlice } from "@reduxjs/toolkit";

  // Define the initial state using that type
  const initialState = {
    hospitalChosen: "",
    specialityChosen: "",
    cityChosenDoctor: "",
    doctors: [],
    filteredDoctors: [],
    sort: "Name",
    order: "A-Z",
    currentlyViewedPageNum: 1,
    numOfDoctorsPerPage: 6,
    totalDoctors: undefined,
    totalPage: undefined,
  };

  export const doctorsSlice = createSlice({
    name: "doctors",
    initialState,
    reducers: {
      updateHospitalChosen: (state, action) => {
        state.hospitalChosen = action.payload;
      },
      updateSpecialityChosen: (state, action) => {
        state.specialityChosen = action.payload;
      },
      updateCityChosenDoctor: (state, action) => {
        state.cityChosenDoctor = action.payload;
      },
      updateFilteredDoctors: (state, action) => {
        state.filteredDoctors = action.payload;
      },
      updateDoctorsSort: (state, action) => {
        state.sort = action.payload;
      },
      updateDoctorsOrder: (state, action) => {
        state.order = action.payload;
      },

      updateDoctorsCurrentlyViewedPageNum: (state, action) => {
        state.currentlyViewedPageNum = action.payload;
      },

      updateTotalDoctors: (state, action) => {
        state.totalDoctors = action.payload;
      },

      updateNumOfDoctorsPerPage: (state, action) => {
        state.numOfDoctorsPerPage = action.payload;
      },
      updateDoctors: (state, action) => {
        state.doctors = action.payload;
      },
      updateDoctorsTotalPage: (state, action) => {
        state.totalPage = action.payload;
      },
    },
  });

  export const {
    updateCityChosenDoctor,
    updateDoctors,
    updateDoctorsCurrentlyViewedPageNum,
    updateDoctorsOrder,
    updateDoctorsSort,
    updateFilteredDoctors,
    updateHospitalChosen,
    updateNumOfDoctorsPerPage,
    updateSpecialityChosen,
    updateTotalDoctors,
    updateDoctorsTotalPage,
  } = doctorsSlice.actions;

  export default doctorsSlice.reducer;

```

### 4. Create Hospitals Slice (store/hospitalsSlice.js)

```bash
    import { createSlice } from "@reduxjs/toolkit";

  // Define the initial state using that type
  const initialState = {
    hospitals: [],
    hospitalOptions: [],
    totalPage: undefined,
    currentlyViewedPageNum: 1,
    numOfHospitalsPerPage: 6,
    cityChosenHospital: "",
    filteredHospitals: undefined,
    sort: "Name",
    order: "A-Z",
    totalHospitals: undefined,
  };

  export const hospitalsSlice = createSlice({
    name: "hospitals",
    initialState,
    reducers: {
      updateHospitals: (state, action) => {
        state.hospitals = action.payload;
      },
      updateHospitalOptions: (state, action) => {
        state.hospitalOptions = action.payload;
      },
      updateCityChosenHospital: (state, action) => {
        state.cityChosen = action.payload;
      },
      updateFilteredHospitals: (state, action) => {
        state.filteredHospitals = action.payload;
      },
      updateHospitalsSort: (state, action) => {
        state.sort = action.payload;
      },
      updateHospitalsOrder: (state, action) => {
        state.order = action.payload;
      },
      updateHospitalsCurrentlyViewedPageNum: (state, action) => {
        state.currentlyViewedPageNum = action.payload;
      },

      updateTotalHospitals: (state, action) => {
        state.totalHospitals = action.payload;
      },

      updateNumOfHospitalsPerPage: (state, action) => {
        state.numOfHospitalsPerPage = action.payload;
      },

      updateHospitalsTotalPage: (state, action) => {
        state.totalPage = action.payload;
      },
    },
  });

  export const {
    updateHospitals,
    updateHospitalOptions,
    updateCityChosenHospital,
    updateFilteredHospitals,
    updateHospitalsCurrentlyViewedPageNum,
    updateHospitalsOrder,
    updateHospitalsSort,
    updateTotalHospitals,
    updateHospitalsTotalPage,
    updateNumOfHospitalsPerPage,
  } = hospitalsSlice.actions;

  export default hospitalsSlice.reducer;

```

### 5. Create ProvidersSearch Slice (store/providersSearchSlice.js)

```bash
  import { createSlice } from "@reduxjs/toolkit";

  // Define the initial state using that type
  const initialState = {
    provider: undefined,
    specialitySearched: undefined,
    citySearched: undefined,
  };

  export const providersSearchSlice = createSlice({
    name: "providersSearch",
    initialState,
    reducers: {
      updateProvider: (state, action) => {
        state.provider = action.payload;
      },
      updateSpecialitySearched: (state, action) => {
        state.specialitySearched = action.payload;
      },
      updateCitySearched: (state, action) => {
        state.citySearched = action.payload;
      },
    },
  });

  export const { updateCitySearched, updateProvider, updateSpecialitySearched } =
    providersSearchSlice.actions;

  export default providersSearchSlice.reducer;

```

### 6. updated store.js

```bash
  import { configureStore } from "@reduxjs/toolkit";
  import doctorsReducer from "./doctorsSlice";
  import hospitalsReducer from "./hospitalsSlice";
  import providersSearchReducer from "./providersSearchSlice";

  export const store = configureStore({
    reducer: {
      doctors: doctorsReducer,
      hospitals: hospitalsReducer,
      providersSearch: providersSearchReducer,
    },
  });

  export default store;


```

### 7. home/SearchProviders.jsx

```bash

  import { useCallback, useState } from "react";
  import { useNavigate } from "react-router-dom"; // Change here for React Router
  import { filterCityOptions, filterSpecialityOptions } from "../../utils/data";
  import { LiaHospitalSymbolSolid } from "react-icons/lia";
  import { FaUserDoctor } from "react-icons/fa6";
  import { IoMdSearch } from "react-icons/io";
  import { FaCity } from "react-icons/fa";
  import Button from "../global/Button";
  import { useDispatch, useSelector } from "react-redux";
  import ProviderSearchInput from "./ProviderSearchInput";
  import FilterSelect from "../filter/FilterSelect";
  import { updateCityChosenHospital } from "../../store/hospitalsSlice";
  import {
    updateCityChosenDoctor,
    updateSpecialityChosen,
  } from "../../store/doctorsSlice";
  import {
    updateCitySearched,
    updateSpecialitySearched,
  } from "../../store/providersSearchSlice";

  export default function SearchProviders() {
    const navigate = useNavigate(); // Change from useRouter to useNavigate
    const dispatch = useDispatch();

    const { citySearched, specialitySearched } = useSelector(
      (store) => store.providersSearch
    );

    const [inputProvider, setInputProvider] = useState("");

    const updateInputProvider = (val) => {
      setInputProvider(val);
    };

    const filterCity = useCallback(
      (val) => {
        if (
          inputProvider.toLowerCase() === "hospital" ||
          inputProvider.toLowerCase() === "hospitals"
        ) {
          dispatch(updateCityChosenHospital(val));
        } else {
          dispatch(updateCityChosenDoctor(val));
        }
        dispatch(updateCitySearched(val));
      },
      [dispatch, inputProvider]
    );

    const filterSpeciality = useCallback(
      (val) => {
        dispatch(updateSpecialityChosen(val));
        dispatch(updateSpecialitySearched(val));
      },
      [dispatch]
    );

    const search_inputs = [
      {
        id: 1,
        icon: <LiaHospitalSymbolSolid />,
        placeholder: "Ex. Doctor, Hospital",
        onChangeFunc: updateInputProvider,
        filterType: "input_search",
      },
      {
        id: 4,
        icon: <FaCity />,
        categoryTitle: "City",
        categoryValue: citySearched,
        categoryValues: filterCityOptions,
        filterFn: filterCity,
        filterType: "select one",
      },
      {
        id: 5,
        icon: <FaUserDoctor />,
        categoryTitle: "Speciality",
        categoryValue: specialitySearched,
        categoryValues: filterSpecialityOptions,
        filterFn: filterSpeciality,
        filterType: "select one",
      },
    ];

    const handleSearch = () => {
      if (inputProvider && inputProvider.length >= 5) {
        if (
          inputProvider.toLowerCase() === "hospital" ||
          inputProvider.toLowerCase() === "hospitals"
        ) {
          navigate("/hospitals"); // Change from router.push to navigate
          if (citySearched === "") {
            dispatch(updateCityChosenHospital(""));
          }
        } else if (
          inputProvider.toLowerCase() === "doctor" ||
          inputProvider.toLowerCase() === "doctors"
        ) {
          navigate("/doctors"); // Change from router.push to navigate
          if (citySearched === "") {
            dispatch(updateCityChosenDoctor(""));
          }
        }
      } else if (
        !inputProvider ||
        inputProvider === "" ||
        inputProvider.length < 5
      ) {
        if (
          (specialitySearched && specialitySearched !== "") ||
          (citySearched && citySearched !== "")
        ) {
          navigate("/find-doctors"); // Change from router.push to navigate
          if (citySearched === "") {
            dispatch(updateCityChosenDoctor(""));
          }
          if (specialitySearched === "") {
            dispatch(updateSpecialityChosen(""));
          }
        }
      }

      setInputProvider("");
    };

    return (
      <div className="bg-white shadow-lg rounded-md p-4 md:p-5 flex flex-col gap-5 md:gap-6 xl:gap-8 translate-y-1/2">
        {/*search by input*/}
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="flex flex-col gap-2 lg:flex-row md:items-center flex-1">
            {search_inputs.map((input) => {
              const {
                icon,
                id,
                placeholder,
                onChangeFunc,
                filterType,
                categoryValues,
                categoryValue,
                filterFn,
              } = input;

              if (filterType === "input_search")
                return (
                  <ProviderSearchInput
                    key={id}
                    icon={icon}
                    placeholder={placeholder}
                    onChangeFunc={onChangeFunc}
                    className="flex-1"
                  />
                );
              else if (filterType === "select one")
                return (
                  <FilterSelect
                    key={id}
                    options={categoryValues}
                    categoryValue={categoryValue}
                    updateCategoryValue={filterFn}
                    icon={icon}
                    className="flex-1"
                  />
                );
            })}
          </div>

          <Button className="flex items-center gap-2 sm:max-w-36" onClickFn={handleSearch}>
            <IoMdSearch className="text-xl" />
            <span>Search</span>
          </Button>
        </div>
      </div>
    );
  }

```

### 8. home/ProviderSearchInput.jsx

```bash
  /* eslint-disable react/prop-types */

  const ProviderSearchInput = ({
    icon,
    placeholder,
    onChangeFunc,
    className,
  }) => {
    return (
      <div
        className={` flex items-center gap-2 px-5 py-2 rounded-md shadow-md h-fit text-black w-full shrink-0 ${className}`}
      >
        <span className="text-sm text-black/70">{icon}</span>
        <input
          className=" text-sm w-full placeholder:text-black/70 outline-none bg-transparent"
          type="text"
          placeholder={placeholder}
          onChange={(e) => {
            onChangeFunc(e.target.value);
          }}
        />
      </div>
    );
  };

  export default ProviderSearchInput;

```

### 9. home/Hero.jsx

```bash
  import Wrapper from "../global/Wrapper";
  import Img from "../global/Img";
  import Button from "../global/Button";
  import SearchProviders from "./SearchProviders";
  import { Link } from "react-router-dom";

  export default function Hero() {
    return (
      <Wrapper className="relative pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16 ">
        <div className="flex gap-3 items-center justify-between">
          <div className="relative z-10 flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8">
            <div className=" flex flex-col gap-1 lg:gap-2">
              <h1 className=" font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight">
                <span className=" text-primary">Doctor</span>{" "}
                <span className="  text-white">Consultation</span>
              </h1>
              <p className=" text-sm md:text-base xl:text-lg max-w-[715px] text-white">
                Connect instantly with a specialist available 24/7 or opt for an
                in-person visit with a specific doctor.
              </p>
            </div>

            <Link to={"/doctors"} className=" w-fit">
              <Button>Consult Now</Button>
            </Link>
          </div>
        </div>

        <img
          className="absolute top-0 left-0 w-full h-full object-cover object-center"
          src="/images/hero.jpg"
          alt="hero-img"
        />

        {/* <!-- Overlay with primary color shade --> */}
        <div className="absolute top-0 left-0 bottom-0 right-0 inset-0 bg-primary/20"></div>

        {/*search doctors*/}
        <SearchProviders />
      </Wrapper>
    );
  }

```

### 10. global/Img.jsx

```bash
  /* eslint-disable react/prop-types */

  export default function Img({ img_url, alt, width, height, className }) {
    return (
      <img
        src={img_url}
        alt={alt}
        width={width}
        height={height}
        className={` object-center object-cover ${className}`}
      />
    );
  }

```

### 11. global/Loading.jsx

```bash
  const Loading = () => {
    return (
      <div className='dots-container'>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
      </div>
    );
  };

  export default Loading;

```

### 12. global/Pagination.jsx

```bash
  /* eslint-disable react/prop-types */
  import React from "react";

  const Pagination = ({
    totalItems,
    page,
    numOfItemsPerPage,
    onPageChange,
    className,
    totalPage,
  }) => {
    const pageNumbers = [];
    if (totalPage <= 8) {
      for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (page <= 4) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPage - 1);
        pageNumbers.push(totalPage);
      } else if (page >= totalPage - 3) {
        pageNumbers.push(1);
        pageNumbers.push(2);
        pageNumbers.push("...");
        for (let i = totalPage - 4; i <= totalPage; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push(2);
        pageNumbers.push("...");
        for (let i = page - 1; i <= page + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPage - 1);
        pageNumbers.push(totalPage);
      }
    }

    const handlePageClick = (pageNumber) => {
      if (typeof pageNumber === "number") {
        onPageChange(pageNumber);
      }
    };

    if (totalPage > 1)
      return (
        <div
          className={`flex justify-center items-center gap-1 sm:gap-2 text-sm sm:text-base ${className}`}
        >
          <button
            className={`${
              page === 1 ? "pointer-events-none bg-primary/65" : "bg-primary"
            }  text-white px-3 sm:px-4 py-1 sm:py-2 rounded-md`}
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>

          <div className=" flex gap-[2px] sm:gap-1 items-center">
            {pageNumbers.map((pageNum, index) => (
              <React.Fragment key={index}>
                {pageNum === "..." ? (
                  <span className="grid items-center justify-center md:w-[40px] md:h-[40px] w-[30px] h-[30px] sm:w-[35px] sm:h-[35px]">
                    {pageNum}
                  </span>
                ) : (
                  <button
                    className={`${
                      pageNum === page
                        ? "bg-primary text-white"
                        : "text-primary hover:bg-primary/25"
                    } grid items-center justify-center md:w-[40px] md:h-[40px] w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] rounded-md`}
                    onClick={() => handlePageClick(pageNum)}
                  >
                    {pageNum}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          <button
            className={`${
              page === totalPage
                ? "pointer-events-none bg-primary/65"
                : "bg-primary"
            } bg-primary text-white px-3 sm:px-4 py-1 sm:py-2 rounded-md`}
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPage}
          >
            Next
          </button>
        </div>
      );
  };

  export default Pagination;

```

### 13. Install react-slick

```bash
  npm install react-slick slick-carousel
```

### 14. home/DoctorsCarousel.jsx

```bash
  /* eslint-disable react/prop-types */
  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import { IoIosArrowForward } from "react-icons/io";
  import Slider from "react-slick";
  import "slick-carousel/slick/slick.css";
  import "slick-carousel/slick/slick-theme.css";
  import Loading from "../global/Loading";
  import DoctorCard from "../doctors/DoctorCard";
  import { doctors_data } from "../../utils/data";
  import Wrapper from "../global/Wrapper";

  // Custom Arrow Components
  const NextArrow = ({ onClick }) => (
    <div
      className="slick-arrow slick-next !text-primary !bg-primary rounded-full "
      onClick={onClick}
    >
      <i className="fas fa-chevron-right"></i>
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="slick-arrow slick-prev !text-primary !bg-primary rounded-full "
      onClick={onClick}
    >
      <i className="fas fa-chevron-left"></i>
    </div>
  );

  const DoctorsCarousel = () => {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true, // Enable autoplay
      autoplaySpeed: 3000, // Set autoplay speed (ms)
      arrows: true,
      nextArrow: <NextArrow />, // Custom next arrow
      prevArrow: <PrevArrow />, // Custom previous arrow
      responsive: [
        {
          breakpoint: 768, // Adjust breakpoint for responsive behavior
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 992, // Adjust breakpoint for responsive behavior
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1200, // Adjust breakpoint for responsive behavior
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1800, // Adjust breakpoint for responsive behavior
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
      ],
    };

    const [doctors, setDoctors] = useState(doctors_data);

    const fetchDoctors = async () => {
      try {
        //   const res = await apiRequest({
        //     url: "/doctors",
        //     method: "GET",
        //   });
        // console.log(res);
        //   setDoctors(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(() => {
      fetchDoctors();
    }, []);

    return (
      <Wrapper className=" py-8 pb-20 mt-20">
        <div className=" mx-auto flex flex-col gap-5 2xl:gap-10 py-6 bg-Background">
          <div className="flex sm:flex-row flex-col items-center justify-between ">
            <p className="font-bold sm:text-2xl text-xl  text-primary">
              {" "}
              Doctors Nearby
            </p>
            <Link to={"/doctors"}>
              <button className="hover:underline text-primary flex flex-row items-center ">
                Browse All doctors <IoIosArrowForward className=" text-lg" />{" "}
              </button>
            </Link>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col gap-4 sm:gap-8 justify-center"></div>

        {doctors.length <= 0 ? (
          <div className="py-10">
            <Loading />
          </div>
        ) : (
          <Slider {...settings} className="">
            {doctors.slice(0, 6).map((doctor) => {
              const { id } = doctor;
              return <DoctorCard key={id} doctor={doctor} />;
            })}
          </Slider>
        )}

        {/* <p className='text-center m-10'>O O O O</p> */}
      </Wrapper>
    );
  };

  export default DoctorsCarousel;

```

### 15. Updated pages/Home.jsx

```bash
  import { useGlobalContext } from "../../context/GlobalContextProvider";
  import DoctorsCarousel from "../home/DoctorsCarousel";
  import Hero from "../home/Hero";

  export default function Home() {
    const { user, login, logout } = useGlobalContext();

    return (
      <main>
        <Hero />
        <DoctorsCarousel />
      </main>
    );
  }

```

### 16. Updated index.css

```bash
  :root {
  font-family: Inter, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

a {
  font-weight: 500;
  text-decoration: inherit;
}

/* #18171D #212121 */
li:hover {
  font-weight: 700;
  color: #1676cc;
}

body {
  box-sizing: border-box;
}

.slider {
  position: relative;
  width: 200px;
}

.slider__track,
.slider__range {
  border-radius: 3px;
  height: 5px;
  position: absolute;
}

.slider__track {
  background-color: #ced4da;
  width: 100%;
  z-index: 1;
}

.slider__range {
  background-color: #9fe5e1;
  z-index: 2;
}

/* Removing the default appearance */
.thumb,
.thumb::-webkit-slider-thumb {
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
}

.thumb {
  pointer-events: none;
  position: absolute;
  height: 0;
  width: 160px;
  outline: none;
}

.thumb--zindex-3 {
  z-index: 3;
}

.thumb--zindex-4 {
  z-index: 4;
}

/* For Chrome browsers */
.thumb::-webkit-slider-thumb {
  background-color: #220f77;
  border: none;
  border-radius: 50%;
  box-shadow: 0 0 1px 1px #ced4da;
  cursor: pointer;
  height: 18px;
  width: 18px;
  margin-top: 4px;
  pointer-events: all;
  position: relative;
}

/* For Firefox browsers */
.thumb::-moz-range-thumb {
  background-color: #f1f5f7;
  border: none;
  border-radius: 50%;
  box-shadow: 0 0 1px 1px #ced4da;
  cursor: pointer;
  height: 18px;
  width: 18px;
  margin-top: 4px;
  pointer-events: all;
  position: relative;
}

.dots-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-bottom: 5px;
}

.dot {
  height: 12px;
  width: 12px;
  margin-right: 10px;
  border-radius: 10px;
  background-color: #fff;
  animation: pulse 1.5s infinite ease-in-out;
}

.dot:last-child {
  margin-right: 0;
}

.dot:nth-child(1) {
  animation-delay: -0.3s;
}

.dot:nth-child(2) {
  animation-delay: -0.1s;
}

.dot:nth-child(3) {
  animation-delay: 0.1s;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    background-color: #b3d4fc;
    box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
  }

  50% {
    transform: scale(1.2);
    background-color: #4b79e4;
    box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
  }

  100% {
    transform: scale(0.8);
    background-color: #2584f8;
    box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
  }
}

.padding {
  @apply px-6 md:px-8 xl:px-10;
}

.slick-dots li button:before {
  @apply !text-primary;
}


```

### 17. Updated App.css

```bash
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  /*section vertical padding*/
  .section_vp {
    @apply py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 2xl:py-16;
  }
  .section_vp_admin {
    @apply py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-8;
  }


```

### 18. Updated doctors/DoctorCard.jsx

```bash
    /* eslint-disable react/prop-types */

  import { Link } from "react-router-dom";
  import Button from "../global/Button";

  export default function DoctorCard({ doctor, className }) {
    const { name, image, location, speciality, rating, consultationFee, id } =
      doctor;

    return (
      <div className={`mb-4 ${className}`}>
        <div className=" m-2 bg-white rounded-lg shadow-lg">
          <div className="flex items-center p-4">
            <img
              className="w-24 h-24 rounded-full object-cover"
              src={image}
              alt={name}
            />
            <div className="ml-4">
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-gray-500">{speciality}</p>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <p className="text-gray-600">Location: {location}</p>
          </div>
          <div className="p-4 border-t border-gray-200 flex justify-between items-center">
            <div>
              <p className="text-gray-700">Rating: {rating} / 5</p>
            </div>
            <p className="text-green-600 font-semibold">Fee: {consultationFee}</p>
          </div>

          <div className=" p-4 pt-0">
            <Link to={`/booking/${id}`} className="">
              <Button>Book appointment</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

```

### 19. Updated doctors/DoctorFilter.jsx

```bash
  /* eslint-disable react/prop-types */
  import { useCallback, useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux"; // Use standard

  import { FaCity, FaUserDoctor } from "react-icons/fa6";
  import { FaHospitalSymbol } from "react-icons/fa";
  import { IoFilter } from "react-icons/io5";
  import {
    doctors_data,
    filterCityOptions,
    filterHospitalOptions,
    filterSpecialityOptions,
  } from "../../utils/data";
  import FilterSelect from "../filter/FilterSelect";
  import {
    updateCityChosenDoctor,
    updateDoctorsOrder,
    updateDoctorsSort,
    updateFilteredDoctors,
    updateHospitalChosen,
    updateSpecialityChosen,
  } from "../../store/doctorsSlice";

  export default function DoctorFilter({
    currentlyViewedDoctorsLastIndex,
    currentlyViewedDoctorsStartIndex,
  }) {
    const dispatch = useDispatch(); // Use useDispatch from react-redux
    const {
      cityChosen,
      specialityChosen,
      hospitalChosen,
      sort,
      order,
      filteredDoctors,
    } = useSelector((state) => state.doctors); // Use useSelector to get the state

    const [filterDoctorOptions, setFilterDoctorOptions] = useState({});
    const sortOptions = ["Name", "Speciality", "City"];

    const filterCity = useCallback(
      (val) => {
        console.log("called city change");

        dispatch(updateCityChosenDoctor(val));
      },
      [dispatch]
    );

    const filterSpeciality = useCallback(
      (val) => {
        dispatch(updateSpecialityChosen(val));
      },
      [dispatch]
    );

    const filterHospital = useCallback(
      (val) => {
        dispatch(updateHospitalChosen(val));
      },
      [dispatch]
    );

    const updateSort = (val) => {
      dispatch(updateDoctorsSort(val));
    };

    const updateOrder = (val) => {
      dispatch(updateDoctorsOrder(val));
    };

    const doctorFilterOptions = [
      {
        id: 4,
        icon: <FaCity />,
        categoryTitle: "City",
        categoryValue: cityChosen,
        categoryValues: filterCityOptions,
        filterFn: filterCity,
        filterType: "select one",
        categoryType: "city",
      },
      {
        id: 5,
        icon: <FaUserDoctor />,
        categoryTitle: "Speciality",
        categoryValue: specialityChosen,
        categoryValues: filterSpecialityOptions,
        filterFn: filterSpeciality,
        filterType: "select one",
        categoryType: "speciality",
      },
      {
        id: 6,
        icon: <FaHospitalSymbol />,
        categoryTitle: "Hospital",
        categoryValue: hospitalChosen,
        categoryValues: filterHospitalOptions,
        filterFn: filterHospital,
        filterType: "select one",
        categoryType: "hospital",
      },
    ];

    const updateFilterDoctorOptions = useCallback(() => {
      let duplicateFilterDoctorOptions = { ...filterDoctorOptions };
      let duplicateFilteredDoctors = [...doctors_data];

      if (cityChosen && cityChosen !== "") {
        duplicateFilterDoctorOptions.city = cityChosen;
        duplicateFilteredDoctors = duplicateFilteredDoctors.filter(
          (doctor) => doctor.location.toLowerCase() == cityChosen.toLowerCase()
        );
      } else {
        delete duplicateFilterDoctorOptions.city;
      }

      if (specialityChosen && specialityChosen !== "") {
        duplicateFilterDoctorOptions.speciality = specialityChosen;
        duplicateFilteredDoctors = duplicateFilteredDoctors.filter(
          (doctor) =>
            doctor.speciality.toLowerCase() == specialityChosen.toLowerCase()
        );
      } else {
        delete duplicateFilterDoctorOptions.speciality;
      }

      if (hospitalChosen && hospitalChosen !== "") {
        duplicateFilterDoctorOptions.hospital = hospitalChosen;
        duplicateFilteredDoctors = duplicateFilteredDoctors.filter(
          (doctor) =>
            doctor.hospital.toLowerCase() == hospitalChosen.toLowerCase()
        );
      } else {
        delete duplicateFilterDoctorOptions.hospital;
      }

      if (sort && sort !== "") {
        duplicateFilterDoctorOptions.sortBy = sort.toLowerCase();
      } else {
        delete duplicateFilterDoctorOptions.sortBy;
      }

      if (order && order !== "") {
        duplicateFilterDoctorOptions.order =
          order === "A-Z" ? "asc" : order === "Z-A" ? "desc" : "asc";
      } else {
        delete duplicateFilterDoctorOptions.order;
      }

      dispatch(updateFilteredDoctors(duplicateFilteredDoctors));
      setFilterDoctorOptions(duplicateFilterDoctorOptions);
    }, [
      filterDoctorOptions,
      cityChosen,
      specialityChosen,
      hospitalChosen,
      sort,
      order,
      dispatch,
    ]);

    useEffect(() => {
      updateFilterDoctorOptions();
    }, []);

    useEffect(() => {
      updateFilterDoctorOptions();
      console.log("city chosen: ", cityChosen);
      console.log("speciality: ", specialityChosen);
    }, [cityChosen, specialityChosen, hospitalChosen, sort, order]);

    if (!filteredDoctors) {
      return <p>Loading doctors...</p>;
    }

    return (
      <div className="flex flex-col gap-4 lg:gap-5">
        <div className=" flex flex-col gap-3 md:gap-5 lg:flex-row lg:items-center">
          <div className="text-primary font-semibold flex items-center gap-4 ">
            <span>Filters</span>
            <span>
              <IoFilter />
            </span>
          </div>

          <div className="flex flex-wrap gap-3 md:gap-4 flex-1">
            {doctorFilterOptions.map((PageFilter) => {
              const {
                id,
                //   filterType,
                icon,
                categoryValue,
                categoryValues,
                filterFn,
                categoryType,
              } = PageFilter;

              return (
                <FilterSelect
                  options={categoryValues}
                  categoryValue={categoryValue}
                  updateCategoryValue={filterFn}
                  icon={icon}
                  key={id}
                  categoryType={categoryType}
                  className="w-full md:w-[calc(50%_-_8px)] lg:w-[calc((100%_/_3)_-_(32px_/_3))]"
                />
              );
            })}
          </div>
        </div>
        {/*
        <FilterByOrderPlusStatistic
          currentlyViewedItemsLastIndex={currentlyViewedDoctorsLastIndex}
          currentlyViewedItemsStartIndex={currentlyViewedDoctorsStartIndex}
          sort={sort}
          updateSortFunc={updateSort}
          itemNameFiltered="doctors"
          items={filteredDoctors}
          order={order}
          updateOrderFunc={updateOrder}
          sortOptions={sortOptions}
        /> */}
      </div>
    );
  }


```

### 20. Updated doctors/FilteredDoctorsList

```bash
  /* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import DoctorCard from "./DoctorCard";
import { updateDoctorsCurrentlyViewedPageNum } from "../../store/doctorsSlice";
import Pagination from "../global/Pagination";

export default function FilteredDoctorsList({
  totalDoctors,
  page,
  numOfDoctorsPerPage,
  onPageChange,
  totalPage,
  currentlyViewedDoctorsStartIndex,
  currentlyViewedDoctorsLastIndex,
}) {
  const dispatch = useDispatch();
  const { filteredDoctors } = useSelector((store) => store.doctors);

  const handlePageChange = (newPage) => {
    dispatch(updateDoctorsCurrentlyViewedPageNum(newPage));
    onPageChange(newPage);
  };

  if (!filteredDoctors) {
    return <p>Loading doctors...</p>;
  } else if (filteredDoctors.length === 0) {
    return <p>No doctors found according to your filters.</p>;
  } else {
    return (
      <div className="flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-9">
        <div className="flex flex-wrap gap-4 lg:gap-5">
          {filteredDoctors
            .slice(
              currentlyViewedDoctorsStartIndex,
              currentlyViewedDoctorsLastIndex
            )
            .map((doctor) => (
              <DoctorCard
                doctor={doctor}
                key={doctor.id}
                className="w-full sm:w-[calc(50%_-_8px)] lg:w-[calc((100%_/_3)_-_(40px_/_3))] xl:w-[calc(25%_-_20px)]"
              />
            ))}
        </div>

        {totalDoctors && totalPage && (
          <Pagination
            totalItems={totalDoctors}
            totalPage={totalPage}
            numOfItemsPerPage={numOfDoctorsPerPage}
            page={page}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    );
  }
}

```

# React hook forms

### 21. DoctorSignupForm2.tsx

```bash
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiRequest } from "../../utils/auth/apiRequest";

const DoctorSignupForm2 = ({ onSubmit }) => {
  const [hospitals, setHospitals] = useState([
    { hospitalName: "Hospital1", _id: 1 },
    { hospitalName: "Hospital2", _id: 2 },
  ]);
  const [profilePreview, setProfilePreview] = useState(null);
  const [picturePreviews, setPicturePreviews] = useState([]);
  const [selectedHospitals, setSelectedHospitals] = useState([]);

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
  ];

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    specialization: Yup.string().required("Specialization is required"),
    qualification: Yup.string().required("Qualification is required"),
    experienceYears: Yup.number()
      .typeError("Must be a number")
      .required("Experience Years are required"),
    clinicAddress: Yup.string().required("Clinic Address is required"),
    hospitalIds: Yup.array().min(1, "Select at least one hospital"),
    profileImage: Yup.mixed().required("Profile image is required"),
    pictures: Yup.array()
      .min(1, "At least one image is required")
      .of(Yup.mixed().required("Image is required")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      specialization: "",
      qualification: "",
      experienceYears: "",
      clinicAddress: "",
      hospitalIds: [],
      profileImage: null,
      pictures: [],
    },
  });

  const onFormSubmit = (data) => {
    data.hospitalIds = selectedHospitals; // Set selected hospitals
    onSubmit(data);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setValue("profileImage", file);
    setProfilePreview(URL.createObjectURL(file));
    trigger("profileImage"); // Manually trigger validation
  };

  const handlePicturesChange = (e) => {
    const files = Array.from(e.target.files);
    setValue("pictures", files);
    setPicturePreviews(files.map((file) => URL.createObjectURL(file)));
    trigger("pictures"); // Manually trigger validation
  };

  const handleHospitalSelection = (id) => {
    setSelectedHospitals((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((hospitalId) => hospitalId !== id)
        : [...prevSelected, id]
    );
    trigger("hospitalIds");
  };

  useEffect(() => {
    setValue("hospitalIds", selectedHospitals);
  }, [selectedHospitals]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Doctor Signup
        </h2>
        <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
          <input
            {...register("fullName")}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            placeholder="Full Name"
          />
          <p className="text-red-500 text-sm">{errors.fullName?.message}</p>

          <input
            {...register("email")}
            type="email"
            className="w-full p-3 border border-gray-300 rounded mt-2"
            placeholder="Email"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>

          <input
            {...register("password")}
            type="password"
            className="w-full p-3 border border-gray-300 rounded mt-2"
            placeholder="Password"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>

          <select
            {...register("specialization")}
            className="w-full p-3 border border-gray-300 rounded mt-2"
          >
            <option value="">Select Specialization</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm">
            {errors.specialization?.message}
          </p>

          {/* Hospital Selection */}
          <div className="w-full border border-gray-300 rounded mt-2 p-3">
            <p className="font-semibold text-gray-700 mb-2">Select Hospitals</p>
            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
              {hospitals.map((hospital) => (
                <label
                  key={hospital._id}
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => handleHospitalSelection(hospital._id)}
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    checked={selectedHospitals.includes(hospital._id)}
                    onChange={() => handleHospitalSelection(hospital._id)}
                  />
                  <span className="text-gray-600">{hospital.hospitalName}</span>
                </label>
              ))}
            </div>
          </div>
          <p className="text-red-500 text-sm">{errors.hospitalIds?.message}</p>

          {/* Profile Image with preview */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleProfileImageChange(e);
            }}
          />
          {profilePreview && (
            <img
              src={profilePreview}
              alt="Profile Preview"
              className="w-24 h-24 mt-2 rounded"
            />
          )}
          <p className="text-red-500 text-sm">{errors.profileImage?.message}</p>

          {/* Pictures with previews */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              handlePicturesChange(e);
            }}
          />
          <div className="flex mt-2 space-x-2">
            {picturePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index}`}
                className="w-16 h-16 rounded"
              />
            ))}
          </div>
          <p className="text-red-500 text-sm">{errors.pictures?.message}</p>

          {/* Qualification */}
          <input
            {...register("qualification")}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            placeholder="Qualification"
          />
          <p className="text-red-500 text-sm">
            {errors.qualification?.message}
          </p>

          {/* Experience Years */}
          <input
            {...register("experienceYears")}
            type="number"
            className="w-full p-3 border border-gray-300 rounded mt-2"
            placeholder="Experience Years"
          />
          <p className="text-red-500 text-sm">
            {errors.experienceYears?.message}
          </p>

          {/* Clinic Address */}
          <input
            {...register("clinicAddress")}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            placeholder="Clinic Address"
          />
          <p className="text-red-500 text-sm">
            {errors.clinicAddress?.message}
          </p>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded mt-4"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorSignupForm2;

```

### 22. DoctorSignupForm.tsx

```bash

/* eslint-disable react/prop-types */
// src/components/auth/DoctorSignupForm.jsx
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Grid2,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiRequest } from "../../utils/auth/apiRequest";

const DoctorSignupForm = ({ onSubmit }) => {
  const [hospitals, setHospitals] = useState([]);

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
  ];

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await apiRequest({
          method: "GET",
          url: "/hospitals",
        });
        setHospitals(response); // Assuming the response is an array of hospitals
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };
    fetchHospitals();
  }, []);

  // Validation schema with Yup
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    specialization: Yup.string().required("Specialization is required"),
    qualification: Yup.string().required("Qualification is required"),
    experienceYears: Yup.number()
      .typeError("Must be a number")
      .required("Experience Years are required"),
    clinicAddress: Yup.string().required("Clinic Address is required"),
    hospitalIds: Yup.array().min(1, "Select at least one hospital"),
    profileImage: Yup.mixed().required("Profile image is required"),
    pictures: Yup.array()
      .min(1, "At least one image is required")
      .of(Yup.mixed().required("Image is required")),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      specialization: "",
      qualification: "",
      experienceYears: "",
      clinicAddress: "",
      hospitalIds: [],
      profileImage: null,
      pictures: [],
    },
  });

  const onFormSubmit = (data) => {
    console.log("Form Data:", data);
    onSubmit(data);
  };

  return (
    <Grid2 container justifyContent="center" alignItems="center">
      <Grid2 item xs={12} sm={8} md={6} lg={4} maxWidth="sm">
        <Card variant="outlined">
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              align="center"
              gutterBottom
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "gray.700",
                marginBottom: "1.5rem",
              }}
            >
              Doctor Signup
            </Typography>
            <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Full Name"
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Email"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />

              <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.specialization}
              >
                <InputLabel>Specialization</InputLabel>
                <Controller
                  name="specialization"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Specialization">
                      {specializations.map((spec) => (
                        <MenuItem key={spec} value={spec}>
                          {spec}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <Typography variant="body2" color="error">
                  {errors.specialization?.message}
                </Typography>
              </FormControl>

              <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.hospitalIds}
              >
                <InputLabel>Hospitals</InputLabel>
                <Controller
                  name="hospitalIds"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      multiple
                      renderValue={(selected) =>
                        hospitals
                          .filter((hospital) => selected.includes(hospital._id))
                          .map((hospital) => hospital.hospitalName)
                          .join(", ")
                      }
                    >
                      {hospitals.map((hospital) => (
                        <MenuItem key={hospital._id} value={hospital._id}>
                          <Checkbox
                            checked={field.value.includes(hospital._id)}
                          />
                          <ListItemText primary={hospital.hospitalName} />
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <Typography variant="body2" color="error">
                  {errors.hospitalIds?.message}
                </Typography>
              </FormControl>

              <Controller
                name="profileImage"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files[0])}
                    required
                  />
                )}
              />
              <Typography variant="body2" color="error">
                {errors.profileImage?.message}
              </Typography>

              <Controller
                name="pictures"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    multiple
                    onChange={(e) => {
                      // Convert FileList to an array and set it in the form state
                      field.onChange(Array.from(e.target.files));
                    }}
                    required
                  />
                )}
              />

              <Typography variant="body2" color="error">
                {errors.pictures?.message}
              </Typography>

              <Controller
                name="qualification"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Qualification"
                    error={!!errors.qualification}
                    helperText={errors.qualification?.message}
                  />
                )}
              />

              <Controller
                name="experienceYears"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Experience Years"
                    type="number"
                    error={!!errors.experienceYears}
                    helperText={errors.experienceYears?.message}
                  />
                )}
              />

              <Controller
                name="clinicAddress"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Clinic Address"
                    error={!!errors.clinicAddress}
                    helperText={errors.clinicAddress?.message}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "16px" }}
              >
                Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default DoctorSignupForm;

```
