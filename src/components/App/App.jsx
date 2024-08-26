import { useState, useEffect } from "react";
import { fetchPhotos } from "../../photo-api";
import PhotoGallery from "./PhotoGallery/PhotoGallery";
import SearchBar from "./SearchBar/SearchBar";
import ErrorHTTP from "./ErrorHTTP/ErrorHTTP";
import Loader from "./Loader/Loader";
import LoadMoreButton from "./LoaderMoreBtn/LoaderMoreBtn";
import PhotoModal from "./PhotoModal/PhotoModal";



const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");

  useEffect(() => {
    async function getPhotos() {
      if (searchQuery === "") return;
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchPhotos(searchQuery, page);
        setPhotos((prevPhotos) => [...prevPhotos, ...data]);
        
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getPhotos();
  }, [searchQuery, page]);

  const handleSearch = (newQuery) => {
    setSearchQuery(newQuery);
    setPage(1);
    setPhotos([]);
  };

  const handleClickMore = () => {
    setPage(page + 1);
  };

  

  const closeModal = ()=> {
    setModalIsOpen(false);
  }

  const handleImgClick = (imageUrl)=>{
    setModalIsOpen(true);
    setSelectedImg(imageUrl)
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorHTTP />}
      {photos.length > 0 && <PhotoGallery items={photos} onImgClick={handleImgClick}/>}
      {!isLoading && photos.length > 0 && (
        <LoadMoreButton onClick={handleClickMore} />
      )}
      {isLoading && <Loader />}
      <PhotoModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        imageUrl={selectedImg}
      />
    </div>
  );
};

export default App;
