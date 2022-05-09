import React, { EffectCallback } from 'react';
import BookmarkBlog from './BookmarkBlog';
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';

import Cookies from 'universal-cookie';
const Bookmarks: React.FC = () => {
    const [blogs, setBlogs] = useState([]);
    const [change, setChange] = useState(false);
    const cookie = new Cookies();
    let navigate = useHistory();

    useEffect(() => {
        if (cookie.get('userData') == undefined) {
            navigate.push('/login');
            return undefined;
        }
    }, []);
    // ASk THE QUESTION



    // useEffect(() => {
    //     let response = fetch('http://localhost:5000/user/bookmarked', {
    //         method: 'GET',
    //         headers: { "Content-Type": "application/json", 'X-Authorization': cookie.get('userata') },
    //     }).then(res => res.json()).then(data => setBlogs(data)).catch(error => console.log(error));
    // }, [change]);
    useEffect(() => {
        const getData = async (): Promise<void> => {
            try {
                let response = await fetch('http://localhost:5000/user/bookmarked', {
                    method: 'GET',
                    headers: { "Content-Type": "application/json", 'X-Authorization': cookie.get('userData') },
                });
                let data = await response.json();
                if (response.status >= 200 && response.status < 300) {
                    setBlogs(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData()



    }, [change]);
    const deletedBlog = (): void => {
        setChange(oldState => !oldState);
    }

    return (

        <div className="row row-main-content">
            <div className="wrapper">
                <div className="main-content">
                    <div className="left-main-content">

                        {blogs.length > 0 ? blogs.map((element: any) => <BookmarkBlog key={element._id} setChanger={deletedBlog} authorImage={element.image} blogImage={element.image} id={element._id} readTime={element.readTime} title={element.title} subTitle={element.subTitle} category={element.category} createdAt={element.createdAt} author={element.author} />) : <h1>No blogs to show</h1>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bookmarks;
