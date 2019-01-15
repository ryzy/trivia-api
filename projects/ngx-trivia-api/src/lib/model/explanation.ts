export type ExplanationSource = 'Wikipedia' | 'Google';

export interface Explanation {
  id: string;
  source: ExplanationSource;
  type: string[];
  name: string;
  description: string;

  /**
   * URL with source from where the info comes
   */
  url: string;

  /**
   * URL with license for the content
   */
  license: string;
}
