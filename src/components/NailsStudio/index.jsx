import React from "react";
import Services from "../Services";
import Cart from "../Cart";
import styled from "styled-components";
import { AppContextProvider } from "../../context/AppContext";
import { breakpoints } from "../../utils/theme";

const NailsStudio = () => {
  return (
    <AppContextProvider>
      <NailsStudioContainer>
        <LogoContainer>
          <img src="/img/logo.png" alt="Logo" />
          <span>NAILS STUDIO</span>
          <span className="name">by Karla Solis</span>
        </LogoContainer>
        <Layout>
          <Services />
          <StickyCart />
        </Layout>
      </NailsStudioContainer>
    </AppContextProvider>
  );
};

const StickyCart = styled(Cart)`
  align-self: flex-start;
`;
const Layout = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 3rem;
  width: 100%;
  justify-content: center;
  align-items: center;

  @media (min-width: ${breakpoints.lg}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const NailsStudioContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #bfc8a2;
  background-image:
    radial-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 0),
    radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 0),
    repeating-conic-gradient(
      from 45deg,
      rgba(0, 0, 0, 0.02) 0deg 90deg,
      transparent 90deg 180deg
    );
  background-position:
    0 0,
    10px 10px,
    center;
  background-size:
    20px 20px,
    20px 20px,
    80px 80px;
  min-height: 100vh;
  align-items: center;
  padding-top: 30px;
`;
const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  gap: 4px; 

  img {
    width: 180px; /* levemente más chico para móviles o balance visual */
    height: auto;
  }

  span {
    font-size: 14px;
    font-family: 'Playfair Display', serif;
    letter-spacing: 4px;
    font-weight: 600;
    text-transform: uppercase;
    margin-top: 4px;
  }

  .name {
    font-family: 'Cormorant', serif;
    font-weight: 400;
    letter-spacing: normal;
    margin-top: 2px;
    font-size: 20px;
  font-style: italic;
  text-transform: none;
  letter-spacing: 0.3px;
}
  }

  @media (max-width: 768px) {
    img {
      width: 140px;
    }
    span {
      font-size: 12px;
      letter-spacing: 2px;
    }
    .name {
      font-size: 14px;
    }
  }
`;

export default NailsStudio;
