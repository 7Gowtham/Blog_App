import React from 'react'
import Card from 'react-bootstrap/Card';
import placeholder from '../../assets/placeholder.jpeg'

function Feed({image, title, desc}) {
  let dummyText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, aspernatur."
  return <>
    <Card style={{ width: '30rem' }}>
      <Card.Img variant="top" src={image?image:placeholder} />
      <Card.Body>
        <Card.Title>{title?title:"Title  Goes Here"}</Card.Title>
        <Card.Text>
          {desc?desc:dummyText}
        </Card.Text>
      </Card.Body>
    </Card>
  </>
}

export default Feed