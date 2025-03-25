import { useState } from 'react'
import TopProducts from './Components/AllTime'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TopProducts/>
    </>
  )
}

export default App
