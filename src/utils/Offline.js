const Offline = () => {
  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="reload-page">
      <center>
        <div className="offline-desc-1 instamart-font">Connection Error</div>
        <div className="offline-desc-2 instamart-font">
          Please check your internet connection and try again
        </div>
        <button className="reload-btn instamart-font" onClick={reload}>
          RELOAD
        </button>
      </center>
    </div>
  );
};

export default Offline;
