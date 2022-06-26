import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookmarkBlog from "./BlogCRUD/BookmarkBlog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../features/store";
import Cookies from "universal-cookie";
import { getBookmarks } from "./_helper/getBookmarks";
const Bookmarks: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const blogs = useSelector((state: RootState) => state.user.bookmarked);
  const [change, setChange] = useState(false);
  const cookie = React.useMemo(() => new Cookies(), []);
  let navigate = useNavigate();

  useEffect(() => {
    if (cookie.get("userData") === undefined) {
      navigate("/login");
      return undefined;
    } else {
      dispatch(getBookmarks());
    }
  }, [cookie, navigate, change]);

  const deletedBlog = (): void => {
    setChange((oldState) => !oldState);
  };

  return (
    <div className="row row-main-content">
      <div className="wrapper">
        <div className="main-content">
          <div className="left-main-content">
            {blogs.length > 0 ? (
              blogs.map((element: any) => (
                <BookmarkBlog
                  key={element._id}
                  setChanger={deletedBlog}
                  authorImage={element.image}
                  blogImage={element.image}
                  id={element._id}
                  readTime={element.readTime}
                  title={element.title}
                  subTitle={element.subTitle}
                  category={element.category}
                  createdAt={element.createdAt}
                  author={element.author}
                />
              ))
            ) : (
              <h1>No blogs to show</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
