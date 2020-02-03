import React from 'react';
import {CardSize, Movie} from '../../../models';
import {Card} from 'native-base';
import {StyleSheet} from 'react-native';
import MovieCardBody from './movie-card-body';
import MovieCardHeader from './movie-card-header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {baseFontSize, darkLightGray, sharedDynamicStyleSheet, slideFromUnder350} from '../../../styles';
import {getMovieImage} from '../../../store/tmdb.connector';
import * as Animatable from 'react-native-animatable';

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
    <Animatable.View animation="slideInUp"
                     duration={750}
                     useNativeDriver={true}>
      <Card style={[movieCardStyles.card, sharedStyles.squareEntity, sharedStyles.dynamicColor]}>
        <TouchableOpacity onPress={props.onPressHeader}>
          <MovieCardHeader movie={props.movie}
                           backgroundImgUrl={props.backgroundImgUrl}
                           open={props.showCardBody} />
        </TouchableOpacity>
        {props.showCardBody ? (
          <Animatable.View animation={slideFromUnder350}
                           duration={350}
                           useNativeDriver={false}>
            <MovieCardBody movie={props.movie} />
          </Animatable.View>
        ) : null}
      </Card>
    </Animatable.View>
  );
};

export default MovieCard;
