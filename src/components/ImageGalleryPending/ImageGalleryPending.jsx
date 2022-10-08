import { Loader } from 'components/Loader';
import { ImageGallery } from 'components/ImageGallery';
import { Box } from 'components/Box';

export const ImageGalleryPending = ({ query, gallery }) => {
  const item = {
    query: query,
    gallery: [],
  };
  return (
    <div role="alert">
      <Box
        p={0}
        m={0}
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Loader />
      </Box>
      <h1>Query item: {item.query}</h1>
      <ImageGallery data={item.gallery} />
    </div>
  );
};
