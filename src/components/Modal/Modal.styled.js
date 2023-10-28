import styled from 'styled-components';

export const StyledWrapperOverlay = styled.div`
  position: fixed;

  inset: 0;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
`;

export const StyledWrapperModal = styled.div`
  max-width: 900px;
  max-height: 700px;
  position: relative;
  background-color: white;
  padding: 20px;
  overflow: hidden;
  max-width: 1000px;
  border-radius: 5px;
  img {
    width: 100%;
    max-height: 500px;
    object-fit: contain;
  }
  button {
    color: black;
    font-weight: bold;
    position: absolute;
    top: 1px;
    right: 1px;
    background-color: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
`;
