import React from 'react';
import {CardSize, Movie} from '../models';
import {Card, View} from 'native-base';
import {StyleSheet} from 'react-native';
import MovieCardBody from './movie-card-body';
import MovieCardHeader from './movie-card-header';
import {TouchableOpacity} from 'react-native-gesture-handler';

type MovieCardProps = {
  movie: Movie;
  cardSize: CardSize;
};
type MovieCardState = {
  cardBodyOpen: boolean;
};

class MovieCard extends React.Component<MovieCardProps, MovieCardState> {
  constructor(props: MovieCardProps) {
    super(props);

    this.state = {
      cardBodyOpen: props.cardSize > 0
    };
  }

  componentDidUpdate(prevProps: Readonly<MovieCardProps>): void {
    if (prevProps !== this.props) {
      this.setState({cardBodyOpen: this.props.cardSize > 0})
    }
  }

  toggleCardDetailsOpen = (): void => {
    this.setState({cardBodyOpen: !this.state.cardBodyOpen});
  };

  render() {
    return (
      <MovieCardLayout movie={this.props.movie}
                       onPressHeader={this.toggleCardDetailsOpen}
                       showCardBody={this.state.cardBodyOpen} />
    );
  }
}

type MovieCardLayoutProps = {
  movie: Movie;
  showCardBody: boolean;
  onPressHeader: () => void;
};

const movieCardStyles = StyleSheet.create({
  card: {
    alignSelf: 'stretch'
  }
});

const MovieCardLayout = (props: MovieCardLayoutProps) => (
  <Card style={movieCardStyles.card}>
    <TouchableOpacity onPress={props.onPressHeader}>
      <MovieCardHeader movie={props.movie}
                       open={props.showCardBody} />
    </TouchableOpacity>
    {props.showCardBody ? (
      <MovieCardBody movie={props.movie} />
    ) : null}
  </Card>
);

export default MovieCard;
