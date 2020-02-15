import React from 'react';
import {getMovieDetails, MovieDetailsResponse} from '../store/tmdb.connector';
import {Text, View} from 'native-base';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {sharedDynamicStyleSheet} from '../styles';
import {LayoutProps} from './movie-details.page';

type SideBoxState = {
  details: MovieDetailsResponse | null;
};

class TabletLayout extends React.Component<LayoutProps, SideBoxState> {
  constructor(props: LayoutProps) {
    super(props);

    this.state = {
      details: null
    };
  }

  componentDidMount(): void {
    getMovieDetails(this.props.movie.title, this.props.movie.year).then(details => {
      this.setState({details});
    });
  }

  render() {
    return this.state.details ? (
      <TabletLayoutMarkup details={this.state.details} />
    ) : null;
  }
}

type SideBoxMarkupProps = {
  details: MovieDetailsResponse;
};
const TabletLayoutMarkup = (props: SideBoxMarkupProps) => {
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

export default TabletLayout;
