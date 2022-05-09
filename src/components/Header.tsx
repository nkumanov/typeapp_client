import React from "react";
import { useRef } from "react";
import NavLink from "./NavLink";
import { Link } from "react-router-dom";

import PopupLogin from "./popupLogin";
import RegisterPopUp from "./RegisterPopUp";
import CreatePopup from './CreatePopup'
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import SubHeader from "./SubHeader";
import { logout } from "../features/userLogin";

export default function Header() {
  let location = useLocation();
  const dispatch = useDispatch();

  const isLogged = useSelector((state: RootState) => state.userlogin.value);
  const navigate = useHistory();
  
  const getLoggedOut = (): void => {
    dispatch(logout(''));
    navigate.push("/");
  };

  const navItems = useRef<HTMLInputElement>(null);
  // const myFunction = () => {

  //     if(navItems.current.style.display == ''){
  //         navItems.current.style.display = 'flex';
  //         return null;
  //     }
  //     navItems.current.style.display = navItems.current.style.display == 'none' ? 'flex' : 'none'
  // }
  
  return (
    <>
      <div className="row row-header">
        <div className="wrapper header">
          <div className="logo">
            <Link to="/">Story Tale</Link>
          </div>
          {isLogged ? (
            <div ref={navItems} className="header-right desktop-nav">
              <CreatePopup></CreatePopup>
              <NavLink
                link="/bookmarks"
                title="My Bookmarks"
                path="bookmarks"
              />

              <div className={"nav-links"}>
                <button onClick={getLoggedOut}>Logout</button>
              </div>
            </div>
          ) : (
            <div ref={navItems} className="header-right desktop-nav">
              <NavLink link="/about" title="Our Story" path="about" />
              <PopupLogin></PopupLogin>
              <RegisterPopUp></RegisterPopUp>
              
            </div>
          )}
          
        </div>
        
      </div>
      {location.pathname == "/" ? (
        <SubHeader logged={isLogged ? true : false} />
      ) : (
        ""
      )}
      {/* {location.pathname == '/' ? <HorizontalCategories /> : ''} */}
    </>
  );
}
