import { useState } from 'react'
import { sign_in , register } from './components'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <sign_in/>
   <register/>
    </>
  )
}

export default App
