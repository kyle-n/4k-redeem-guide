import React from 'react';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {NavigationStackProp} from 'react-navigation-stack/src/types';
import {NavigationParams, NavigationRoute} from 'react-navigation';
import {Text} from 'native-base';

const loadingMessages: string[] = [
  'Downloading 4K movie database',
  'Processing movies for fast search',
  'Caching movies so we don\'t have to do this again',
  'Preparing a fast, beautiful user interface'
];
const goofyMessages = [
  'Gathering all of Kathryn Hahn\'s great supporting performances (this might take a minute)',
  'Getting far from the shallows now',
  'Defending Spider-Man 3',
  'Deleting the Snyder cut'
];

type LoadingMessageProps = {
  navigation: NavigationStackProp<NavigationRoute, NavigationParams>;
};
type LoadingMessageState = {
  message: string;
  loadingMessages: string[];
  goofyMessages: string[];
  goGoofy: boolean;
};

class LoadingMessage extends React.Component<LoadingMessageProps, LoadingMessageState> {
  private static extractMessage(messageGroup: string[]): [string, string[]] {
    const editedMessageGroup = messageGroup.slice();
    const index = Math.floor(Math.random() * messageGroup.length);
    const message: string = editedMessageGroup.splice(index, 1)[0];
    return [message, editedMessageGroup];
  }

  constructor(props: LoadingMessageProps) {
    super(props);

    this.state = {
      message: '',
      loadingMessages: loadingMessages.slice(),
      goofyMessages: goofyMessages.slice(),
      goGoofy: true
    };

    let updateMessage: number;
    props.navigation.addListener('willFocus', () => {
      updateMessage = setInterval(() => {
        let messageGroupToUpdate: string[];
        let message = '';
        const update: any = {message: null, messageGroup: null, goGoofy: !this.state.goGoofy};
        let newMessageGroup: string[];

        if (this.state.goGoofy) messageGroupToUpdate = this.state.goofyMessages;
        else messageGroupToUpdate = this.state.loadingMessages;

        [message, newMessageGroup] = LoadingMessage.extractMessage(messageGroupToUpdate);
        update.message = message;
        update.messageGroup = newMessageGroup;

        this.setState(update);
      }, 2 * 1000);
    });

    props.navigation.addListener('willBlur', () => clearInterval(updateMessage));
  }

  render() {
    return (
      <Text>
        {this.state.message}
      </Text>
    );
  }
}

export default LoadingMessage;
