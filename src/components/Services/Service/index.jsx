import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import styled from 'styled-components';




const Service = ({service}) => {

    const {id,name,items} = service;
  return (<Accordion.Item eventKey={id}>
        <Accordion.Header>{name}</Accordion.Header>
        <Accordion.Body>
          {items.map(item=><Item item={item} key={item.id}/>)}
        </Accordion.Body>
      </Accordion.Item>)
  ;
};

const Item = ({item})=>{
    const {name,description,price}= item
return <div >
    <div>
    <div>{name}</div>
    <div>{description}</div>
    <div>{price}</div>
    </div>
    <div>
        <button>+</button>
    </div>

</div>

}

export default Service;
