import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'css/styles.css';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { Searchbar } from 'components/Searchbar';
import { ImageGalleryHub } from 'components/ImageGalleryHub';
import { fetchGallery } from '../services/api';
import { Loader } from 'components/Loader';
import { ImageGallery } from 'components/ImageGallery';
import { ImageGalleryError } from 'components/ImageGalleryError';

export class App extends Component {
  state = {
    query: '',
  };

  handleFormSubmit = ({ query }) => {
    const q = query.trim().toLowerCase();
    if (q === '') {
      return toast.warn('Please let us know yuor query item');
    }
    this.setState({ query: q });
  };

  render() {
    const { query } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGalleryHub query={query} />
        <ToastContainer position="top-left" autoClose={3000} />
      </>
    );
  }
}
