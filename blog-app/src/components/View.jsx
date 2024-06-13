import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Feed from './common/Feed';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';

function View() {
  let [title, setTitle] = useState("")
  let [image, setImage] = useState("")
  let [desc, setDesc] = useState("")
  let navigate = useNavigate()
  let {id} = useParams()

  const getData = async(id) =>{
    try {
        let response = await AxiosService.get(`${ApiRoutes.BLOG_APP.path}/${id}`)
        
        if(response.status === 200){
          setTitle(response.data.title)
          setImage(response.data.image)
          setDesc(response.data.desc)
        }


    } catch (error) {
        toast.error(error.response.message || "Internal Server Error")
    }
  }

  useEffect(()=>{
    if(id){
      getData(id)
    }
  },[])

  const handleSubmit = async() =>{
      try{
          let response = await AxiosService.put(`${ApiRoutes.BLOG_APP.path}/${id}`,{image, title, desc})
          if(response.status === 200){
            toast.success("Blog Edited successfully")
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
            <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" placeholder="Image URL" value={image} onChange={(e)=>setImage(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }} 
              onChange={(e)=>setDesc(e.target.value)}
              value={desc}
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

export default View