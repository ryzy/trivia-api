import { Explanation } from '../../projects/ngx-trivia-api/src/lib/model/explanation';

export const mockGoogleKnowledgeResponse: any = {
  '@context': {
    '@vocab': 'http://schema.org/',
    'goog': 'http://schema.googleapis.com/',
    'EntitySearchResult': 'goog:EntitySearchResult',
    'detailedDescription': 'goog:detailedDescription',
    'resultScore': 'goog:resultScore',
    'kg': 'http://g.co/kg',
  },
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'EntitySearchResult',
      'result': {
        '@id': 'kg:/m/012x34',
        'name': 'Jaguar Cars',
        '@type': [
          'Thing',
          'Corporation',
          'Organization',
        ],
        'description': 'Luxury vehicles company',
        'image': {
          'contentUrl': 'http://t0.gstatic.com/images?q=tbn:ANd9GcQOjSYSg4NkqZeKvwHez-VjQ9l7Ic_HSxcXx7k7p8Q6TVkLmDuA',
          'url': 'https://commons.wikimedia.org/wiki/File:Jaguar_XK8_Convertible_-_Flickr_-_The_Car_Spy_(22).jpg',
        },
        'detailedDescription': {
          'articleBody': 'Jaguar is the luxury vehicle brand of Jaguar Land Rover, a British multinational car manufacturer with its headquarters in Whitley, Coventry, England and owned by the Indian company Tata Motors since 2008. ',
          'url': 'https://en.wikipedia.org/wiki/Jaguar_Cars',
          'license': 'https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License',
        },
        'url': 'http://www.jaguar.co.uk/',
      },
      'resultScore': 133.322617,
    },
    {
      '@type': 'EntitySearchResult',
      'result': {
        '@id': 'kg:/m/017x4r',
        'name': 'SEPECAT Jaguar',
        '@type': [
          'Thing',
        ],
        'description': 'Attack aircraft',
        'image': {
          'contentUrl': 'http://t2.gstatic.com/images?q=tbn:ANd9GcSJbdSkopB59XzPeSV0AuVLofgSqpkw7CV79uWy_Vm6fnAtknc0',
          'url': 'https://commons.wikimedia.org/wiki/File:Jaguar_DF-SD-05-05511.JPEG',
        },
        'detailedDescription': {
          'articleBody': 'The SEPECAT Jaguar is a British-French jet attack aircraft originally used by the British Royal Air Force and the French Air Force in the close air support and nuclear strike role. ',
          'url': 'https://en.wikipedia.org/wiki/SEPECAT_Jaguar',
          'license': 'https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License',
        },
      },
      'resultScore': 77.965324,
    },
    {
      '@type': 'EntitySearchResult',
      'result': {
        '@id': 'kg:/m/0449p',
        'name': 'Jaguar',
        '@type': [
          'Thing',
        ],
        'description': 'Animal',
        'image': {
          'contentUrl': 'http://t0.gstatic.com/images?q=tbn:ANd9GcQZbMwdNAlvIQBQbiSTpkkPXeg6DlqKV_fdhgdYo_hczKs5Ajuh',
          'url': 'https://en.wikipedia.org/wiki/Jaguar',
        },
        'detailedDescription': {
          'articleBody': 'The jaguar is a wild cat species and the only extant member of the genus Panthera native to the Americas. The jaguar\'s present range extends from Southwestern United States and Mexico in North America, across much of Central America, and south to Paraguay and northern Argentina in South America. ',
          'url': 'https://en.wikipedia.org/wiki/Jaguar',
          'license': 'https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License',
        },
      },
      'resultScore': 56.943134,
    },
  ],
};

export const mockExplanation1: Explanation = {
  source: 'Google',
  id: 'kg:/m/012x34',
  name: 'Jaguar Cars',
  description: 'Jaguar is the luxury vehicle brand of Jaguar Land Rover, a British multinational car manufacturer with its headquarters in Whitley, Coventry, England and owned by the Indian company Tata Motors since 2008.',
  type: [
    'Thing',
    'Corporation',
    'Organization',
  ],
  url: 'https://en.wikipedia.org/wiki/Jaguar_Cars',
  license: 'https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License',
};

export const mockExplanation2: Explanation = {
  source: 'Google',
  id: 'kg:/m/017x4r',
  name: 'SEPECAT Jaguar',
  description: 'The SEPECAT Jaguar is a British-French jet attack aircraft originally used by the British Royal Air Force and the French Air Force in the close air support and nuclear strike role.',
  type: [
    'Thing',
  ],
  url: 'https://en.wikipedia.org/wiki/SEPECAT_Jaguar',
  license: 'https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License',
};

export const mockExplanation3: Explanation = {
  source: 'Google',
  id: 'kg:/m/0449p',
  name: 'Jaguar',
  description: 'The jaguar is a wild cat species and the only extant member of the genus Panthera native to the Americas. The jaguar\'s present range extends from Southwestern United States and Mexico in North America, across much of Central America, and south to Paraguay and northern Argentina in South America.',
  type: [
    'Thing',
  ],
  url: 'https://en.wikipedia.org/wiki/Jaguar',
  license: 'https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License',
};

export const mockExplanations: Explanation[] = [mockExplanation1, mockExplanation2, mockExplanation3];
