import React from 'react';
import {Platform} from 'react-native';

const itemSkus = Platform.select({
  ios: [
    'supportDevFor5',
    'supportDevFor10',
    'supportDevFor20',
  ], android: [
    'support_dev_for_5',
    'support_dev_for_10',
    'support_dev_for_20'
  ]
});

const getSkus = (): string[] => itemSkus as string[];

export default getSkus;
