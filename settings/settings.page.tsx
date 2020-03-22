import React from 'react';
import {
  Body,
  Button,
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
import {baseFontSize, sharedDynamicStyleSheet} from '../styles';
import RNIap from 'react-native-iap';
import {SkuInfo} from './settings.page.container';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import RefreshCacheButton from '../search-header/refresh-cache-button';

type SettingsPageProps = {
  skus: SkuInfo[];
  onPressDownloadIcon: () => void;
};

const SettingsPage = (props: SettingsPageProps) => {
  return (
    <Container>
      <Content>
        <DownloadsSettings onPressDownloadIcon={props.onPressDownloadIcon} />
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
}

const DownloadsSettings = (props: DownloadsSettingsProps) => {
  return (
    <View>
      <Separator bordered style={settingsStyles.separator}>
        <Text style={settingsStyles.separatorText}>Downloads</Text>
      </Separator>

      <ListItem icon>
        <Left>
          <View style={settingsStyles.iconContainer}>
            <Icon name="radio-tower" type="MaterialCommunityIcons" />
          </View>
        </Left>
        <Body>
          <Text>Auto-download movies on data</Text>
        </Body>
        <Right>
          <Button info transparent>
            <Switch value={false} />
          </Button>
        </Right>
      </ListItem>

      <ListItem icon button>
        <Left>
          <View style={settingsStyles.iconContainer}>
            <Icon name="autorenew" type="MaterialIcons" />
          </View>
        </Left>
        <Body>
          <Text>Download movies now</Text>
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
      <Separator bordered style={settingsStyles.separator}>
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

const SupportMessage = () => (
  <View style={settingsStyles.messageContainer}>
    <Text>
      I'm one guy. I don't do this for a living, I do this because I love movies. Any support you can give will go to
      polishing the app and paying developer fees. I really appreciate it.
    </Text>
  </View>
);

export default SettingsPage;
