import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Feed from './common/Feed';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';

function Create() {
  let [title, setTitle] = useState("")
  let [image, setImage] = useState("")
  let [desc, setDesc] = useState("")
  let navigate = useNavigate()

  const handleSubmit = async() =>{
      try{
          let response = await AxiosService.post(ApiRoutes.BLOG_APP.path,{image, title, desc})
          if(response.status === 201){
            toast.success("Blog posted successfully")
            console.log(response.data)
            navigate('/dashboard')
          }
      }
      catch(error){
          toast.error(error.response.message || "Internal Server Error")
      }
  }
  
  return <>
    <div className="display-grid">
      <div className="form-wrapper">
          <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Title" onChange={(e)=>setTitle(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" placeholder="Image URL" onChange={(e)=>setImage(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }} 
              onChange={(e)=>setDesc(e.target.value)}
              />
            </Form.Group>
          
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
      <div className="preview-wrapper mt-4">
        <h2>Preview</h2>
        <Feed 
          image={image}
          title={title}
          desc={desc}
        />
      </div>
    </div>
    
  </>
}

export default Create