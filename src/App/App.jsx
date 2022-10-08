import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'css/styles.css';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { Searchbar } from 'components/Searchbar';
import { ImageGalleryHub } from 'components/ImageGalleryHub';

export class App extends Component {
  state = {
    query: '',
    page: 1,
  };

  handleFormSubmit = ({ query }) => {
    const q = query.trim().toLowerCase();
    if (q === '') {
      return toast.warn('Please let us know your query item');
    }
    this.setState({ query: q });
  };

  handleMoreImage = () => {
    console.log('Handle More Image');
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { query, page } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGalleryHub query={query} page={page} />
        <Box display="flex" justifyContent="center">
          <Button type="button" onClick={this.handleMoreImage}>
            Load more
          </Button>
        </Box>
        <ToastContainer position="top-left" autoClose={5000} />
      </>
    );
  }
}
