import Modal from "react-modal";


const customStyles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.75)",
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');

const PhotoModal = ({onRequestClose, isOpen, imageUrl})=> {

    return(
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel="Example Modal">
            <img src={imageUrl} alt="Large view"/>
        </Modal>
    )
}



export default PhotoModal;