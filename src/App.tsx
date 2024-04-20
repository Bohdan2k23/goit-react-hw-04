

import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import requestPictures from './lib/requestPictures';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import SearchBar from './components/SearchBar/SearchBar';

import "ldrs/hourglass";

export default function App(){
  const [searchQuery, setSearchQuery] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>("");

  useEffect(() => {
    if (!searchQuery || searchQuery === null) {
      setLoadMore(false);
      setIsModalOpen(false);
      setIsError(false);
      return;
    }

    async function fetchPicturesByQuery() {
      try {
        setLoadMore(false);
        setIsError(false);
        setIsModalOpen(false);
        setIsLoading(true);

        const data = await requestPictures(searchQuery, page);

        if (data.total === 0) {
          toast.error("Images not found")
          return;
        }

        if (data.total_pages > page) {
          setLoadMore(true);
        }

        setPictures(prevState => prevState.concat(data.results));
      } catch (err) {
        setIsError(true);
        toast.error("222")
      } finally {
        setIsLoading(false);
      }
    }

    fetchPicturesByQuery();
  }, [searchQuery, page]);

  const modal = {
    open() {
      setIsModalOpen(true);
    },
    close() {
      setSelectedImage(null);
      setIsModalOpen(false);
    }
  }

  const handleSearchQuery = query => {
    setSearchQuery(query);
    setPage(1);
    setPictures([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = image => {
    setSelectedImage(image);
    modal.open();
  };



  

  return (
    <>
    <Toaster position="top-right" />

      <SearchBar onSubmit={handleSearchQuery} />
      {isError && <ErrorMessage msg='error' />}
      <ImageGallery pictures={pictures} onClick={handleImageClick} />
      {isLoading && <l-hourglass
          size="40"
          bg-opacity="0.1"
          speed="1.75"
          color="black"
        ></l-hourglass>}
      {loadMore && <LoadMoreBtn loadMore={handleLoadMore} />}
      {isModalOpen && (
        <ImageModal
          src={selectedImage}
          onClose={modal.close}
          isOpen={isModalOpen}
        />
      )}
      
    </>
  );
};

function ErrorMessage({ msg }: { msg: string }) {
  return (
    <div>{msg}</div>
  )
  
}
