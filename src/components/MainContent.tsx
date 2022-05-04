import React from 'react'
import Blog from './Blog'
import { useEffect, useState } from 'react'

import Categories from './Categories'
export default function MainContent() {
    const [blogs, setBlogs] = useState<[]>([]);
    useEffect(() => {
        fetch('http://localhost:5000/blogs').then(res => res.json()).then(data => setBlogs(data))

    }, []);

    return (
        <div className="row row-main-content">
            <div className="wrapper">
                <div className="main-content">
                    <div className="left-main-content">

                        {blogs.length > 0 ? blogs.map((element: any) => <Blog key={element._id} authorImage={element.image} blogImage={element.image} id={element._id} readTime={element.readTime} title={element.title} subTitle={element.subTitle} category={element.category} createdAt={element.createdAt} author={element.author || 'pesho'} />) : <h1>No blogs to show</h1>}
                    </div>
                    <div className="right-main-content">
                        <h3>DISCOVER MORE OF WHAT MATTERS TO YOU</h3>
                        <Categories />
                    </div>

                </div>
            </div>
        </div>
    )
}
