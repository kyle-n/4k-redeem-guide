import {Movie, sheetMovieToMovie, YesNo} from '../models';
import {SheetMovie} from '../models';

describe('models', () => {

  const mockSheetMovie: SheetMovie = {
    '#ERROR!': 'NO',
    '#s bottom of the slip to verify UHD': 1,
    'Dolby Vision or HDR': 'HDR',
    'FALSE': 'YES',
    'Fandango': 'NO',
    'Known Issues': 'extra spooky',
    'Last Changed Date': 2937,
    'Movies Anywhere': 'NO',
    'Movies that are not a part of Movies Anywhere. Where to redeem to get 4K at Vudu or FandangoNow only (Will not port anywhere)': 'Vudu location',
    'Real or Fake 4K': 'Unused property',
    'Studio': 'Paramount',
    'Title': '10 Cloverfield Lane (2016)',
    'UHD at Amazon Video': 'NO',
    'UHD at Google Play': 'YES',
    'UHD at Microsoft': 'NO',
    'UHD at iTunes (at some point)': 'YES',
    'UHD in FandangoNOW': 'NO',
    'UHD in Vudu': 'YES',
    'UV Codes': 'NO',
    'Vudu': 'YES',
    'Where to redeem a code to get 4K at Movies Anywhere (Must be a 4K code for MA/Vudu/FN redeem. HD or 4K for iTunes redeem)': 'Bunker',
    'iTunes code (HD or 4K) redeems 4K ': 'NO',
    'undefined': 2
  };

  const mockConvertedMovie: Movie = {
    imageUrl: `http://images2.vudu.com/poster2/2`,
    title: '10 Cloverfield Lane',
    year: 2016,
    studio: 'Paramount',
    maCodeLocation: 'Bunker',
    vuduFandangoCodeLocation: 'Vudu location',
    vuduUhd: true,
    fandangoNowUhd: false,
    itunesUhd: true,
    dolbyVision: false,
    hdr: true,
    itunesCodeRedeemsUhd: false,
    moviesAnywhere: false,
    knownIssues: 'extra spooky',
    modifiedAt: new Date(1908, 0, 15, 17),
    uhdVerificationNumber: 1,
    googlePlayUhd: true,
    amazonVideoUhd: false,
    microsoftUhd: false
  };

  it('correctly converts a sheet movie to my format', () => {
    const convertedMovie = sheetMovieToMovie(mockSheetMovie);
    expect(convertedMovie).toEqual(mockConvertedMovie);
  });

  it('can handle a movie with a year in the middle', () => {
    const title = 'Aladdin Live Action (2019) / Aladdin Signature Collection (Bundle)';
    const expectedTitle = 'Aladdin Live Action  / Aladdin Signature Collection (Bundle)';
    const mockWithMiddleYear = Object.assign({}, mockSheetMovie, {Title: title});
    const mockExpected = Object.assign({}, mockConvertedMovie, {title: expectedTitle, year: 2019});
    expect(sheetMovieToMovie(mockWithMiddleYear)).toEqual(mockExpected);
  });

});
