import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { MainContent } from "../src/components/MainContent";
import { About } from "./components/About";
import Header from "./components/Header";

import CategoryBlog from "./components/BlogCRUD/CategoryBlog";
import Bookmarks from "./components/Bookmarks";
import Detail from "./components/BlogCRUD/Detail";
import Login from "./components/UserCRUD/Login";
import Register from "./components/UserCRUD/Register";
import { CreateBlog } from "./components/BlogCRUD/CreateBlog";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainContent />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/blogs/category/:category"
          element={<CategoryBlog />}
        ></Route>
        <Route path="/blog/:blogId" element={<Detail />}></Route>
        <Route path="/bookmarks" element={<Bookmarks />}></Route>
        <Route path="/blog/create" element={<CreateBlog />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
