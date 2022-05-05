import React from "react";
import Cookies from "universal-cookie";
import { Route, Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

interface Iprops {
  author: string;
  authorImage: string;
  blogImage: string;
  category: string;
  createdAt: string;
  id: string;
  readTime: number;
  subTitle: string;
  title: string;
}

const Blog: React.FunctionComponent<Iprops> = ({
  author,
  authorImage,
  blogImage,
  category,
  createdAt,
  id,
  readTime,
  subTitle,
  title,
}) => {
  const cookie = new Cookies();
  // const navigate = useNavigate();
  const addBookmark = () => {
    if (cookie.get("userData")) {
      fetch(`http://localhost:5000/user/bookmark/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": cookie.get("userData"),
        },
      });
    } else {
      // navigate('/login');
      return;
    }
  };
  return (
    <section className="content">
      <div className="blog-content">
        <div className="author">
          <img
            src={`http://localhost:5000/uploads/${authorImage}`}
            alt=""
            srcSet=""
          />

          <span>{author}</span>
        </div>
        <div className="info">
          <span className="example">
            <Link to={"/blog/" + id}></Link>
          </span>
          <h2>{title}</h2>
          <p>{subTitle}</p>
        </div>
        <div className="blog-addons">
          <div className="blog-info">
            <span>{createdAt}</span>
            <span>
              {readTime} {Number(readTime) > 1 ? "minutes" : "minute"} read
            </span>
            <span>
              <Link to={`/blogs/category/${category}`}>{category}</Link>
            </span>
          </div>
          <button
            className="bookmark"
            title="add to bookmark"
            onClick={addBookmark}
          >
            <i className="far fa-bookmark"></i>
          </button>
        </div>
      </div>
      <div className="blog-image">
        <span className="example">
          <Link to={"/blog/" + id}></Link>
        </span>
        <img
          src={`http://localhost:5000/uploads/${blogImage}`}
          alt=""
          srcSet=""
        />
      </div>
    </section>
  );
};

export default Blog;
