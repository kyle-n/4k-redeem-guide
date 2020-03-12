import React from 'react';
import {Body, Container, Content, Icon, Left, ListItem, Right, Separator, Switch, Text, View} from 'native-base';
import {DownloadIcon} from '../shared-components';

type SettingsPageProps = {};

const SettingsPage = (props: SettingsPageProps) => {
  return (
    <Container>
      <Content>
        <Separator bordered>
          <Text>Downloads</Text>
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

        <Separator bordered>
          <Text>Support me</Text>
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

      </Content>
    </Container>
  );
};

export default SettingsPage;
