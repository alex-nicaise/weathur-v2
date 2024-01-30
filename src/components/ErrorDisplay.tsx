import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useErrorContext } from "../lib/Context/ErrorContext";
import {
  faCircleExclamation,
  faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";

const ErrorDisplay = () => {
  const { appError } = useErrorContext();

  if (appError.name == "TypeError") {
    return (
      <div id="error-message">
        <p>
          <FontAwesomeIcon icon={faCircleExclamation} />
          &nbsp; Please provide a valid city or zip code.
        </p>
      </div>
    );
  }
  return (
    <div id="error-message">
      <p>
        <FontAwesomeIcon icon={faFaceFrown} />
        &nbsp; Something went wrong!
      </p>
    </div>
  );
};

export default ErrorDisplay;
