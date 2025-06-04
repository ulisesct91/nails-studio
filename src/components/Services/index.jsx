import React from "react";
import data from '../../data/services.json';
import Service from "./Service";
import Accordion from 'react-bootstrap/Accordion';
import styled from "styled-components";


const Services = () => {
    const services = data.services;
  return <div>
    
      <StyledAccordion defaultActiveKey={1}>
      {
          services.map(service=>{
              return <Service service={service} key={service.id} />
          })
      }
    </StyledAccordion>
      
  </div>;
};

const StyledAccordion = styled(Accordion)`
  width: 500px;
  box-sizing:border-box;
  background: transparent;
  border: none;
  box-shadow: none;
  flex-grow:1;
`;



export default Services;
