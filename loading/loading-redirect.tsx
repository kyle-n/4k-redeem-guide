import React from 'react';
import {getMovies} from '../store';

const LoadingRedirect = (props: any) => {
  if (!getMovies().length) {
    props.redirect();
  }
  return null;
};

export default LoadingRedirect;
