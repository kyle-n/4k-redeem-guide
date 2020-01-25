import React from 'react';

type LoadingRedirectProps = {
  redirect: Function;
  doRedirect: boolean;
}

const LoadingRedirect = (props: LoadingRedirectProps) => {
  if (props.doRedirect) {
    props.redirect();
  }
  return null;
};

export default LoadingRedirect;
