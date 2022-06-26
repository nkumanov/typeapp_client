import React from "react";
import { Link } from "react-router-dom";

interface InProps {
  title: string;
  path: string;
  link: string;
}

const NavLink = ({ link, title, path }: InProps) => {
  return (
    <div className={"nav-links bl-button"}>
      <Link to={path}>{title}</Link>
    </div>
  );
};

export default NavLink;
