import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import {
  SearchbarWrap,
  SearchForm,
  SearchFormButton,
  SearchFormIcon,
  SearchFormInput,
} from "./Searchbar.styled";

export class Searchbar extends PureComponent {
  state = {
    searchName: "",
  };

  searchValue = ({ currentTarget }) => {
    this.setState({ searchName: currentTarget.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchName.trim().toLowerCase());
    this.setState({ searchName: "" });
  };

  render() {
    return (
      <SearchbarWrap>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormIcon />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.searchValue}
            value={this.state.searchName}
          />
        </SearchForm>
      </SearchbarWrap>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
