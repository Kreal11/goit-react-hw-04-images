import { Component } from 'react';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    searchStr: '',
  };

  handleOnSubmit = e => {
    e.preventDefault();
    if (!this.state.searchStr) {
      return;
    }
    this.props.setSearch(this.state.searchStr);
    this.setState({ searchStr: '' });
  };

  handleOnChangeInput = e => {
    this.setState({ searchStr: e.target.value });
  };

  render() {
    const { loading, query } = this.props;
    return (
      <header>
        <form onSubmit={this.handleOnSubmit}>
          <button
            type="submit"
            disabled={
              loading ||
              this.state.searchStr.trim() === '' ||
              query.trim() === this.state.searchStr.trim()
            }
          >
            <span>Search</span>
          </button>

          <input
            onChange={this.handleOnChangeInput}
            type="search"
            placeholder="Search images and photos"
            disabled={loading}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  setSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
};
