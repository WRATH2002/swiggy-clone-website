import { FETCH_CANCELLATION_IMG_URL } from "../components/Constant";

const CancellationPolicy = () => {
  return (
    <div className="instamart-font cancellation-wrapper">
      <div className="cancellation-head">
        Review your order and address details to avoid cancellations
      </div>
      <div className="cancellation ">
        <img src={FETCH_CANCELLATION_IMG_URL + "Cancellations60Seconds"} />
        <span className="cancellation-body">
          If you choose to cancel, you can do it within 60 seconds after placing
          the order.
        </span>
      </div>
      <div className="cancellation">
        <img src={FETCH_CANCELLATION_IMG_URL + "CancellationsFee"} />
        <span className="cancellation-body">
          Post 60 seconds, you will be charged a 100% cancellation fee.
        </span>
      </div>
      <div className="cancellation">
        <img src={FETCH_CANCELLATION_IMG_URL + "CancellationException"} />
        <span className="cancellation-body">
          However, in the event of an unusual delay of your order, you will not
          be charged a cancellation fee.
        </span>
      </div>
      <div className="cancellation">
        <img src={FETCH_CANCELLATION_IMG_URL + "CancellationCompensation"} />
        <span className="cancellation-body">
          This policy helps us avoid food wastage and compensate restaurants /
          delivery partners for their efforts.
        </span>
      </div>
      <span className="cancellation-bottom">
        <a>Read cancellation policy</a>
      </span>
    </div>
  );
};

export default CancellationPolicy;
