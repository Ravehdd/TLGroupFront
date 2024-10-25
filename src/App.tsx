import { useState } from 'react'
import Employees_tree from './components/Employees_tree'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Employees_tree />
    </>
  )
}

export default App
