import React from 'react';
import SettingsPage from './settings.page';
import {getSkus} from './iap/init-iaps';
import {connect} from 'react-redux';
import {GlobalState, PurchaseName} from '../models';
import {purchases} from './iap/init-iaps';
import {Platform} from 'react-native';
import {clearMovieCache} from '../redux/actions';

export type SkuInfo = {
  sku: string;
  purchased: boolean;
  userFacingText: string;
};

const mapStateToProps = (state: GlobalState) => {
  const skus = getSkus();
  return {
    skus: skus.map(sku => {
      const matchingPurchase = purchases.find(purchase => {
        if (Platform.OS === 'ios') {
          return purchase.ios === sku;
        } else {
          return purchase.android === sku;
        }
      }) as any;
      const storeKey: PurchaseName = matchingPurchase.storeKey;
      const purchased: boolean = state.purchases[storeKey]
      return {
        sku,
        purchased,
        userFacingText: matchingPurchase.userFacingText
      };
    })
  };
};

const mapDispatchToProps = {clearMovieCache};

type SettingsPageContainerProps = {} & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const SettingsPageContainer = (props: SettingsPageContainerProps) => {
  return (
    <SettingsPage skus={props.skus} onPressDownloadIcon={props.clearMovieCache} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPageContainer);
