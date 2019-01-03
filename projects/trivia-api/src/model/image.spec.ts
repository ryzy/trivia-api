import { unsplashToImage } from './image';
import { mockImage1 } from '../../../../test/fixtures/image';
import { mockUnsplashImage } from '../../../../test/fixtures/unsplash-image';

describe('Image model', () => {
  test('#unsplashToImage', () => {
    expect(unsplashToImage()).toMatchSnapshot();
    expect(unsplashToImage(mockUnsplashImage)).toEqual(mockImage1);
  });
});
