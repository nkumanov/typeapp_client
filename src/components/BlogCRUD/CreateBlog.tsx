import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../features/store";
import { LoadingComponent } from "../LoadingComponent";
import { createBlog } from "../_helper/createBlog";
export const CreateBlog = () => {
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const isLogged = useSelector((state: RootState) => state.user.userLogin);

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [navigate]);
  let titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  let subTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubTitle(event.target.value);
  };
  let descriptionHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };
  let categoryHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };
  let fileSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.split("\\").pop();

    setImage(value);
  };
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const blog = {
      title: title,
      subTitle: subTitle,
      category: category,
      image: image,
      description: description,
    };

    try {
      setLoading(true);
      const result = await createBlog(blog);
      if (result.status === 200) {
        setLoading(false);
        return navigate("/");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      {loading && <LoadingComponent />}
      {!loading && (
        <section className="edit-form">
          <h2>Create new blog post</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-element">
              <p>Title: </p>
              <label htmlFor="title">
                <input
                  type="text"
                  id="title"
                  name="title"
                  onChange={titleHandler}
                  placeholder="Title"
                />
              </label>
            </div>
            <div className="form-element">
              <p>Sub-Title: </p>
              <label htmlFor="subTitle">
                <input
                  type="text"
                  id="subTitle"
                  name="subTitle"
                  onChange={subTitleHandler}
                  placeholder="Sub-Title"
                />
              </label>
            </div>
            <div className="form-element">
              <p>Category: </p>
              <label htmlFor="category">
                <select
                  onChange={categoryHandler}
                  name="category"
                  id="category"
                >
                  <option value="science">Science</option>
                  <option value="programming">Programming</option>
                  <option value="life-Style">Life Style</option>
                  <option value="cars">Cars</option>
                  <option value="productivity">Productivity</option>
                  <option value="relationships">Relationships</option>
                  <option value="politics">Politics</option>
                </select>
              </label>
            </div>
            <div className="form-element">
              <p>Description: </p>
              <label htmlFor="description">
                <textarea
                  onChange={descriptionHandler}
                  name="description"
                  id="description"
                  cols={40}
                  rows={20}
                  placeholder="Put your description here"
                ></textarea>
              </label>
            </div>
            <div className="form-element">
              <p>Image: </p>
              <label htmlFor="image">
                Select image
                <input
                  onChange={fileSelectedHandler}
                  type="file"
                  id="image"
                  name="image"
                  placeholder="image"
                />
              </label>
            </div>
            <div className="form-element">
              <button type="submit">Submit</button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};
