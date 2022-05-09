import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import MainContent from "../src/components/MainContent";
import Header from "./components/Header";
import About from "./components/About";

import Detail from "./components/Detail";
import CategoryBlog from "./components/CategoryBlog";
import Bookmarks from "./components/Bookmarks";


function App() {
  return (
    <BrowserRouter>
      <Header />
      
      <Switch>
        <Route exact path="/">
          <MainContent></MainContent>
        </Route>
        <Route path="/about">
          <About></About>
        </Route>
        <Route path="/blogs/category/:category">
          <CategoryBlog></CategoryBlog>
        </Route>
        <Route path="/blog/:blogId">
          <Detail></Detail>
        </Route>
        <Route path='/bookmarks'>
          <Bookmarks></Bookmarks>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
