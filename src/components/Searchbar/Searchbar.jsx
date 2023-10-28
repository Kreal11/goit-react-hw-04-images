import PropTypes from 'prop-types';
import { useState } from 'react';

export const Searchbar = ({ loading, query, setSearch }) => {
  // state = {
  //   searchStr: '',
  // };
  const [searchStr, setSearchStr] = useState('');

  const handleOnSubmit = e => {
    e.preventDefault();
    if (!searchStr.trim()) {
      return;
    }
    setSearch(searchStr);
    setSearchStr('');
    // if (!this.state.searchStr) {
    //   return;
    // }
    // this.props.setSearch(this.state.searchStr);
    // this.setState({ searchStr: '' });
  };

  const handleOnChangeInput = e => {
    setSearchStr(e.target.value);
  };

  return (
    <header>
      <form onSubmit={handleOnSubmit}>
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

        <input
          onChange={handleOnChangeInput}
          type="search"
          placeholder="Search images and photos"
          disabled={loading}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  setSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
};
