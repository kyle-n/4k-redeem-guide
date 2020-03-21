import React, {useState} from 'react';
import SettingsPage from './settings.page';
import {getSkus} from './iap/init-iaps';

type SettingsPageContainerProps = {};

const SettingsPageContainer = (props: SettingsPageContainerProps) => {
  return (
    <SettingsPage skus={getSkus()} />
  );
};

export default SettingsPageContainer;
