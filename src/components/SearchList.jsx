/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

const SearchList = ({ data, id }) => {
  const navigate = useNavigate();
  const handleWordClick = (word) => {
    navigate(`/word/${word}/id/${id}`);
  };

  return (
    <li
      onClick={() => handleWordClick(data.word)}
      className="bg-white px-2 py-2 rounded-md"
    >
      {data.word}
    </li>
  );
};

export default SearchList;