import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const Add = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveForm = async (data) => {
    setLoading(true);
    console.log(data);

    data.file =data.image[0];
    data.image=null;

    try {
      const response = await axios.post("http://localhost:5000/create", data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }});

      if (response.status === 201) {
        console.log(response);
        navigate("/");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  if(loading) {
    return (
      <Container >
        <div style={{
          width: '100vw',
          height: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'auto',
        }}>
        <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        </div>
      </Container>
    )
  }
  return (
    <>
      <Container>
        <div style={{
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}></div>
        <h1>Add a New Post</h1>
        <form onSubmit={handleSubmit(saveForm)}>
          <Row>
            <Col xs="12" className="py-3">
              <label>Post Title</label>
              <input
                defaultValue=""
                className={`${errors.title && "error"}`}
                placeholder="Please enter title"
                {...register("title", {
                  required: { value: true, message: "Title is required." },
                  min: {
                    value: 3,
                    message: "Title should be minimum 3 characters.",
                  },
                })}
              />
              {errors.title && (
                <div className="error">{errors.title.message}</div>
              )}
            </Col>
            <Col xs="12" className="py-3">
              <label>Post Content</label>
              <input
                defaultValue=""
                className={`${errors.post && "error"}`}
                placeholder="Please enter content"
                {...register("content", {
                  required: {
                    value: true,
                    message: "Post Content is required.",
                  },
                })}
              />
              {errors.post && (
                <div className="error">{errors.post.message}</div>
              )}
            </Col>
            <Col xs="12" className="py-3">
              <label>Image</label>
              <input
                type="file"
                className={`${errors.image && "error"}`}
                placeholder="upload file"
                {...register("image", {
                })}
              />
              {errors.post && (
                <div className="error">{errors.post.message}</div>
              )}
            </Col>
            <Col>
              <button type="submit">Save</button>
            </Col>
          </Row>
        </form>
        <div/>
        
      </Container>
    </>
  );
};

export default Add;