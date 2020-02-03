import React from 'react';
import {CardSize, Movie} from '../../../models';
import {Card} from 'native-base';
import {StyleSheet} from 'react-native';
import MovieCardBody from './movie-card-body';
import MovieCardHeader from './movie-card-header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {darkLightGray, sharedDynamicStyleSheet} from '../../../styles';
import {getMovieImage} from '../../../store/tmdb.connector';

type MovieCardProps = {
  movie: Movie;
  cardSize: CardSize;
};
type MovieCardState = {
  cardBodyOpen: boolean;
  backgroundImgUrl: string;
  backgroundImgLoaded: boolean;
};

class MovieCard extends React.PureComponent<MovieCardProps, MovieCardState> {
  constructor(props: MovieCardProps) {
    super(props);

    this.state = {
      cardBodyOpen: props.cardSize > 0,
      backgroundImgUrl: '',
      backgroundImgLoaded: false
    };
  }

  componentDidMount(): void {
    getMovieImage(this.props.movie.title, this.props.movie.year).then(url => {
      const update: any = {backgroundImgLoaded: true};
      if (url) update.backgroundImgUrl = url;
      this.setState(update);
    });
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
    return this.state.backgroundImgLoaded ? (
      <MovieCardLayout movie={this.props.movie}
                       onPressHeader={this.toggleCardDetailsOpen}
                       backgroundImgUrl={this.state.backgroundImgUrl}
                       showCardBody={this.state.cardBodyOpen} />
    ) : null;
  }
}

type MovieCardLayoutProps = {
  backgroundImgUrl: string;
  movie: Movie;
  showCardBody: boolean;
  onPressHeader: () => void;
};

const movieCardStyles = StyleSheet.create({
  card: {
    alignSelf: 'stretch',
    borderColor: darkLightGray
  }
});

const MovieCardLayout = (props: MovieCardLayoutProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <Card style={[movieCardStyles.card, sharedStyles.squareEntity, sharedStyles.dynamicColor]}>
      <TouchableOpacity onPress={props.onPressHeader}>
        <MovieCardHeader movie={props.movie}
                         open={props.showCardBody} />
      </TouchableOpacity>
      {props.showCardBody ? (
        <MovieCardBody movie={props.movie} />
      ) : null}
    </Card>
  );
};

export default MovieCard;
