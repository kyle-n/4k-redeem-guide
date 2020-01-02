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
  'Deleting the Snyder cut',
  'Hot Rod is an American masterpiece on the crisis in American masculinity. In this essay, I will',
  'Revving the mortal engines',
  'Re-sizing the little women',
  'Repeatedly yelling "My man!"',
  'Dropping the "the"',
  'Buying a boat called "Craw Daddy"'
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
    let editedMessageGroup: string[];
    if (messageGroup.length) editedMessageGroup = messageGroup.slice();
    else editedMessageGroup = loadingMessages.slice();

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
      goGoofy: false
    };

    let updateMessage: number;
    props.navigation.addListener('willFocus', () => {
      updateMessage = setInterval(() => {
        let messageGroupName: string;

        if (this.state.goGoofy) messageGroupName = 'goofyMessages';
        else messageGroupName = 'loadingMessages';

        let newMessageGroup: string[], message: string;
        // @ts-ignore
        [message, newMessageGroup] = LoadingMessage.extractMessage(this.state[messageGroupName]);

        const update: any = {message, goGoofy: !this.state.goGoofy};
        update[messageGroupName] = newMessageGroup;

        this.setState(update, () => console.log(this.state));
      }, 5 * 1000);
    });

    props.navigation.addListener('willBlur', () => clearInterval(updateMessage));
  }

  render() {
    return (
      <Text>
        {this.state.message}
        {this.state.message ? '...' : ''}
      </Text>
    );
  }
}

export default LoadingMessage;
