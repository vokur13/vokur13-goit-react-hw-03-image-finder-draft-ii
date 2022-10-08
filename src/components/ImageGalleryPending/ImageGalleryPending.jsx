import { Loader } from 'components/Loader';
import { Box } from 'components/Box';

export const ImageGalleryPending = ({ query }) => {
  return (
    <div role="alert">
      <div>
        <Loader />
      </div>
    </div>
  );
};
