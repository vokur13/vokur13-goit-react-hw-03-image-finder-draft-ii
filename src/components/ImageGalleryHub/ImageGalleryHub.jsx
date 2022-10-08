import { Component } from 'react';
import { toast } from 'react-toastify';
import * as API from 'services/api';
// import { ImageGallery } from 'components/ImageGallery';
import { Loader } from 'components/Loader';

export class ImageGalleryHub extends Component {
  state = {
    page: null,
    gallery: [],
    loader: false,
    error: false,
    length: 12,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page } = this.state;
    if (prevProps.query !== query) {
      try {
        this.setState({ page: 1, loader: true, gallery: [] });
        const data = await API.getGallery(query, page);
        const { totalHits, hits } = await data;
        this.setState({
          gallery: [...hits],
          loader: false,
          length: hits.length,
        });
      } catch (error) {
        this.setState({ error: true, loader: false });
        console.log(error);
      }
    }
  }

  render() {
    const { query } = this.props;
    const { gallery, loader, error, length } = this.state;
    return (
      <>
        {!length && (
          <p>Whoops, something went wrong, no item upon query {query} found</p>
        )}
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {loader && <Loader />}
        {!query && <div>Please let us know your query item</div>}
        {gallery.length > 0 ? <div>{gallery[0].tags}</div> : null}
      </>
    );
  }
}

{
  /* <p>Whoops, something went wrong, no item upon query {query} found</p> */
}

// error.response.data
