import { Component } from 'react';
import { toast } from 'react-toastify';
import * as API from 'services/api';
import { ImageGalleryError } from 'components/ImageGalleryError';
import { ImageGallery } from 'components/ImageGallery';
import { ImageGalleryPending } from 'components/ImageGalleryPending';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class ImageGalleryHub extends Component {
  state = {
    page: null,
    gallery: [],
    error: false,
    length: null,
    status: Status.IDLE,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page } = this.state;
    if (prevProps.query !== query) {
      try {
        this.setState({
          status: Status.PENDING,
          page: 1,
        });
        const data = await API.getGallery(query, page);
        const { totalHits, hits } = await data;
        if (hits.length === 0) {
          this.setState({ status: Status.REJECTED });
          return toast.error(
            `Whoops, something went wrong, no item upon query '${query}' found`
          );
        }
        this.setState({
          status: Status.RESOLVED,
          gallery: [...hits],
          length: hits.length,
        });
      } catch (error) {
        this.setState({ error: true, status: Status.REJECTED });
        console.log(error);
      }
    }
  }

  render() {
    const { gallery, error, status } = this.state;

    if (status === 'idle') {
      return <div>Please let us know your query item</div>;
    }

    if (status === 'pending') {
      return <ImageGalleryPending />;
    }

    if (status === 'rejected') {
      return <ImageGalleryError message={error.message} />;
    }

    if (status === 'resolved') {
      return <ImageGallery data={gallery} />;
    }
  }
}

{
  /* <p>Whoops, something went wrong, no item upon query {query} found</p> */
}

// error.response.data
