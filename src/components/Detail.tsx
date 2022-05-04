import React from 'react'
import { useState, useEffect } from 'react';

import { useHistory, Link, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';

interface detailBlog{
    title: string,
    subTitle: string,
    image: string,
    readTime?: number,
    createdAt: string,
    description: string,
    author: string
}
interface detailId{
    blogId: string
}
const Detail = () => {

    let { blogId } = useParams<detailId>();
    
    const [blog, setBlog] = useState<detailBlog>();
    
    useEffect(() => {
        
        fetch(`http://localhost:5000/blogs/${blogId}`).then(res => res.json()).then(data => setBlog(data));

    }, []);
    
    const cookie = new Cookies();
    const navigate = useHistory();
    const addBookmark = () => {
        if(cookie.get('userData')){
            fetch(`http://localhost:5000/user/bookmark/${blogId}`, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json", 'X-Authorization': cookie.get('userData') },
                
            });
        }else{
            navigate.push('/login');
            return;
        }
        
    }
    return (
        <div className="row row-form-content">
            <div className="wrapper">
                <div className="main-content">

                    <section className="detail-content">

                        <article className="blog-header">
                            <h1 className="title">{blog?.title}</h1>
                            <h2 className="subHeading">{blog?.subTitle}</h2>
                        </article>
                        <article className="blog-author">
                            <div className="left-side">

                                <img src={`http://localhost:5000/uploads/${blog?.image}`} alt="" />
                                <p>{blog?.author}</p>

                                <span>{blog?.createdAt}</span>
                                {/* <span>{blog?.readTime} {blog?.readTime > 1 ? 'minutes' : 'minute'} read</span> */}


                            </div>
                            <div className="right-side">
                                <Link className="bookmark" to=""><i className="fab fa-facebook-square"></i></Link>
                                <Link className="bookmark" to=""><i className="fab fa-twitter-square"></i></Link>

                                <Link className="bookmark" to=""><i className="fab fa-linkedin"></i></Link>
                                <button className="bookmark" onClick={addBookmark}><i className="far fa-bookmark"></i></button>

                            </div>
                        </article>
                        <article className="blog-body">
                            <img src={`http://localhost:5000/uploads/${blog?.image}`} alt="" />
                            <p>{blog?.description}</p>
                        </article>
                        <article className="blog-footer">

                        </article>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Detail