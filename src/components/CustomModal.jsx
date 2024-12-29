import Modal from "react-modal";

const CustomModal = ({ isOpen, onClose, children }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return(
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    style={customStyles}
    contentLabel="Example Modal"
  >
      {children}
  </Modal>)
};

export default CustomModal;
