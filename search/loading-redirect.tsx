import React from 'react';
import {getMovies} from '../store';

const LoadingRedirect = (props: any) => {
  console.log('checking')
  if (!getMovies().length) {
    console.log('redir')
    props.redirect();
  }
  console.log('movies')
  return null;
};

export default LoadingRedirect;
