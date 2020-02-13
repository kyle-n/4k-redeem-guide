import React from 'react';
import {Modal, StyleSheet} from 'react-native';
import {View} from 'native-base';
import RedeemLinks from './redeem-links.page';
import {baseFontSize} from '../styles';
import RedeemLinksHeader from './redeem-links.page.header';

const modalStyles = StyleSheet.create({
  container: {
    width: 5 * baseFontSize,
    height: 5 * baseFontSize
  }
});

const RedeemLinksModal = () => {
  return (
    <Modal animationType="slide" transparent={false} visible={true}
           presentationStyle="formSheet">
      <RedeemLinksHeader />
      <RedeemLinks />
    </Modal>
  )
};

export default RedeemLinksModal;
