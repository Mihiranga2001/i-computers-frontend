import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductCard from './components/productCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProductCard name="Laptop" price="100 000" image="https://picsum.photos/id/0/5000/3333"/>
      <ProductCard name="Pen drive" price="2 000" image="https://picsum.photos/id/0/5000/3333"/>
      <ProductCard name="Mouse" price="1 000" image="https://picsum.photos/id/0/5000/3333"/>
      <ProductCard name="Key board" price="1 000" image="https://picsum.photos/id/0/5000/3333"/>
    </>
  )
}

export default App
