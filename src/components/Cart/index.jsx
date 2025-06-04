import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../context/AppContext";
import { Trash, ShoppingBag, FlowerLotus, Sparkle } from "phosphor-react";
import { motion, AnimatePresence } from "framer-motion";
import { breakpoints } from "../../utils/theme";

const Cart = () => {
  const { itemsOnCart, setItemsOnCart } = useAppContext();

  const total = itemsOnCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (itemsOnCart.length < 1) {
    return (
      <CartContainer className="d-flex align-items-center justify-content-center">
        <motion.div
          className="d-flex flex-column justify-content-center align-items-center p-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Sparkle size={60} />
          <span className="text-center fs-4 mt-2">¡Servicio agregado!</span>
          <span
            className="text-center text-muted mt-4"
            style={{ fontSize: "14px" }}
          >
            Explora y agrega lo que más te guste
          </span>
        </motion.div>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartTitle>
        <ShoppingBag size={20} />
        <span className="mx-2">Mis Servicios</span>
      </CartTitle>
      <CartDivider />

      <AnimatePresence>
        {itemsOnCart.map((item) => {
          const handleRemove = () => {
            setItemsOnCart((prev) => prev.filter((i) => i.id !== item.id));
          };

          const handleQuantityChange = (e) => {
            const newQty = Math.max(1, parseInt(e.target.value) || 1);
            setItemsOnCart((prev) =>
              prev.map((i) =>
                i.id === item.id ? { ...i, quantity: newQty } : i
              )
            );
          };

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <CartItem>
                <div className="d-flex flex-column w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{item.name}</span>
                    <div className="d-flex align-items-center gap-2">
                      <span className="fw-bold">
                        ${item.price * item.quantity}
                      </span>
                      <Trash
                        size={14}
                        weight="bold"
                        className="remove"
                        onClick={handleRemove}
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <InputQuantity
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={handleQuantityChange}
                    />
                    <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                      ${item.price} x {item.quantity}
                    </span>
                  </div>
                </div>
              </CartItem>

              <DividerDecorative />
            </motion.div>
          );
        })}
      </AnimatePresence>

      <PayButton>
        <span>Total:</span>
        <span>${total}</span>
      </PayButton>
    </CartContainer>
  );
};

const InputQuantity = styled.input`
  width: 48px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 6px;
  text-align: center;
  font-weight: 500;
  font-size: 0.9rem;
`;

const DividerDecorative = () => (
  <StyledDivider>
    <hr />
    <FlowerLotus size={20} weight="fill" />
    <hr />
  </StyledDivider>
);

const StyledDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-bottom: 20px;

  hr {
    flex: 1;
    border: none;
    border-top: 1px solid #bfc8a2;
  }

  svg {
    color: #bfc8a2;
    opacity: 40%;
  }
`;

const CartContainer = styled.div`
  background: #f8f2e1;
  border-radius: 1.25rem;
  padding: 2rem;
  width: 100%;
  max-width: 300px;

  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  @media (min-width: ${breakpoints.sm}) {
    max-width: 400px;
  }
  @media (min-width: ${breakpoints.md}) {
    margin-left: 20px;
  }
`;

const CartTitle = styled.h2`
  font-size: 1.7rem;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartDivider = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 1rem 0;
`;

const CartItem = styled.div`
  margin-top: 0.5rem;

  .remove {
    color: #bba56c;
    cursor: pointer;
  }
`;

const PayButton = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.9rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background: #2e4a2d;
  border: none;
  border-radius: 1rem;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: space-between;

  &:before {
    content: "";
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.5rem;
    height: 1.5rem;
    background-image: url("/leaf-icon.svg");
    background-size: cover;
  }
`;

export default Cart;
