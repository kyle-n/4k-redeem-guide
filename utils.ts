// courtesy christopherscott on GitHub
import isUrl from 'is-url';

export const spreadsheetDateToJsDate = (spreadsheetDate: number): Date => {
  return new Date((spreadsheetDate- (25567 + 1)) * 86400 * 1000);
};

export const extractUrls = (text: string): string[] => {
  return text.split(' ').filter(str => isUrl(str));
};
