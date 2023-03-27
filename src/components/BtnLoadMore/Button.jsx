import PropTypes from "prop-types";
import React from "react";
import { BtnLoadMore } from "./Button.styled";

export const Button = ({ onLoadMore }) => (
  <BtnLoadMore type="Button" onClick={onLoadMore}>
    Load More
  </BtnLoadMore>
);
Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
