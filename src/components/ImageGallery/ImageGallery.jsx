import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { StyledImgListUl } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, toggleModal }) => {
  return (
    <div>
      <StyledImgListUl>
        {images?.map(image => (
          <ImageGalleryItem
            key={image.id}
            {...image}
            toggleModal={toggleModal}
          />
        ))}
      </StyledImgListUl>
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      webformatURL: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  toggleModal: PropTypes.func.isRequired,
};
