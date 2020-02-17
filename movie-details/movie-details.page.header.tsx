import React from 'react';
import {headerDynamicSheet} from '../search-header/search.page.header';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {sharedDynamicStyleSheet, tabletMode} from '../styles';
import {Button, Text, View} from 'native-base';
import {withNavigation} from 'react-navigation';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {BackButton} from '../shared-components';
import RedeemLinksButton from '../search-header/redeem-links-button';
import {connect} from 'react-redux';
import {toggleLinksModalVisible} from '../redux/actions';

const mapStateToProps = null;
const mapDispatchToProps = {
  toggleLinksModalVisible
};

type MovieDetailsPageHeaderProps = {} & NavigationStackScreenProps & (typeof mapDispatchToProps);

const MovieDetailsPageHeader = (props: MovieDetailsPageHeaderProps) => {
  const searchHeaderStyles = useDynamicStyleSheet(headerDynamicSheet);
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  const goBack = () => props.navigation.goBack();
  return (
    <View style={[
      searchHeaderStyles.container,
      sharedStyles.dynamicBackgroundColor
    ]}>
      <View style={searchHeaderStyles.centerStyle}>
        <BackButton onPress={goBack} />
      </View>
      <View style={searchHeaderStyles.centerStyle}>
        <Text style={searchHeaderStyles.pageTitle}>Details</Text>
      </View>
      <View style={searchHeaderStyles.centerStyle}>
        {tabletMode() ? (
          <HiddenBackText />
        ) : null}
        <RedeemLinksButton onPressOnTablet={props.toggleLinksModalVisible} />
      </View>
    </View>
  );
};

const HiddenBackText = () => (
  <Button style={{opacity: 0}} large transparent>
    <Text>Back</Text>
  </Button>
);

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(MovieDetailsPageHeader));
