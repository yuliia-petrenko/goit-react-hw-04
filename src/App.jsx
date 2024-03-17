import { useState, useEffect } from 'react';
import './App.css';
import { getPhotos } from './apiData/apiPhoto';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { VscSearchStop } from "react-icons/vsc";


function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    if (!query) return;

    const fetchPhotoData = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const { results, total_pages } = await getPhotos(query, page);
        if (results.length === 0) {
          setIsEmpty(true);
          return;
        }
        setImages(prevState => [...prevState, ...results]);
        setIsVisible(page < total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotoData();
  }, [query, page]);
  
  const loadMore = () => {
    setPage(prevState => prevState + 1);
  }
  const handleOpen = (url, alt) => {
    setIsOpen(true);
    setModalUrl(url);
    setModalAlt(alt);
  };
  const handleClose = () => {
    setIsOpen(false);
    setModalUrl('');
    setModalAlt('');
  }
  const handleSubmit = value => {
    setImages([]);
    setPage(1);
    setQuery(value);
    setError(false);
    setIsVisible(false);
    setIsEmpty(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} modalOpen={handleOpen} />
      )}
      {isVisible && (
        <LoadMoreBtn onClick={loadMore} disabled={isLoading}>
          {isLoading ? 'Loading' : 'Load more'}
        </LoadMoreBtn>
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {isEmpty && <p><VscSearchStop /> Sorry. There are no images ...</p>}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={handleClose}
        src={modalUrl}
        alt={modalAlt}
      />
    </div>
  );
}

export default App;
