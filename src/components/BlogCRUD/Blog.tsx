import BookmarkIcon from "@mui/icons-material/Bookmark";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { BlogDTO } from "../../models/BlogDTO";
export const Blog: React.FunctionComponent<BlogDTO> = ({
  author,
  authorImage,
  blogImage,
  category,
  createdAt,
  id,
  readTime,
  subTitle,
  title,
  children,
}) => {
  const cookie = new Cookies();
  const navigate = useNavigate();
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
      navigate("/login");
      return;
    }
  };
  return (
    <section className="content">
      {children}
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
            <BookmarkIcon></BookmarkIcon>
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
