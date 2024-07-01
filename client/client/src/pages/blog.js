import React from 'react';
import { useEffect,useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Modal } from 'react-bootstrap';


const Blog = () => {
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
    return ( 
        <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>{data.title}</Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
            <img width="350px" height="250px" src={`http://localhost:5000/${data.image}`} />
            <p>{data.content}</p>
          </Modal.Body>
        </Modal.Dialog>
      </div>
     );
}
 
export default Blog;