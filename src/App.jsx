import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
  
      <div className="min-h-screen flex flex-col bg-[#09090b] text-white">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route index element={<Home />} />
          
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;