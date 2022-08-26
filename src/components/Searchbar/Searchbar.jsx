import { Component } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import style from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = e => {
    this.setState({ value: e.currentTarget.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const searchValue = this.state.value.trim();
    if (!searchValue) {
      Notiflix.Notify.info('Please write some value');
    }
    this.props.onSubmit(searchValue);
    this.setState({ value: '' });
  };
  render() {
    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.SearchFormButton}>
            <span className={style.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={style.SearchFormInput}
            value={this.state.imageQuery}
            type="text"
            autoComplete="off"
            autoFocus
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
