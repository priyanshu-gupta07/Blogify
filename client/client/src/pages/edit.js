import axios from "axios";
import React, { useState,useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate,useParams} from "react-router-dom";


const Edit = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiurl="http://localhost:5000/blog/"+params.id;
        const response = await axios.get(apiurl);

        if(response.status === 200) {
          if(response?.data?.statusText === "Ok") {
            setData(response?.data?.data);
          }
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();

    return () => {}
  } , [params.id]);

  console.log(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveForm = async (data) => {
    setLoading(true);
    // console.log(data);
    try {
      const response = await axios.put("http://localhost:5000/blog/"+ params.id,data);

      if (response.status === 200) {
        console.log(response);
        navigate("/",{
          state: "Saved Successfully!"
        });
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
        <h1>Edit a Post</h1>
        <form onSubmit={handleSubmit(saveForm)}>
          <Row>
            <Col xs="12" className="py-3">
              <label>Post Title</label>
              <input
                defaultValue={data.title}
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
                defaultValue={data.content}
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

export default Edit;