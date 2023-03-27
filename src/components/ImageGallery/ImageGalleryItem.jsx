import PropTypes from "prop-types";
import React from "react";
import {
  ImageGalleryItemImage,
  ImageGalleryItemStyled,
} from "./ImageGallery.styled";

export const ImageGalleryItem = ({ url, handleClick }) => (
  <ImageGalleryItemStyled onClick={handleClick}>
    <ImageGalleryItemImage src={url} alt="" loading="lazy" />
  </ImageGalleryItemStyled>
);

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
