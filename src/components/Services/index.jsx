import React from "react";
import data from '../../data/services.json';
import Service from "./Service";
import Accordion from 'react-bootstrap/Accordion';


const Services = () => {
    const services = data.services;
  return <div>
      <Accordion defaultActiveKey={['0']}>
      {
          services.map(service=>{
              return <Service service={service} key={service.id} />
          })
      }
    </Accordion>
      
  </div>;
};

export default Services;
