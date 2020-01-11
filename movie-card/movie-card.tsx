import React from 'react';
import {CardSize, Movie} from '../models';
import {Card, View} from 'native-base';
import {StyleSheet} from 'react-native';
import MovieCardBody from './movie-card-body';
import MovieCardHeader from './movie-card-header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Hr} from '../shared-components';
import CheckmarkChart from '../search/checkmark-chart';

type MovieCardProps = {
  movie: Movie;
  size: CardSize;
};
type MovieCardState = {
  textPairsOpen: boolean;
  checkmarkChartOpen: boolean;
};

class MovieCard extends React.Component<MovieCardProps, MovieCardState> {
  constructor(props: MovieCardProps) {
    super(props);

    this.state = {
      textPairsOpen: props.size > 0,
      checkmarkChartOpen: props.size > 1
    };
  }

  toggleTextPairsOpen = () => {
    this.setState({textPairsOpen: !this.state.textPairsOpen});
  };
  toggleCheckmarkChartOpen = () => {
    this.setState({checkmarkChartOpen: !this.state.checkmarkChartOpen});
  };

  render() {
    return (
      <MovieCardLayout movie={this.props.movie}
                       onPressHeader={this.toggleTextPairsOpen}
                       onPressTextPairs={this.toggleCheckmarkChartOpen}
                       showTextPairs={this.state.textPairsOpen}
                       showCheckmarkChart={this.state.checkmarkChartOpen} />
    );
  }
}

type MovieCardLayoutProps = {
  movie: Movie;
  showTextPairs: boolean;
  showCheckmarkChart: boolean;
  onPressHeader: () => void;
  onPressTextPairs: () => void;
};

const movieCardStyles = StyleSheet.create({
  card: {
    alignSelf: 'stretch'
  }
});

const MovieCardLayout = (props: MovieCardLayoutProps) => (
  <Card style={movieCardStyles.card}>
    <TouchableOpacity onPress={props.onPressHeader}>
      <MovieCardHeader imageUrl={props.movie.imageUrl}
                       title={props.movie.title}
                       studio={props.movie.studio}
                       year={props.movie.year} />
    </TouchableOpacity>
    {props.showTextPairs ? (
      <MovieCardBody movie={props.movie} />
    ) : null}
    {props.showCheckmarkChart ? (
      <View>
        <Hr />
        <CheckmarkChart movie={props.movie} />
      </View>
    ) : null}
  </Card>
);

export default MovieCard;
