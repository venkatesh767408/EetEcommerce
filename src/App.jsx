import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login';  
import BestOffers from './pages/Bestoffers';
const App = () => {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/Bestoffers" element={<BestOffers />}></Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App