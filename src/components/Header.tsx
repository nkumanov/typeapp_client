import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavLink from "./NavLink";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userLogin";
import { RootState } from "../features/store";
import SubHeader from "./SubHeader";

export default function Header() {
  let location = useLocation();
  const dispatch = useDispatch();

  const isLogged = useSelector((state: RootState) => state.user.userLogin);
  const navigate = useNavigate();

  const getLoggedOut = (): void => {
    dispatch(logout(""));

    navigate("/");
  };

  const navItems = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="row row-header">
        <div className="wrapper header">
          <div className="logo">
            <Link to="/">Story Tale</Link>
          </div>
          {isLogged ? (
            <div ref={navItems} className="header-right desktop-nav">
              <NavLink link="/about" title="Our Story" path="about" />
              <NavLink
                link="/blog/create"
                title="Create blog"
                path="blog/create"
              />
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
              <NavLink link="/login" title="Login" path="login" />
              <NavLink link="/register" title="Register" path="register" />
            </div>
          )}
        </div>
      </div>
      {location.pathname === "/" ? (
        <SubHeader logged={isLogged ? true : false} />
      ) : (
        ""
      )}
      {/* {location.pathname == '/' ? <HorizontalCategories /> : ''} */}
    </>
  );
}
