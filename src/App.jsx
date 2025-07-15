import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutUs from './components/AboutUsPage/AboutUs'; // ✅ correct relative path
import Login from './pages/Login'; // or wherever your login component is

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<AboutUs />} /> {/* ✅ Add this line */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
