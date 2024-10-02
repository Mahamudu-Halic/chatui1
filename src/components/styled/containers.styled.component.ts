import styled from "styled-components";

export const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentContainer = styled.div`
  border-radius: 12px;
  background-color: #ffffff;
  padding: 1rem;
  min-width: 300px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  z-index: 20;
  gap: 0.7rem;
  color: #000;
`;
