import { useState } from 'react'
import './App.css'
import NailsStudio from './components/NailsStudio'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NailsStudio/>
    </>
  )
}

export default App
