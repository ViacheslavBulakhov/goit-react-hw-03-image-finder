import React from 'react';
import { animateScroll } from 'react-scroll';
import Notiflix from 'notiflix';
import NewsApiService from './SearchApi/Api';

import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './BtnLoadMore/Button';
import { AppWrap } from './App.styled';

import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

const ApiService = new NewsApiService();

export class App extends React.Component {
  state = {
    images: [],
    page: 1,
    lastPage: 0,
    searchQuery: '',
    largeUrl: '',
    status: 'idle',
    showModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.state;
    if (searchQuery !== prevState.searchQuery || page !== prevState.page) {
      this.setState({ status: 'pending' });
      animateScroll.scrollToBottom({ smooth: 'behavior' });
      this.getImages();
    }
  }

  getImages = async () => {
    try {
      const newImages = await ApiService.fetchArticles({
        page: this.state.page,
        searchQuery: this.state.searchQuery,
      });
      console.log(newImages);

      if (newImages.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        this.setState({
          status: 'rejected',
        });
        return;
      }

      const lastPage = Math.ceil(newImages.totalHits / 12);
      const images = newImages.hits.map(
        ({ webformatURL, id, largeImageURL, tags }) => ({
          webformatURL,
          id,
          largeImageURL,
          tags,
        })
      );

      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        status: 'resolved',
        lastPage,
      }));

      this.state.page !== 1 &&
        animateScroll.scrollToBottom({ duration: 1000, smooth: 'behavior' });
    } catch (error) {
      this.setState({ status: 'rejected' });
      console.log(error);
    }
  };

  onSubmit = searchQuery => {
    if (searchQuery === '') {
      Notiflix.Notify.warning(
        'Serach field is empty,please write something and try again.'
      );
      return;
    }
    if (searchQuery !== this.state.searchQuery) {
      this.setState({
        images: [],
        searchQuery,
        page: 1,
        lastPage: 0,
      });

      return;
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = (largeUrl = '') => {
    this.setState(prevState => ({ showModal: !prevState.showModal, largeUrl }));
  };

  render() {
    const { showModal, images, largeUrl, status, page, lastPage } = this.state;
    const showLoadMoreBtn = status === 'resolved' && page !== lastPage;

    return (
      <AppWrap>
        <Searchbar onSubmit={this.onSubmit} />

        {images.length > 0 && (
          <ImageGallery imagesList={images} click={this.toggleModal} />
        )}

        {showLoadMoreBtn && <Button onLoadMore={this.onLoadMore} />}

        {status === 'pending' && <Loader />}

        {showModal && (
          <Modal toggleModal={this.toggleModal} largeUrl={largeUrl} />
        )}
      </AppWrap>
    );
  }
}
