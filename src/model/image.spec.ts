import { unsplashToImage } from './image';
import { mockUnsplashImage } from '../../test/fixtures/unsplash-image';
import { mockImage1 } from '../../test/fixtures/image';

describe('Image model', () => {
  test('#unsplashToImage', () => {
    expect(unsplashToImage()).toMatchSnapshot();
    expect(unsplashToImage(mockUnsplashImage)).toEqual(mockImage1);
  });
});
