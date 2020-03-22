import {Platform} from 'react-native';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import {registerPurchase} from '../../redux/actions';
import RNIap, {InAppPurchase, purchaseUpdatedListener} from 'react-native-iap';
import {PurchaseName} from '../../models';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  registerPurchase
};

export const purchases = [
  {
    ios: 'supportDevFor5',
    // android: 'support_dev_for_5',
    android: 'android.test.purchased',
    storeKey: 'five',
    userFacingText: '$5 - A cup of coffee'
  },
  {
    ios: 'supportDevFor10',
    // android: 'support_dev_for_10',
    android: 'android.test.canceled',
    storeKey: 'ten',
    userFacingText: '$10 - A really nice gift, thank you!'
  },
  {
    ios: 'supportDevFor20',
    // android: 'support_dev_for_20',
    android: 'android.test.item_unavailable',
    storeKey: 'twenty',
    userFacingText: '$20 - A true patron of movies and indie app development'
  }
];

const itemSkus: string[] = Platform.select({
  ios: purchases.map(purchase => purchase.ios),
  android: purchases.map(purchase => purchase.android)
}) as string[];

export const getSkus = (): string[] => itemSkus;

type InitIapsProps = {} & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const InitIaps = (props: InitIapsProps) => {

  // runs once at component mount
  useEffect(() => {
    const onMount = async (): Promise<void> => {
      try {
        await RNIap.initConnection();
        // await RNIap.consumeAllItemsAndroid();
        await RNIap.getProducts(itemSkus);

        purchaseUpdatedListener((purchaseEvent: InAppPurchase) => {
          if (purchaseEvent.transactionReceipt) {
            const matchingPurchase = purchases.find(purchase => {
              if (Platform.OS === 'android') {
                return purchase.android === purchaseEvent.productId
              } else if (Platform.OS === 'ios') {
                return purchase.ios === purchaseEvent.productId;
              } else {
                console.warn('Unsupported platform', purchase, purchaseEvent);
                return undefined;
              }
            });
            if (matchingPurchase) {
              props.registerPurchase(matchingPurchase.storeKey as PurchaseName);
            }
          }
        });

      } catch (e) {
        console.warn(e);
      }
    };

    onMount();
  }, []);
  return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(InitIaps);
