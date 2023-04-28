import { useDispatch, useSelector } from "react-redux";
import { clearCart, addItem, getId, showModal } from "../utils/cartSlice";

const Modal = props => {
  let showModalUse = useSelector(store => store.cart.modalVisibility);

  const dispatch = useDispatch();

  const showModalHandler = () => {
    dispatch(showModal());
  };
  const startAfreshHandler = () => {
    dispatch(clearCart());
    dispatch(addItem(props.cartFood));
    dispatch(getId(props.id));
    showModalHandler();
  };

  const closeModal = () => {
    showModalHandler();
  };

  return (
    showModalUse && (
      <>
        <div className="modal-outside" onClick={closeModal}></div>
        <div className="modal-box">
          <div className="modal-container">
            <div className="modal-desc">
              <div className="modal-title">Items already in cart</div>
              <div className="modal-body">
                Your cart contains items from other restaurant. Would you like
                to reset your cart for adding items from this restaurant?
              </div>
            </div>
            <div className="modal-confirmation">
              <button className="modal-btn" onClick={closeModal}>
                NO
              </button>
              <button
                className="modal-btn btn-2-color"
                onClick={startAfreshHandler}
              >
                YES, START AFRESH
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Modal;
