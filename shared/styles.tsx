import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        padding: 1rem;
        margin: 0;
        background: #ffefd5;
        min-height: 100%;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 24px;
      }

      section {
        border: 5px solid rgba(0, 0, 0, 0.1);
        padding: 1rem;
        margin: 1rem;
        text-align: center;
      }

      button {
        background-color: #3f6634;
        color: white;
        font-size: 0.8rem;
        border: none;
        border-bottom: 5px solid #345511;
        border-radius: 0.5rem;
        padding: 0.5rem;
        cursor: pointer;
        text-transform: uppercase;
        font-weight: bold;

        :hover {
          background-color: #345511;
        }

        :disabled {
          background-color: #242331;
          border-color: #09080c;
          cursor: not-allowed;
        }
      }

      label {
        font-size: 0.8rem;
        display: block;
      }

      input {
        font-size: 0.8rem;
        border: 1px solid #345511;
        border-bottom: 5px solid #345511;
        border-radius: 0.5rem;
        padding: 0.5rem;
        text-align: center;
      }
    `}
  />
);

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 1rem;
`;
