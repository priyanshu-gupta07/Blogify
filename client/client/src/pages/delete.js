import axios from 'axios';
import React from 'react';
import { Container, Row,Col } from 'react-bootstrap';
import { useParams,useNavigate } from 'react-router-dom';

const  Delete= () => {

    const params=useParams();

    const Navigate=useNavigate();

    const handleDelete= async () =>  {
        try{
        const apiurl="http://localhost:5000/blog/"+params.id;

        const response=await axios.delete(apiurl);
        
        if(response.status === 200) {
            Navigate("/",{
                state: "Deleted Successfully!"
            })
        }
    }catch(error) {
            console.log(error.response);
    }
}
    return ( 
        <Container>
            <Row>
                <h2>Are you sure you want to Delete the Record</h2>
                <Col xs="12" className='py-5'>
                    <button className="btn btn-danger py-2 my-2" onClick={handleDelete}>Delete</button>
                </Col>
            </Row>
        </Container>
     );
}
export default Delete;