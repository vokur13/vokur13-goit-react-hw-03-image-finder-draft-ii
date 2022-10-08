import { Component } from 'react';
import { toast } from 'react-toastify';
import * as API from 'services/api';
// import { ImageGallery } from 'components/ImageGallery';
import { Loader } from 'components/Loader';

export class ImageGalleryHub extends Component {
  state = {
    page: null,
    gallery: [],
  };
  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page } = this.state;
    if (prevProps.query !== query) {
      this.setState({ page: 1, gallery: [] });
      fetch(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=29248542-cea93977a5234fa0e2d1b3dfd&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => response.json())
        .then(console.log);

      //       API.getGallery(query, page)
      //         .then(response => {
      //           if (!response.ok) {
      //             throw new Error(response.status);
      //           }
      //           return response.json();
      //         })
      //         .then(console.log);
    }
  }

  render() {
    const { query } = this.props;
    return (
      <>
        <h1>Image Gallery</h1>
        <p>{query}</p>
      </>
    );
  }
}
