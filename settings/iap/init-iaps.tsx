import {Platform} from 'react-native';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import {registerPurchase} from '../../redux/actions';
import RNIap, {InAppPurchase, purchaseUpdatedListener} from 'react-native-iap';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  registerPurchase
};

const itemSkus: string[] = Platform.select({
  ios: [
    'supportDevFor5',
    'supportDevFor10',
    'supportDevFor20',
  ], android: [
    'android.test.purchased',
    'android.test.canceled',
    'android.test.item_unavailable'
    // 'support_dev_for_5',
    // 'support_dev_for_10',
    // 'support_dev_for_20'
  ]
}) as string[];

export const getSkus = (): string[] => itemSkus;

type InitIapsProps = {};

const InitIaps = (props: InitIapsProps) => {

  // runs once at component mount
  useEffect(() => {
    const onMount = async (): Promise<void> => {
      try {
        await RNIap.initConnection();
        // await RNIap.consumeAllItemsAndroid();
        const products = await RNIap.getProducts(itemSkus);
        purchaseUpdatedListener((purchase: InAppPurchase) => {
          console.log('purchase listener', purchase);
        });
      } catch (e) {
        console.warn(e);
      }
    };

    onMount();
  }, []);
  return null;
};

export default InitIaps;
