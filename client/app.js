import React from 'react'

import Navbar from './components/Navbar'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

const logo = document.querySelectorAll('#logo path');
console.log(logo);
console.log('hello')

export default App
