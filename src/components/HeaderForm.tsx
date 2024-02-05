import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const HeaderForm = ({
  handleSubmit,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form
      data-testid="city-form"
      autoComplete="off"
      id="search-form"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <input
        data-testid="city-input"
        type="search"
        enterKeyHint="search"
        name="cityZip"
        placeholder="City or Zip..."
        aria-label="City or Zip Code Input"
        required
        onInvalid={(e) => {
          const target = e.target as HTMLInputElement;
          target.setCustomValidity("Please enter a valid city or zip code.");
        }}
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          target.setCustomValidity("");
        }}
      />
      <button
        data-testid="city-form-button"
        type="submit"
        aria-label="Submit Button for Search"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
};

export default HeaderForm;
