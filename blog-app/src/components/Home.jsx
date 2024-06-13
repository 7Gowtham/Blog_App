import React, { useEffect, useState } from 'react'
import Feed from './common/Feed'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'

function Home() {
  let [data, setData] = useState([])

  const getData = async()=>{
    try {
      let response = await AxiosService.get(ApiRoutes.BLOG_APP.path)
      if(response.status===200){
          setData(response.data)
      }
    } catch (error) {
        toast(error.response.message || "Internal Server Error")
    }
    
  }

  useEffect(()=>{
    getData()
  },[])

  return <div className='home-wrapper'>
    {
      data.map((e)=>{
        return <div className='feeds'>
        <Feed 
        title={e.title}
        image={e.image}
        desc={e.desc}  
        />
        </div>
      })
    }
  </div>
}

export default Home