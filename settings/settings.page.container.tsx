import React, {useState} from 'react';
import SettingsPage from './settings.page';
import {getSkus} from './iap/init-iaps';
import {connect} from 'react-redux';
import {GlobalState, PurchaseName} from '../models';
import {purchases} from './iap/init-iaps';
import {Platform} from 'react-native';

export type SkuInfo = {
  sku: string;
  purchased: boolean;
};

const mapStateToProps = (state: GlobalState) => {
  const skus = getSkus();
  return skus.map(sku => {
    const matchingPurchase = purchases.find(purchase => {
      if (Platform.OS === 'ios') {
        return purchase.ios === sku;
      } else {
        return purchase.android === sku;
      }
    });
    const storeKey: PurchaseName = (matchingPurchase as any).storeKey;
    const purchased: boolean = state.purchases[storeKey]
    return {
      sku,
      purchased
    };
  });
};

const mapDispatchToProps = {};

type SettingsPageContainerProps = {} & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const SettingsPageContainer = (props: SettingsPageContainerProps) => {
  return (
    <SettingsPage skus={props.skus} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPageContainer);
