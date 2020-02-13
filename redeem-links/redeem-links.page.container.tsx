import React from 'react';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import RedeemLinks from './redeem-links.page';

type RedeemLinksPageContainerProps = NavigationStackScreenProps;

const RedeemLinksPageContainer = (props: RedeemLinksPageContainerProps) => {
  return (
    <RedeemLinks />
  );
};

export default RedeemLinksPageContainer;
