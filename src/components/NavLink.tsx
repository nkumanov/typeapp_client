import React from 'react'
import { Link } from "react-router-dom";

interface inProps {
    
    title: string,
    path: string,
    link: string
}

const NavLink: React.FunctionComponent<inProps> = ({ link, title, path }: inProps) => {

    return (
        <div className={'nav-links bl-button'}>
            <Link to={path} >{title}</Link>
        </div>
    )
}

export default NavLink;