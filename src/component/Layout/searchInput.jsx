import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GetGoods from "../../hooks/getGoods";
import searchContext from "../../modules/context/searchContext";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchShow from "./searchShow";

const SearchInput = () => {
  const { changeSearchText } = useContext(searchContext);
  const navigate = useNavigate();
  const { searchHintGoods } = GetGoods();
  const [inputValue, setInputValue] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    changeSearchText(e.target.value);
  };

  const handleSearch = () => {
    navigate("/searcher", { state: { arr: searchHintGoods } });
  };

  const handleClear = () => {
    setInputValue('');
    changeSearchText('');
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prevIndex) => Math.min(prevIndex + 1, searchHintGoods.length - 1));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < searchHintGoods.length) {
        navigate(`/product?id=${searchHintGoods[activeIndex].id}`);
      } else {
        handleSearch();
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputValue]);

  return (
    <div>
      <TextField
        placeholder="Искать товары и категории"
        variant="outlined"
        fullWidth
        size="small"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
        style={{ width: '650px', height: '4vh' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {inputValue && (
                <IconButton onClick={handleClear}>
                  <ClearIcon />
                </IconButton>
              )}
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      {searchHintGoods.length !== 0 && (
        <SearchShow activeIndex={activeIndex} />
      )}
    </div>
  );
};

export default SearchInput;
