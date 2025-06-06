import React, { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import styled from "styled-components";
import { CaretDown, CaretUp, Leaf, Plus } from "phosphor-react";
import { AccordionContext } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap";
import { useAppContext } from "../../../context/AppContext";

const Service = ({ service }) => {
  const { id, name, items } = service;
  const { activeEventKey } = useContext(AccordionContext);

  const isActive = activeEventKey === id;
  return (
    <AccordionItemContainer eventKey={id}>
      <CustomHeader eventKey={id} isActive={isActive}>
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div>
            <Leaf size={30} />
            <span
              className="mx-3 "
              style={{ fontSize: "1.5rem", fontWeight: "600" }}
            >
              {name}
            </span>
          </div>
          {isActive ? <CaretUp size={20} /> : <CaretDown size={20} />}
        </div>
      </CustomHeader>

      <AccordionBodyContainer>
        {items.map((item, idx) => (
          <React.Fragment key={item.id}>
            <Item item={item} />
            {idx !== items.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </AccordionBodyContainer>
    </AccordionItemContainer>
  );
};
const Item = ({ item }) => {
  const { name, price } = item;
  const { setItemsOnCart, itemsOnCart } = useAppContext();

  const handleAdd = () => {
    const exists = itemsOnCart.find((i) => i.id === item.id);
    if (!exists) {
      setItemsOnCart([...itemsOnCart, item]);
    }
  };

  return (
    <StyledItem>
      <div className="name">{name}</div>
      <div className="actions">
        <div className="price">${price}</div>
        <AddButton onClick={handleAdd}>
          <Plus size={14} />
          <span className="mx-2">Agregar</span>
        </AddButton>
      </div>
    </StyledItem>
  );
};

const AccordionItemContainer = styled(Accordion.Item)`
  background: transparent;
  border: none;
  box-shadow: none;
  margin-bottom: 0.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const AccordionBodyContainer = styled(Accordion.Body)`
  background: #f5f0e5;
  border-radius: 20px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  padding: 1rem;
`;

const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;

  &:hover {
    background-color: #f0e6d2; /* tono crema claro */
    box-shadow: 0 2px 8px rgba(187, 165, 108, 0.2); /* reflejo dorado */
  }

  .info {
    flex: 1;
  }

  .name {
    font-weight: 600;
    font-size: 1.15rem;
    color: #2b2b2b;
  }

  .actions {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 0.3rem;
    align-items: center;
    justify-content: center;
  }

  .price {
    margin-right: 20px;
    font-family: "Playfair Display", serif;
    font-weight: 600;
    font-size: 1.5rem;
  }
`;

const AddButton = styled.button`
  background: #d8b981;
  border: none;
  border-radius: 0.4rem;
  padding: 0.4rem 0.9rem;
  font-size: 1rem;
  font-weight: 500;
  color: #1f1f1f;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;

  &:hover {
    background: #e2d8b8;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 0.5rem 0;
`;

const CustomHeader = ({ children, eventKey, isActive }) => {
  const toggleAccordion = useAccordionButton(eventKey);

  return (
    <StyledHeader isActive={isActive} onClick={toggleAccordion}>
      {children}
    </StyledHeader>
  );
};
const StyledHeader = styled(Accordion.Header).attrs({ as: "div" })`
  all: unset;
  cursor: pointer;
  width: 100%;
  background-color: ${({ isActive }) => (isActive ? "#f3e8c4" : "#e3e0c7")};
  padding: 1rem;
  border-radius: 20px;
  border-bottom-right-radius: ${({ isActive }) => (isActive ? "0" : "20px")};
  border-bottom-left-radius: ${({ isActive }) => (isActive ? "0" : "20px")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 1.2rem;
  color: #1f1f1f;
  box-sizing: border-box;

  .left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  svg {
    color: #bba56c;
  }
`;

export default Service;
