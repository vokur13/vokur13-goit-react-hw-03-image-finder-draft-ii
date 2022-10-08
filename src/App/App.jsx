import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'css/styles.css';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { Searchbar } from 'components/Searchbar';
import { fetchGallery } from '../services/ImageGalleryAPI';
import { Loader } from 'components/Loader';
import { ImageGallery } from 'components/ImageGallery';
import { ImageGalleryError } from 'components/ImageGalleryError';

export class App extends Component {
  render() {
    return <></>;
  }
}
