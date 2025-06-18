import React, { useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../../context/AppContext";
import {
  Trash,
  ShoppingBag,
  FlowerLotus,
  Sparkle,
  ShareNetwork,
} from "phosphor-react";
import { motion, AnimatePresence } from "framer-motion";
import { breakpoints } from "../../utils/theme";
import jsPDF from "jspdf";
import { useRef } from "react";
import logo from "../../assets/logo_pdf.JPG";
import { Modal } from "react-bootstrap";

const Cart = () => {
  const [showModal, setShowModal] = useState(false);
  const [clientName, setClientName] = useState("");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const { itemsOnCart, setItemsOnCart } = useAppContext();
  const cartRef = useRef();

  const total = itemsOnCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleGeneratePDF = () => {
    handleCloseModal();

    if (!clientName || clientName.trim().length < 2) {
      alert("Por favor, escribe un nombre válido para el cliente");
      return;
    }

    const doc = new jsPDF();
    const img = new Image();
    img.src = logo; // logo importado

    img.onload = () => {
      // === Banner ===
      const bannerWidth = 180;
      const bannerHeight = bannerWidth * (420 / 1620); // proporción del banner
      const marginX = (210 - bannerWidth) / 2;
      doc.addImage(img, "PNG", marginX, 10, bannerWidth, bannerHeight);

      const afterBannerY = 10 + bannerHeight + 10;

      // === Título ===
      doc.setFont("times", "bolditalic");
      doc.setFontSize(20);
      doc.text("Presupuesto", 105, afterBannerY, { align: "center" });

      // === Datos cliente ===
      doc.setFont("helvetica", "");
      doc.setFontSize(12);
      doc.text(`Cliente: ${clientName}`, 105, afterBannerY + 10, {
        align: "center",
      });
      doc.text(
        `Fecha: ${new Date().toLocaleDateString("es-MX")}`,
        105,
        afterBannerY + 18,
        {
          align: "center",
        }
      );

      // === Línea ===
      doc.setDrawColor(180);
      doc.line(20, afterBannerY + 24, 190, afterBannerY + 24);

      // === Tabla ===
      let startY = afterBannerY + 35;
      doc.setFont("helvetica", "bold");
      doc.text("Servicio", 20, startY);
      doc.text("Precio", 90, startY);
      doc.text("Cantidad", 130, startY);
      doc.text("Subtotal", 170, startY);
      doc.line(20, startY + 2, 190, startY + 2);
      startY += 10;

      // === Items ===
      doc.setFont("helvetica", "");
      itemsOnCart.forEach((item) => {
        const subtotal = item.price * item.quantity;
        doc.text(item.name, 20, startY);
        doc.text(`$${item.price}`, 90, startY);
        doc.text(`${item.quantity}`, 130, startY);
        doc.text(`$${subtotal}`, 170, startY);
        startY += 10;
      });

      // === Total ===
      doc.setFont("helvetica", "bold");
      doc.text("Total:", 130, startY + 10);
      doc.text(`$${total}`, 170, startY + 10);

      // === Pie de página ===
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(
        "Contacto: 312 169 4199   |   Instagram: @karla_solisnails",
        105,
        285,
        {
          align: "center",
        }
      );

      // === Mostrar PDF y asignar nombre ===
      const pdfBlob = doc.output("blob");
      const blobUrl = URL.createObjectURL(pdfBlob);

      // Crea descarga directa
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `Presupuesto-${clientName}.pdf`;
      link.click();

      // === Nombre personalizado para descarga desde visor ===
      const date = new Date().toLocaleDateString("es-MX").replace(/\//g, "-");
      link.href = blobUrl;
      link.download = `Presupuesto-${clientName}-${date}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };

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
    <CartContainer ref={cartRef}>
      <CartTitle>
        <ShoppingBag size={20} />
        <span className="mx-2">Mis Servicios</span>
      </CartTitle>
      <CartDivider />

      <AnimatePresence>
        {itemsOnCart.map((item) => {
          const isDecoration = item.id.startsWith("e");
          const handleRemove = () => {
            setItemsOnCart((prev) => prev.filter((i) => i.id !== item.id));
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
                    <span style={{ fontSize: "1.2rem" }}>{item.name}</span>
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
                    {isDecoration ? (
                      <QuantityWrapper>
                        <QtyButton
                          onClick={() =>
                            setItemsOnCart((prev) =>
                              prev.map((i) =>
                                i.id === item.id && i.quantity > 1
                                  ? { ...i, quantity: i.quantity - 1 }
                                  : i
                              )
                            )
                          }
                        >
                          −
                        </QtyButton>
                        <span>{item.quantity}</span>
                        <QtyButton
                          onClick={() =>
                            setItemsOnCart((prev) =>
                              prev.map((i) =>
                                i.id === item.id
                                  ? { ...i, quantity: i.quantity + 1 }
                                  : i
                              )
                            )
                          }
                        >
                          +
                        </QtyButton>
                      </QuantityWrapper>
                    ) : (
                      <span className="fw-semibold">Cantidad: 1</span>
                    )}

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

      <ShareOutlineButton onClick={handleOpenModal}>
        <ShareNetwork size={18} />
        Compartir
      </ShareOutlineButton>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <StyledModalBody>
          <h5 className="modal-title">Nombre del cliente</h5>
          <InputStyled
            type="text"
            placeholder="Ej. María González"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
          <Actions>
            <GhostButton onClick={handleCloseModal}>Cancelar</GhostButton>
            <PrimaryButton
              onClick={handleGeneratePDF}
              disabled={clientName.trim().length < 1}
            >
              Compartir PDF
            </PrimaryButton>
          </Actions>
        </StyledModalBody>
      </Modal>
    </CartContainer>
  );
};

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #eee5d0;
  border-radius: 8px;
  padding: 2px 8px;
  gap: 10px;
  font-weight: 600;
  font-size: 1rem;
`;

const QtyButton = styled.button`
  background: none;
  border: none;
  color: #2e4a2d;
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 6px;

  &:hover {
    background-color: #e8dcc0;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
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

const ShareOutlineButton = styled.button`
  margin-top: 20px;
  background: transparent;
  color: #5d6f55;
  font-family: "Playfair Display", serif;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.6rem 1.2rem;
  border: 2px solid #5d6f55;
  border-radius: 999px; /* estilo cápsula */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #f1f5ef;
  }

  svg {
    stroke-width: 1.5;
  }
`;

const StyledModalBody = styled(Modal.Body)`
  background-color: #fcf9f2;
  padding: 2rem;
  border-radius: 1.5rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  .modal-title {
    font-family: "Playfair Display", serif;
    font-size: 1.3rem;
    margin-bottom: 1.2rem;
    color: #333;
  }
`;

const InputStyled = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  font-family: "Lora", serif;
  border-radius: 0.9rem;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  color: #333;

  &::placeholder {
    color: #aaa;
    font-style: italic;
  }
`;

const Actions = styled.div`
  margin-top: 1.8rem;
  display: flex;
  justify-content: space-between;
`;

const PrimaryButton = styled.button`
  background-color: #2e4a2d;
  color: white;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  padding: 0.6rem 1.4rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #263e25;
  }
  &:disabled {
    background-color: #b7c1b5;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const GhostButton = styled.button`
  background: none;
  border: none;
  font-family: "Inter", sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
  color: #5c5c5c;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default Cart;
