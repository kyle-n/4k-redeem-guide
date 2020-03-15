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

type SettingsPageProps = {};

const SettingsPage = (props: SettingsPageProps) => {
  return (
    <Container>
      <Content>
        <DownloadsSettings />
        <SupportOptions />
        <SupportMessage />
      </Content>
    </Container>
  );
};

const settingsStyles = StyleSheet.create({
  separator: {
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
      <Separator bordered>
        <Text style={settingsStyles.separator}>Downloads</Text>
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

const SupportOptions = () => {
  return (
    <View>
      <Separator bordered>
        <Text style={settingsStyles.separator}>Support me</Text>
      </Separator>

      <ListItem button>
        <Body>
          <Text>$5 - A cup of coffee</Text>
        </Body>
      </ListItem>

      <ListItem button>
        <Body>
          <Text>$10 - A really nice gift, thank you!</Text>
        </Body>
      </ListItem>

      <ListItem>
        <Body>
          <Text>$20 - My new favorite person</Text>
        </Body>
      </ListItem>
    </View>
  );
};

const SupportMessage = () => (
  <View style={settingsStyles.messageContainer}>
    <Text style={settingsStyles.message}>
      I'm one guy. I don't do this for a living, I do this because I love movies. Any support you can give will go to
      polishing the app and paying developer fees. I really appreciate it.
    </Text>
  </View>
)

export default SettingsPage;
