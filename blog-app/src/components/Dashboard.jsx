import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import toast from 'react-hot-toast';
import placeholder from '../assets/placeholder.jpeg'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';

function Dashboard() {
  let [data, setData] = useState([])
  let navigate = useNavigate()

  let getData = async() =>{
    try {
      let response = await AxiosService.get(ApiRoutes.BLOG_APP.path)
      if(response.status === 200){
        console.log(response)
        setData(response.data)
      }
    } catch (error) {
        toast(error.response.message || "Internal Server Error")
    }
  }

  useEffect(()=>{
    getData()
  },[])

  const handleDelete = async(id)=>{
    try {
      let response = await AxiosService.delete(`${ApiRoutes.BLOG_APP.path}/${id}`)
      if(response.status === 200){
        toast.success("Blog deleted successfully")
        getData()
      }
    } catch (error) {
        toast(error.response.message || "Internal Server Error")
    }
    
  }

  return <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Image</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((e,i)=>{
            return <tr key={i}>
              <td>{i+1}</td>
              <td>{e.title}</td>
              <td style={{"textAlign":"center"}} ><img src={e.image?e.image:placeholder} height={"100px"} width={"100px"}/></td>
              <td><div className='description'>{e.desc}</div></td>
              <td>
                <EditIcon onClick={()=>navigate(`/feed/${e.id}`)} />
                <DeleteIcon onClick={()=>handleDelete(e.id)}/>
              </td>
            </tr>
          })
        }
      </tbody>
    </Table>
  </>
}

export default Dashboard