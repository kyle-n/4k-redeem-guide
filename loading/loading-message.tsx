import React from 'react';
import {Text} from 'native-base';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {sharedDynamicStyleSheet} from '../styles';

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
  'Hot Rod is an American masterpiece. In this essay, I will',
  'Revving mortal engines',
  'Re-sizing little women',
  'Repeatedly yelling "My man!"',
  'Dropping the "the"',
  'Buying a boat called "Craw Daddy"',
  'Scrapbooking some Karen\'s boys',
  'Making the Kessel run',
  'Undoing all the good parts of "The Last Jedi"'
];

type LoadingMessageProps = {};
type LoadingMessageState = {
  message: string;
  loadingMessages: string[];
  goofyMessages: string[];
  goGoofy: boolean;
  intervalId: any;
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
      message: 'Loading films',
      loadingMessages: loadingMessages.slice(),
      goofyMessages: goofyMessages.slice(),
      goGoofy: true,
      intervalId: -1
    };
  }

  componentDidMount(): void {
    const intervalId = setInterval(() => {
      let messageGroupName: string;

      if (this.state.goGoofy) messageGroupName = 'goofyMessages';
      else messageGroupName = 'loadingMessages';

      let newMessageGroup: string[], message: string;
      // @ts-ignore
      [message, newMessageGroup] = LoadingMessage.extractMessage(this.state[messageGroupName]);

      const update: any = {message, goGoofy: !this.state.goGoofy};
      update[messageGroupName] = newMessageGroup;

      this.setState(update);
    }, 5 * 1000);
    this.setState({intervalId});
  }

  componentWillUnmount(): void {
    this.destroyInterval();
  }

  destroyInterval = () => {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
  };

  render() {
    return (
      <MessageText message={this.state.message} />
    );
  }
}

type MessageTextProps = {
  message: string;
};
const MessageText = (props: MessageTextProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <Text style={[sharedStyles.dynamicTextColor]}>
      {props.message}
      {props.message ? '...' : ''}
    </Text>
  );
};

export default LoadingMessage;
