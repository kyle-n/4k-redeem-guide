import React from 'react';
import {Body, Container, Content, Left, ListItem, Right, Switch, Text, View} from 'native-base';
import {DownloadIcon} from '../shared-components';

type SettingsPageProps = {};

const SettingsPage = (props: SettingsPageProps) => {
  return (
    <Container>
      <Content>
        <ListItem icon>
          <Left>
            <DownloadIcon />
          </Left>
          <Body>
            <Text>Auto-download movies on data</Text>
          </Body>
          <Right>
            <Switch value={false} />
          </Right>
        </ListItem>
      </Content>
    </Container>
  );
};

export default SettingsPage;
