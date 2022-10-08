import { Component } from 'react';
import { toast } from 'react-toastify';
import * as API from 'services/api';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
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
  static defaultProps = {
    step: 1,
    initialValue: 1,
  };

  state = {
    gallery: [],
    page: this.props.initialValue,
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
    if (prevState.page !== page) {
      try {
        this.setState({
          status: Status.PENDING,
        });
        const data = await API.getGallery(query, page);
        const { totalHits, hits } = await data;
        this.setState(prevState => ({
          status: Status.RESOLVED,
          gallery: [...prevState.gallery, ...hits],
          length: hits.length,
        }));
      } catch (error) {
        this.setState({ error: true, status: Status.REJECTED });
        console.log(error);
      }
    }
  }

  handleMoreImage = async () => {
    this.setState(prevState => ({ page: prevState.page + this.props.step }));
  };

  render() {
    const { query } = this.props;
    const { gallery, error, status } = this.state;

    if (status === 'idle') {
      return <div>Please let us know your query item</div>;
    }

    if (status === 'pending') {
      return <ImageGalleryPending query={query} data={gallery} />;
    }

    if (status === 'rejected') {
      return <ImageGalleryError message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGallery data={gallery} />;
          <Box display="flex" justifyContent="center">
            <Button type="button" onClick={this.handleMoreImage}>
              Load more
            </Button>
          </Box>
        </>
      );
    }
  }
}

{
  /* <p>Whoops, something went wrong, no item upon query {query} found</p> */
}

// error.response.data
