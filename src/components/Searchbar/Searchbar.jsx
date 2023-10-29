import { StyledSearchForm, StyledSearchInput } from './Searchbar.styled';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const Searchbar = ({ loading, query, setSearch }) => {
  const [searchStr, setSearchStr] = useState('');

  const handleOnSubmit = e => {
    e.preventDefault();
    if (!searchStr.trim()) {
      return;
    }
    setSearch(searchStr);
    setSearchStr('');
  };

  const handleOnChangeInput = e => {
    setSearchStr(e.target.value);
  };

  return (
    <header>
      <StyledSearchForm onSubmit={handleOnSubmit}>
        <button
          type="submit"
          disabled={
            loading ||
            searchStr.trim() === '' ||
            query.trim() === searchStr.trim()
          }
        >
          <span>Search</span>
        </button>

        <StyledSearchInput
          onChange={handleOnChangeInput}
          type="search"
          placeholder="Search images and photos"
          disabled={loading}
        />
      </StyledSearchForm>
    </header>
  );
};

Searchbar.propTypes = {
  setSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
};
