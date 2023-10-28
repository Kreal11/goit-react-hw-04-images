import { toast } from 'react-toastify';
import { StyledWrapperModal, StyledWrapperOverlay } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ close, children }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        close();
        toast.info('Modal was closed by Escape');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [close]);

  // componentDidMount() {
  //   document.addEventListener('keydown', this.handleKeyDown);
  //   document.body.style.overflow = 'hidden';
  // }

  // componentWillUnmount() {
  //   document.body.style.overflow = 'visible';
  //   document.removeEventListener('keydown', this.handleKeyDown);
  // }

  const handleClickOut = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      close();
    }
  };

  return (
    <StyledWrapperOverlay onClick={handleClickOut}>
      <StyledWrapperModal>
        <button onClick={close}>✖️</button>
        {children}
      </StyledWrapperModal>
    </StyledWrapperOverlay>
  );
};

Modal.propTypes = {
  close: PropTypes.func.isRequired,
};
