import styled from "styled-components";

type Variant =
  | "primary"
  | "secondary"
  | "success"
  | "premium"
  | "destructive"
  | "disabled"
  | "standard";

export const Button = styled.button<{ variant?: Variant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem;
  font-size: 1rem;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #fff;

  &:disabled {
    cursor: no-drop;
    filter: brightness(0.8);
  }

  &:not(:disabled):active {
    filter: brightness(0.8);
  }

  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return `
              background: #0c73f5;
            `;
      case "secondary":
        return `
              background: #7828c8;
            `;
      case "success":
        return `
              background: #16c965;
            `;
      case "premium":
        return `
              background: linear-gradient(to right, red, blue);
            `;
      case "destructive":
        return `
              background: #ff0000;
            `;
      case "disabled":
        return `
              background: #373941;
            `;
      case "standard":
        return `
              background: #000;
            `;
      default:
        return `
              background: none;
              border: solid 1px #000;
              color: #000;
            `;
    }
  }}
`;
