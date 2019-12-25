import {spreadsheetDateToJsDate} from './utils';

export interface Movie {
  imageUrl: string;
  title: string;
  studio: string;
  maCodeLocation: string;
  vuduFandangoCodeLocation: string;
  vuduUhd: boolean;
  fandangoNowUhd: boolean;
  itunesUhd: boolean;
  dolbyVision: boolean;
  hdr: boolean;
  itunesCodeRedeemsUhd: boolean;
  moviesAnywhere: boolean;
  knownIssues: string;
  modifiedAt: Date;
  uhdVerificationNumber?: number;
  googlePlayUhd: boolean;
  amazonVideoUhd: boolean;
  microsoftUhd: boolean;
}

export const sheetMovieToMovie = (sheetMovie: SheetMovie): Movie => {
  return {
    imageUrl: `http://images2.vudu.com/poster2/${sheetMovie.undefined}`,
    title: sheetMovie.Title,
    studio: sheetMovie.Studio,
    maCodeLocation: sheetMovie['Where to redeem a code to get 4K at Movies Anywhere (Must be a 4K code for MA/Vudu/FN redeem. HD or 4K for iTunes redeem)'],
    vuduFandangoCodeLocation: sheetMovie['Movies that are not a part of Movies Anywhere. Where to redeem to get 4K at Vudu or FandangoNow only (Will not port anywhere)'],
    vuduUhd: sheetMovie['UHD in Vudu'] === 'YES',
    fandangoNowUhd: sheetMovie['UHD in FandangoNOW'] === 'YES',
    itunesUhd: sheetMovie['UHD at iTunes (at some point)'] === 'YES',
    dolbyVision: sheetMovie['Dolby Vision or HDR'] && sheetMovie['Dolby Vision or HDR'].includes('DV'),
    hdr: sheetMovie['Dolby Vision or HDR'] && sheetMovie['Dolby Vision or HDR'].includes('HDR'),
    itunesCodeRedeemsUhd: sheetMovie['iTunes code (HD or 4K) redeems 4K '] === 'YES',
    moviesAnywhere: sheetMovie['Movies Anywhere'] === 'YES',
    knownIssues: sheetMovie['Known Issues'],
    modifiedAt: spreadsheetDateToJsDate(sheetMovie['Last Changed Date']),
    uhdVerificationNumber: sheetMovie['#s bottom of the slip to verify UHD'],
    googlePlayUhd: sheetMovie['UHD at Google Play'] === 'YES',
    amazonVideoUhd: sheetMovie['UHD at Amazon Video'] === 'YES',
    microsoftUhd: sheetMovie['UHD at Microsoft'] === 'YES'
  };
};


export interface GoogleSheetsResponse {
  data: SheetMovie[];
  updated: string;
  title: string;
}

type YesNo = 'YES' | 'NO';

interface SheetMovie {
  '#ERROR!': YesNo;
  '#s bottom of the slip to verify UHD': number;
  'Dolby Vision or HDR': string;
  'FALSE': YesNo;
  'Fandango': YesNo;
  'Known Issues': string;
  'Last Changed Date': number;
  'Movies Anywhere': YesNo;
  'Movies that are not a part of Movies Anywhere. Where to redeem to get 4K at Vudu or FandangoNow only (Will not port anywhere)': string;
  'Real or Fake 4K': string;
  'Studio': string;
  'Title': string;
  'UHD at Amazon Video': YesNo;
  'UHD at Google Play': YesNo;
  'UHD at Microsoft': YesNo;
  'UHD at iTunes (at some point)': YesNo;
  'UHD in FandangoNOW': YesNo;
  'UHD in Vudu': YesNo;
  'UV Codes': YesNo;
  'Vudu': YesNo;
  'Where to redeem a code to get 4K at Movies Anywhere (Must be a 4K code for MA/Vudu/FN redeem. HD or 4K for iTunes redeem)': string;
  'iTunes code (HD or 4K) redeems 4K ': YesNo;
  'undefined': number;
}