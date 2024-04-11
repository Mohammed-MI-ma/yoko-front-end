import React, { useState } from "react";
import Autosuggest from "react-autosuggest";

// Example list of suggestions
const suggestions = [
  "Apple",
  "Banana",
  "Cherry",
  "Grape",
  "Lemon",
  "Orange",
  "Peach",
  "Pear",
];

const RecommendationInput = () => {
  const [value, setValue] = useState("");
  const [suggestionsList, setSuggestionsList] = useState([]);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestionsList(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestionsList([]);
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : suggestions.filter(
          (suggestion) =>
            suggestion.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

  const inputProps = {
    placeholder: "Type a fruit",
    value,
    onChange: onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestionsList}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default RecommendationInput;
