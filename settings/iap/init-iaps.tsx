import {Platform} from 'react-native';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import {registerPurchase} from '../../redux/actions';
import RNIap, {InAppPurchase, purchaseUpdatedListener} from 'react-native-iap';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {

}

let itemSkus: string[];

export const getSkus = (): string[] => itemSkus as string[];

type InitIapsProps = {};

const InitIaps = (props: InitIapsProps) => {

  // runs once at component mount
  useEffect(() => {
    const onMount = async (): Promise<void> => {
      itemSkus = Platform.select({
        ios: [
          'supportDevFor5',
          'supportDevFor10',
          'supportDevFor20',
        ], android: [
          'support_dev_for_5',
          'support_dev_for_10',
          'support_dev_for_20'
        ]
      }) as string[];

      const connected: boolean = await RNIap.initConnection();
      await RNIap.consumeAllItemsAndroid();
      const purchaseUpdateSub = purchaseUpdatedListener((purchase: InAppPurchase) => {
        console.log('purchase listener', purchase);
      });
    };

    onMount();
  }, []);
  return null;
};

export default InitIaps;
