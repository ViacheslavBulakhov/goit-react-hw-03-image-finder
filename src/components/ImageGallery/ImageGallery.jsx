import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ImageGalleryWrap } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    return (
      <ImageGalleryWrap onClick={this.hideModal}>
        {this.props.imagesList.map(
          ({ largeImageURL, webformatURL, id, tags }) => {
            return (
              <ImageGalleryItem
                handleClick={() => this.props.click(largeImageURL)}
                url={webformatURL}
                key={id}
                alt={tags}
              />
            );
          }
        )}
      </ImageGalleryWrap>
    );
  }
}

ImageGallery.propTypes = {
  imagesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  click: PropTypes.func.isRequired,
};
