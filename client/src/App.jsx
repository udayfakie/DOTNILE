import React from "react";
import { Routes, Route } from "react-router-dom";
import Apis from "./Apis";
import GlobalStyle from "./GlobalStyle";
import Service from "./screens/Service";
import Navbar from "./navbar/Navbar";
import Documentation from "./screens/Documentation";
import About from "./screens/About";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route path="/" element={<Apis />} />
        <Route path="/service" element={<Service/> } />
        <Route path="/documentation" element={<Documentation/> } />
        <Route path="/about" element={<About/> } />
        
        
      </Routes>
    </>
  );
};

export default App;
