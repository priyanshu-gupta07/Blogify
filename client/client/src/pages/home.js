import React from 'react';
import {Col, Container, Row, } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'

const Home = () => {
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);

    Location=useLocation();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const apiurl="http://localhost:5000";
          const response = await axios.get(apiurl);
  
          if(response.status === 200) {
            if(response?.data?.statusText === "Ok") {
              setData(response?.data?.data);
            }
          }

          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error.response);
        }
      };
      fetchData();
  
      return () => {}
    } , []);
  
    console.log(data);

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
        <Container>
      <h3>
          <Link to="Add" className="btn btn-primary">
            Add New
          </Link>
        </h3>
        <h5/>{Location.state && Location.state}<h5/>
        <Row>
        {data && (
          data.map((item, index) => (
            <Row>
            <Col xs="12" key={index} className="py-5"  >
              <Card style={{ width: '18rem' }} className="shadow p-3 mb-5 bg-white rounded">
                <Card.Body>
                  <Card.Title>
                    {item.title}
                    </Card.Title>
                  <Card.Text>
                    {item.content}
                  </Card.Text>
                  <Link to= {`/blog/${item.id}`}>Read More </Link><br/>
                  <Link to={`/edit/${item.id}`}>
                  <i className="fa-solid fa-pencil "></i>
                  </Link>&nbsp;
                  <Link to={`/delete/${item.id}`}>
                  <i className="fa-solid fa-trash "></i>
                  </Link>
                </Card.Body>

              </Card>
            </Col>
            </Row>
        )))}
      </Row>
    </Container>
     );
}
 
export default Home;