import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DoctorCard from './components/DoctorCard'
import DoctorsList from './components/DoctorsList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DoctorsList />
    </>
  )
}

export default App
