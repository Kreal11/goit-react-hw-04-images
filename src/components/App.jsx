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
  const [perPage, setPerPage] = useState(12);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  // async componentDidMount() {
  //   this.state.first_load = true;
  //   const { per_page, page } = this.state;
  //   this.getImages({ per_page, page });
  // }

  useEffect(() => {
    setFirstLoad(true);
    getImages(perPage, page);
  }, [perPage, page]);

  // async componentDidUpdate(prevProps, prevState) {
  //   const { per_page, page, q } = this.state;
  //   if (q !== prevState.q || page !== prevState.page) {
  //     this.getImages({ per_page, page, q });
  //   }
  // }

  // useEffect(() => {
  //   if()
  // },[])

  const getImages = async params => {
    const { first_load, q, page } = this.state;
    this.setState({ loading: true });
    try {
      const { hits, totalHits } = await fetchImages(params);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        total: totalHits,
      }));
      if (first_load || (q && page === 1)) {
        toast.success(`We found ${totalHits} images`);
      }
      this.state.first_load = false;
    } catch (error) {
      toast.error('Oops, something went wrong');
    } finally {
      this.setState({ loading: false });
    }
  };

  handleOnLoadMore = () => {
    this.setState({ loading: true });
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleSetSearch = q => {
    this.setState({ q, images: [], page: 1 });
  };

  handleToggleModal = largeImageURL => {
    this.setState(prev => ({ isOpen: !prev.isOpen, dataModal: largeImageURL }));
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
      <Searchbar setSearch={handleSetSearch} loading={loading} query={q} />

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
