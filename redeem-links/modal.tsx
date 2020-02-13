import React from 'react';
import {Modal, StyleSheet} from 'react-native';
import RedeemLinks from './redeem-links.page';
import {baseFontSize} from '../styles';
import RedeemLinksHeader from './redeem-links.page.header';
import {connect} from 'react-redux';

const modalStyles = StyleSheet.create({
  container: {
    width: 5 * baseFontSize,
    height: 5 * baseFontSize
  }
});

const RedeemLinksModal = () => {
  const closeModal = () => {
    console.log('closed')
  };
  return (
    <Modal animationType="slide" transparent={false} visible={true}
           presentationStyle="formSheet">
      <RedeemLinksHeader isModal={true} onPressClose={closeModal} />
      <RedeemLinks />
    </Modal>
  )
};

export default RedeemLinksModal;
