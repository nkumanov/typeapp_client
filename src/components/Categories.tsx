import React from 'react'
import { Route, Link } from "react-router-dom";

export default function Categories() {
    

    return (
        <div className="category">
            <Link to="/blogs/category/science">Science</Link>
            <Link to="/blogs/category/programming">Programming</Link>
            <Link to="/blogs/category/life-style">Life Style</Link>
            <Link to="/blogs/category/cars">Cars</Link>
            <Link to="/blogs/category/productivity">Productivity</Link>
            <Link to="/blogs/category/relationships">Relationships</Link>
            <Link to="/blogs/category/politics">Politics</Link>
        </div>
    )
}
