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

export function unsplashToImage(data: any = {}): Image {
  return {
    id: data.id,
    caption: data.description,
    location: data.location && data.location.title,
    links: {
      html: data.links && data.links.html,
      ...data.urls,
    },
    author: {
      source: 'Unsplash',
      name: data.user && data.user.name,
      url: data.user && data.user.links && data.user.links.html,
      avatar:
        data.user && data.user.profile_image && data.user.profile_image.large,
      twitter: data.user && data.user.twitter_username,
    },
  };
}
