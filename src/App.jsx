import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import FoodList from "./components/foodList.component";
import About from "./components/about.component";
import CreateFood from "./components/createFood.component";
import EditFood from "./components/editFood.component";
import CreateUser from "./components/createUser.component";
import Footer from "./components/footer.component";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

function App() {
  return (
    <BrowserRouter basename={basename}>
      <Navbar />
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<FoodList />} />
          <Route path="/foodlist" element={<FoodList />} />
          <Route path="/create" element={<CreateFood />} />
          <Route path="/edit/:id" element={<EditFood />} />
          <Route path="/user" element={<CreateUser />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
