import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Section = ({ heading, description, isVisible, setIsVisible }) => {
  // const [isVisible, setIsVisible] = useState(false);
  const show = () => setIsVisible(!isVisible);

  return (
    <>
      <div className="accordion" onClick={show}>
        <div className="instamart-show">
          <button className="btn-accordion">
            {isVisible ? (
              <FontAwesomeIcon icon={faChevronDown} />
            ) : (
              <FontAwesomeIcon icon={faChevronRight} />
            )}
          </button>
          <h5 className="instamart-font">{heading}</h5>
        </div>
        {isVisible && (
          <h6 className="instamart-font instamart-description">
            {description}
          </h6>
        )}
      </div>
      <hr className="hr-class"></hr>
    </>
  );
};

export default Section;
