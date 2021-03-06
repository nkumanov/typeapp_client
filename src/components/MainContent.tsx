import { useEffect, useState } from "react";
import { Blog } from "./BlogCRUD/Blog";
import Categories from "./Categories";
import { getBlogs } from "./_helper/getBlog";
export const MainContent: React.FC = () => {
  const [blogs, setBlogs] = useState<[]>([]);
  useEffect(() => {
    getBlogs().then((res) => setBlogs(res?.data));
  }, []);
  return (
    <div className="row row-main-content">
      <div className="wrapper">
        <div className="main-content">
          <div className="left-main-content">
            {blogs.length > 0 ? (
              blogs.map((element: any) => (
                <Blog
                  key={element._id}
                  authorImage={element.image}
                  blogImage={element.image}
                  id={element._id}
                  readTime={element.readTime}
                  title={element.title}
                  subTitle={element.subTitle}
                  category={element.category}
                  createdAt={element.createdAt}
                  author={element.author || "Unknown User"}
                />
              ))
            ) : (
              <h1>No blogs to show</h1>
            )}
          </div>
          <div className="right-main-content">
            <h3>DISCOVER MORE OF WHAT MATTERS TO YOU</h3>
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
