import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalWrap } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseModal);
  }

  onCloseModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  render() {
    return createPortal(
      <ModalOverlay onClick={this.onCloseModal}>
        <ModalWrap>
          <img src={this.props.largeUrl} alt="" />
        </ModalWrap>
      </ModalOverlay>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};
