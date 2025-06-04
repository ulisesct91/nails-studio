import React,{useState} from "react";
import Services from "../Services";
import Cart from "../Cart";
import styled from 'styled-components';


const NailsStudio = () => {
const [itemsOnCart,setItemsOnCart] = useState([])


  return <NailsStudioContainer>
    <Services controller={setItemsOnCart}/>
    <Cart items={itemsOnCart} controller={setItemsOnCart}/>
  </NailsStudioContainer>;
};

const NailsStudioContainer = styled.div`
display:flex;
`

export default NailsStudio;
