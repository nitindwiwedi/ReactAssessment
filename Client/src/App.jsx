import './App.css'
import Home from './Components/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import React from 'react'
import Services from './Components/Services'
import Form from './Components/Form'
import Client from './Components/Client'
import Navbar from './Components/Navbar'

class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/service" element={<Services />} />
            <Route path="/contact" element={<Form />} />
            <Route path="/client" element={<Client />} />
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}

export default App
