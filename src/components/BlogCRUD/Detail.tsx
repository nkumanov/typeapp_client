import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { DetailBlogDTO } from "../../models/DetailBlogDTO";
import { getBlogById } from "../_helper/getBlogById";
import { addBookmark } from "../_helper/addToBookmarks";
const Detail = () => {
  let { blogId } = useParams();

  const [blog, setBlog] = useState<DetailBlogDTO>();

  useEffect(() => {
    const response = getBlogById(blogId as string);
    response.then((res) => setBlog(res.data));
  }, [blogId]);

  const cookie = new Cookies();
  const navigate = useNavigate();
  console.log("here");
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
                <img
                  src={`http://localhost:5000/uploads/${blog?.image}`}
                  alt=""
                />
                <p>{blog?.author}</p>

                <span>{blog?.createdAt}</span>
                {/* <span>{blog?.readTime} {blog?.readTime > 1 ? 'minutes' : 'minute'} read</span> */}
              </div>
              <div className="right-side">
                <Link className="bookmark" to="">
                  <i className="fab fa-facebook-square"></i>
                </Link>
                <Link className="bookmark" to="">
                  <i className="fab fa-twitter-square"></i>
                </Link>

                <Link className="bookmark" to="">
                  <i className="fab fa-linkedin"></i>
                </Link>
                <button
                  className="bookmark"
                  onClick={() => addBookmark(blogId as string)}
                >
                  <i className="far fa-bookmark"></i>
                </button>
              </div>
            </article>
            <article className="blog-body">
              <img
                src={`http://localhost:5000/uploads/${blog?.image}`}
                alt=""
              />
              <p>{blog?.description}</p>
            </article>
            <article className="blog-footer"></article>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Detail;
