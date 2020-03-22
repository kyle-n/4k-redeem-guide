import React from 'react';
import {
  Body,
  Container,
  Content,
  Icon,
  Left,
  ListItem,
  Right,
  Separator,
  Switch,
  Text,
  View
} from 'native-base';
import {Checkmark} from '../shared-components';
import {StyleSheet} from 'react-native';
import {baseFontSize, darkBackgroundColor, darkerLightBackgroundColor, sharedDynamicStyleSheet} from '../styles';
import RNIap from 'react-native-iap';
import {SkuInfo} from './settings.page.container';
import {DynamicStyleSheet, DynamicValue, useDynamicStyleSheet} from 'react-native-dark-mode';
import RefreshCacheButton from '../search-header/refresh-cache-button';

type SettingsPageProps = {
  autoDownloadOnData: boolean;
  onAutoDownloadTogglePress: () => void;
  skus: SkuInfo[];
  onPressDownloadIcon: () => void;
};

const SettingsPage = (props: SettingsPageProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <Container style={sharedStyles.dynamicBackgroundColor}>
      <Content style={sharedStyles.dynamicBackgroundColor}>
        <DownloadsSettings onPressDownloadIcon={props.onPressDownloadIcon}
                           autoDownloadOnData={props.autoDownloadOnData}
                           onAutoDownloadOnDataTogglePress={props.onAutoDownloadTogglePress} />
        <SupportOptions skus={props.skus} />
        <SupportMessage />
      </Content>
    </Container>
  );
};

const settingsStyles = StyleSheet.create({
  separator: {
    height: baseFontSize * 3.5
  },
  separatorText: {
    fontSize: baseFontSize * 1.5
  },
  messageContainer: {
    padding: baseFontSize * 2
  },
  testBorder: {
    borderWidth: 1,
    borderColor: 'red'
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

type DownloadsSettingsProps = {
  onPressDownloadIcon: () => void;
  autoDownloadOnData: boolean;
  onAutoDownloadOnDataTogglePress: () => void;
}

const DownloadsSettings = (props: DownloadsSettingsProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <View>
      <Separator bordered style={[settingsStyles.separator, sharedStyles.dynamicPageBackgroundColor]}>
        <Text style={[settingsStyles.separatorText]}>Downloads</Text>
      </Separator>

      <ListItem icon button>
        <Left>
          <View style={settingsStyles.iconContainer}>
            <Icon name="radio-tower" type="MaterialCommunityIcons" style={sharedStyles.dynamicTextColor} />
          </View>
        </Left>
        <Body>
          <Text style={sharedStyles.dynamicTextColor}>Auto-download movies on data</Text>
        </Body>
        <Right>
          <Switch onValueChange={props.onAutoDownloadOnDataTogglePress} value={props.autoDownloadOnData} />
        </Right>
      </ListItem>

      <ListItem icon button>
        <Left>
          <View style={settingsStyles.iconContainer}>
            <Icon name="autorenew" type="MaterialIcons" style={sharedStyles.dynamicTextColor} />
          </View>
        </Left>
        <Body>
          <Text style={sharedStyles.dynamicTextColor}>Download movies now</Text>
        </Body>
        <Right>
          <RefreshCacheButton onPress={props.onPressDownloadIcon} />
        </Right>
      </ListItem>
    </View>
  );
};

type SupportOptionsProps = {
  skus: SkuInfo[];
};

const reqPurchase = (sku: string): void => {
  try {
    RNIap.requestPurchase(sku);
  } catch (e) {
    console.log(e)
  }
};

const SupportOptions = (props: SupportOptionsProps) => {
  const checkIfPurchased = (index: number): void => {
    if (!props.skus[index].purchased) {
      reqPurchase(props.skus[index].sku);
    } else {
      return;
    }
  };
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <View>
      <Separator bordered style={[settingsStyles.separator, sharedStyles.dynamicPageBackgroundColor]}>
        <Text style={settingsStyles.separatorText}>Support me</Text>
      </Separator>

      {props.skus.map((skuInfo, i) => {
        return (
          <ListItem key={skuInfo.sku} button onPress={() => checkIfPurchased(i)}>
            <Body>
              <Text style={sharedStyles.dynamicTextColor}>
                {skuInfo.userFacingText}
              </Text>
            </Body>
            {skuInfo.purchased ? (
              <Checkmark true={true} />
            ) : null}
          </ListItem>
        );
      })}
    </View>
  );
};

const SupportMessage = () => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <View style={settingsStyles.messageContainer}>
      <Text style={sharedStyles.dynamicTextColor}>
        I'm one guy. I don't do this for a living, I do this because I love movies. Any support you can give will go to
        polishing the app and paying developer fees. I really appreciate it.
      </Text>
    </View>
  );
};

export default SettingsPage;
