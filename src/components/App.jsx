import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { toast } from 'react-toastify';
import { fetchImages } from 'services/image-api';
import { InfinitySpin } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';

class App extends Component {
  state = {
    isOpen: false,
    loading: false,
    first_load: false,
    dataModal: null,
    error: null,
    total: null,
    images: [],
    per_page: 12,
    page: 1,
    q: '',
  };

  async componentDidMount() {
    this.state.first_load = true;
    const { per_page, page } = this.state;
    this.getImages({ per_page, page });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { per_page, page, q } = this.state;
    if (q !== prevState.q || page !== prevState.page) {
      this.getImages({ per_page, page, q });
    }
  }

  getImages = async params => {
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

  render() {
    const { images, total, loading, isOpen, dataModal, q } = this.state;

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
        <Searchbar
          setSearch={this.handleSetSearch}
          loading={loading}
          query={q}
        />

        <ImageGallery images={images} toggleModal={this.handleToggleModal} />

        {total > images.length && !loading && (
          <Button onClick={this.handleOnLoadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load more'}
          </Button>
        )}

        {loading && <InfinitySpin width="200" color="#4fa94d" />}

        {isOpen && dataModal ? (
          <Modal close={this.handleToggleModal}>
            <img src={dataModal} alt="Large size img" />
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default App;
