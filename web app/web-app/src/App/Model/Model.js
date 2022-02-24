import React from "react";
import './Model.scss';
import BookingPage from '../BookingPage/BookingPage'

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-container"  >
        {children}
<BookingPage></BookingPage>
        <a href="javascript:;" className="modal-close" onClick={handleClose}>
          close
        </a>
      </div>
    </div>
  );
};

export default Modal;
