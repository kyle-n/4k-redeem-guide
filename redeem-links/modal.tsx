import React from 'react';
import {Modal, StyleSheet} from 'react-native';
import RedeemLinks from './redeem-links.page';
import {baseFontSize} from '../styles';
import RedeemLinksHeader from './redeem-links.page.header';
import {connect} from 'react-redux';
import {GlobalState} from '../models';
import {toggleLinksModalVisible} from '../redux/actions';

const mapStateToProps = (state: GlobalState) => {
  return {
    visible: state.linksModalVisible
  };
};
const mapDispatchToProps = {
  toggleLinksModalVisible
};

type RedeemLinksModalProps = ReturnType<typeof mapStateToProps> & (typeof mapDispatchToProps);

const modalStyles = StyleSheet.create({
  container: {
    width: 5 * baseFontSize,
    height: 5 * baseFontSize
  }
});

const RedeemLinksModal = (props: RedeemLinksModalProps) => {
  return (
    <Modal animationType="slide" transparent={false} presentationStyle="formSheet"
           visible={props.visible}>
      <RedeemLinksHeader isModal={true} onPressClose={props.toggleLinksModalVisible as any} />
      <RedeemLinks />
    </Modal>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(RedeemLinksModal);
