import React from 'react';
import {getMovieDetails, MovieDetailsResponse} from '../store/tmdb.connector';
import {Text, View} from 'native-base';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {sharedDynamicStyleSheet} from '../styles';

type SideBoxProps = {
  title: string;
  year?: number;
};
type SideBoxState = {
  details: MovieDetailsResponse | null;
};

class SideBox extends React.Component<SideBoxProps, SideBoxState> {
  constructor(props: SideBoxProps) {
    super(props);

    this.state = {
      details: null
    };
  }

  componentDidMount(): void {
    getMovieDetails(this.props.title, this.props.year).then(details => {
      this.setState({details});
    });
  }

  render() {
    return this.state.details ? (
      <SideBoxMarkup details={this.state.details} />
    ) : null;
  }
}

type SideBoxMarkupProps = {
  details: MovieDetailsResponse;
};
const SideBoxMarkup = (props: SideBoxMarkupProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <View style={[
      sharedStyles.squareEntity,
      sharedStyles.dynamicColor
    ]}>
      <Text>Yo</Text>
    </View>
  );
};

export default SideBox;
