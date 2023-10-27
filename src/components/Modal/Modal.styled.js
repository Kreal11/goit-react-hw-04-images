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
  /* position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  /* background-color: rgba(0, 0, 0, 0.8);
  z-index: 3;  */
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
    /* aspect-ratio: 16/9; */
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

  /* max-width: calc(100vw - 48px);
  max-height: calc(100vh - 48px);
  overflow: hidden;
  position: relative;
  top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    position: relative;
    top: 30px;
    left: 200px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    aspect-ratio: 16/9;
  } */
`;
