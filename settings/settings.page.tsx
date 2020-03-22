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
import {DownloadIcon} from '../shared-components';
import {StyleSheet} from 'react-native';
import {baseFontSize} from '../styles';
import RNIap, {Product} from 'react-native-iap';
import {SkuInfo} from './settings.page.container';

type SettingsPageProps = {
  skus: SkuInfo[];
};

const SettingsPage = (props: SettingsPageProps) => {
  return (
    <Container>
      <Content>
        <DownloadsSettings />
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

const DownloadsSettings = () => {
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
          <Button info transparent>
            <DownloadIcon />
          </Button>
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
  return (
    <View>
      <Separator bordered style={settingsStyles.separator}>
        <Text style={settingsStyles.separatorText}>Support me</Text>
      </Separator>

      {props.skus.map((skuInfo, i) => {
        return (
          <ListItem key={skuInfo.sku} button onPress={() => checkIfPurchased(i)}>
            <Body>
              <Text>{skuInfo.userFacingText}</Text>
            </Body>
          </ListItem>
        )
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
