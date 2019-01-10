export interface ImageLinks {
  html: string;
  full: string;
  raw: string;
  regular: string;
  small: string;
  thumb: string;
}
export interface ImageAuthor {
  source: 'Unsplash';
  name: string;
  url: string;
  avatar: string;
  twitter: string;
}

export interface Image {
  id: string;
  caption: string;
  location: string;
  links: ImageLinks;
  author: ImageAuthor;
}
