import React, {useState} from 'react';
import SettingsPage from './settings.page';
import * as RNIap from 'react-native-iap';
import {getSkus} from './iap/init-iaps';
import {Product} from 'react-native-iap';

type SettingsPageContainerProps = {};

const SettingsPageContainer = (props: SettingsPageContainerProps) => {
  const [products, setProducts] = useState([] as Product[]);
  RNIap.getProducts(getSkus()).then((loadedProducts: Product[]) => setProducts(loadedProducts));
  return (
    <SettingsPage products={products} />
  );
};

export default SettingsPageContainer;
