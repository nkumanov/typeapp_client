import React from 'react'
import { useRef } from 'react'
import NavLink from './NavLink'
import { Route, Link } from "react-router-dom";
import Cookies from 'universal-cookie'

import {useLocation, useHistory} from 'react-router-dom'


import SubHeader from './SubHeader';


export default function Header() {
    
    
    const cookie = new Cookies();
    let location = useLocation();
    const navigate = useHistory();
    const logout = () => {
        cookie.remove('userData');
        navigate.push('/')
    }
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
                        <Link to='/'>Story Tale</Link>
                    </div>
                    {cookie.get('userData') ? <div ref={navItems} className="header-right desktop-nav">
                        <NavLink link='/blog/create' title='Create blog' path="blog/create" />
                        <NavLink link='/bookmarks' title='My Bookmarks' path="bookmarks" />

                        <div className={'nav-links'}>
                            <button onClick={logout}>Logout</button>
                        </div>

                    </div> : <div ref={navItems} className="header-right desktop-nav">
                        <NavLink link='/about' title='Our Story' path="about" />
                        <NavLink link='/login' title='Sign In' path="login" />
                        <NavLink link='/register' path="register" title='Get Started' />

                    </div>}
                    {/* <Link path='' to='' className="icon" onClick={myFunction}>
                        <i className="fa fa-bars"></i>
                    </Link> */}



                </div>
                {/* {cookie.get('userData') ? <div ref={navItems}  className="header-right mobile-nav">
                    <NavLink link='/blog/create' title='Create blog' path="blog/create" />
                    <NavLink link='/bookmarks' title='My Bookmarks' path="bookmarks" />

                    <div className={'nav-links'}>
                        <button onClick={logout}>Logout</button>
                    </div>

                </div> : <div ref={navItems} className="header-right mobile-nav">
                    <NavLink link='/about' title='Our Story' path="about" />
                    <NavLink link='/login' title='Sign In' path="login" />
                    <NavLink link='/register' path="register" title='Get Started' />

                </div>} */}
            </div>
            {location.pathname == '/' ? <SubHeader logged={cookie.get('userData') ? true : false} /> : ''}
            {/* {location.pathname == '/' ? <HorizontalCategories /> : ''} */}
        </>
    )
}
