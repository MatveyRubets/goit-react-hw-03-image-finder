import React, { Component } from 'react';
import Notiflix from 'notiflix';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import FetchData from 'services/Api';

const perPage = 12;

export class App extends Component {
  state = {
    images: [],
    value: '',
    page: 1,
    largeImage: '',
    showModal: false,
    showLoadMore: false,
    loading: false,
  };

  componentDidUpdate(_, prevState) {
    const { page, value, images } = this.state;
    if (prevState.page !== page || prevState.value !== value) {
      this.setState({ loading: true });
      FetchData(value, page, perPage)
        .then(data => {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            loading: false,
          }));
          if (data.total > perPage) {
            this.setState({ showLoadMore: true });
          } else if (data.total <= images.length + perPage) {
            this.setState({ showLoadMore: false });
            Notiflix.Notify.info(
              "We're sorry, but you've reached the end of search results."
            );
          }
        })
        .catch(this.onApiError);
    }
  }

  onSearch = inputValue => {
    this.setState({
      value: inputValue,
      page: 1,
      images: [],
      showLoadMore: false,
    });
  };

  showMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = image => {
    this.setState({ showModal: true, largeImage: image });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  onApiError = () => {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    this.setState({ loading: false, showLoadMore: false });
  };

  render() {
    const { images, showModal, largeImage, showLoadMore, loading } = this.state;

    return (
      <div className="app">
        <Searchbar onSubmit={this.onSearch} />
        {images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {showLoadMore && <Button onShowMore={this.showMore} />}
        {showModal && (
          <Modal largeImage={largeImage} closeModal={this.closeModal} />
        )}
        {loading && <Loader />}
      </div>
    );
  }
}

// test
