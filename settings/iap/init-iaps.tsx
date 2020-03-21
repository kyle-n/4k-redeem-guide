import {Platform} from 'react-native';
import {useEffect} from 'react';

let itemSkus: string[];

export const getSkus = (): string[] => itemSkus as string[];

type InitIapsProps = {};

const InitIaps = (props: InitIapsProps) => {
  useEffect(() => {
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

  }, []);
  return null;
};

export default InitIaps;
