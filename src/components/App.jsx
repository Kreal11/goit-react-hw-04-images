import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { toast } from 'react-toastify';
import { fetchImages } from 'services/image-api';
import { InfinitySpin } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';
import { useEffect, useState } from 'react';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(null);
  const [images, setImages] = useState([]);
  const [perPage] = useState(12);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getImages = async params => {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await fetchImages(params);
        setImages(prev => [...prev, ...hits]);
        setTotal(totalHits);
        if (hits.length === 0 && page === 1) {
          toast.warning('There are no images by this search point word');
        } else if (page === 1) {
          toast.success(`We found ${totalHits} images`);
        }
      } catch (err) {
        setError(err.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
        setFirstLoad(false);
      }
    };

    if (query) {
      getImages({ per_page: perPage, page, q: query });
    } else {
      getImages({ per_page: perPage, page });
    }
  }, [error, perPage, page, query, firstLoad]);

  const handleOnLoadMore = () => {
    setIsLoading(true);
    setPage(prev => prev + 1);
  };

  const handleSetSearch = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const handleToggleModal = largeImageURL => {
    setIsOpen(prev => !prev);
    setDataModal(largeImageURL);
  };

  return (
    <div
      style={{
        padding: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Searchbar setSearch={handleSetSearch} loading={loading} query={query} />

      <ImageGallery images={images} toggleModal={handleToggleModal} />

      {total > images.length && !loading && (
        <Button onClick={handleOnLoadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load more'}
        </Button>
      )}

      {loading && <InfinitySpin width="200" color="#4fa94d" />}

      {isOpen && dataModal ? (
        <Modal close={handleToggleModal}>
          <img src={dataModal} alt="Large size img" />
        </Modal>
      ) : null}
    </div>
  );
};

export default App;
