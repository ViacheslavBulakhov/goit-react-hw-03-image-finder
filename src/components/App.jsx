import React from "react";
import { animateScroll } from "react-scroll";
import Notiflix from "notiflix";
import NewsApiService from "./SearchApi/Api";

import { Searchbar } from "./searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./BtnLoadMore/Button";
import { AppWrap } from "./App.styled";

import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";

const ApiService = new NewsApiService();

export class App extends React.Component {
  state = {
    images: [],
    page: 1,
    lastPage: 0,
    searchQuery: "",
    largeUrl: "",
    status: "idle",
    showModal: false,
  };

  toggleModalOpen = () => {
    this.setState((state) => ({ showModal: !this.state.showModal }));
  };
  showLargeImage = (largeUrl) => {
    this.toggleModalOpen();
    this.setState({ largeUrl });
  };

  onSubmit = async (searchQuery) => {
    if (searchQuery === "") {
      this.setState({ images: [] });
      Notiflix.Notify.warning(
        "Serach field is empty,please write something and try again."
      );
      return;
    }
    if (searchQuery !== this.state.searchQuery) {
      await this.setState({
        status: "pending",
        searchQuery,
        page: 1,
      });

      const newImages = await ApiService.fetchArticles({
        page: this.state.page,
        searchQuery: this.state.searchQuery,
      });

      if (newImages.hits.length === 0) {
        Notiflix.Notify.failure(
          "Sorry, there are no images matching your search query. Please try again."
        );
        this.setState({
          status: "idle",
        });
        return;
      }

      const lastPage = Math.ceil(newImages.totalHits / 12);

      this.setState((prevState) => ({
        images: [...newImages.hits],
        status: "resolved",
        lastPage: lastPage,
        page: lastPage === 1 ? 1 : prevState.page + 1,
      }));

      return;
    }
  };

  onLoadMore = async () => {
    const images = await ApiService.fetchArticles({
      page: this.state.page,
      searchQuery: this.state.searchQuery,
    });
    this.setState((prevState) => ({
      images: [...prevState.images, ...images.hits],
      page: prevState.page + 1,
    }));
    animateScroll.scrollToBottom({ duration: 1000, smooth: "behavior" });
  };

  render() {
    const { showModal, images, largeUrl, status } = this.state;

    return (
      <AppWrap>
        {showModal && (
          <Modal toggleModalOpen={this.toggleModalOpen} largeUrl={largeUrl} />
        )}
        <Searchbar onSubmit={this.onSubmit} />

        {status === "pending" && <Loader />}

        {status === "resolved" && (
          <ImageGallery imagesList={images} click={this.showLargeImage} />
        )}

        {images.length > 0 && this.state.page !== this.state.lastPage && (
          <Button onLoadMore={this.onLoadMore} />
        )}
      </AppWrap>
    );
  }
}
