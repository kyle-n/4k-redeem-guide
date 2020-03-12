import React from 'react';
import {Body, Container, Content, Icon, Left, ListItem, Right, Separator, Switch, Text, View} from 'native-base';
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
  message: {
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
          <Icon name="radio-tower" type="Octicons" />
        </Left>
        <Body>
          <Text>Auto-download movies on data</Text>
        </Body>
        <Right>
          <Switch value={false} />
        </Right>
      </ListItem>

      <ListItem icon button>
        <Left>
          <Icon name="autorenew" type="MaterialIcons" />
        </Left>
        <Body>
          <Text>Download movies now</Text>
        </Body>
        <Right>
          <DownloadIcon />
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
