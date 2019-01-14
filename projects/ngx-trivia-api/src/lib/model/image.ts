export interface ImageLinks {
  /**
   * HTML link to the image (browse'able from browser)
   */
  html: string;

  large: string;
  regular: string;
  small: string;
  thumb: string;
}

/**
 * Object present when license is different than PublicDomain
 */
export interface ImageAuthor {
  name?: string;
  url?: string;
  avatar?: string;
  twitter?: string;
}

export interface Image {
  id: string;
  caption: string;
  source: 'Google' | 'Unsplash';
  license: 'cc_publicdomain' | 'cc_attribute';
  location?: string;
  links: ImageLinks;
  author?: ImageAuthor;
}
