import React from 'react';
import {Movie} from '../../models';
import {getMovieImage} from '../../store/tmdb.connector';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {withNavigation} from 'react-navigation';
import MovieCardLayout from '../../movie-details/movie-card-layout';

type MovieCardProps = {
  movie: Movie;
  width?: number;
} & NavigationStackScreenProps;
type MovieCardState = {
  backgroundImgUrl: string;
  backgroundImgLoaded: boolean;
};

class MovieCardLink extends React.PureComponent<MovieCardProps, MovieCardState> {
  constructor(props: MovieCardProps) {
    super(props);

    this.state = {
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

  navToMovieDetails = (): void => {
    this.props.navigation.navigate('MovieDetailsPage', {movie: this.props.movie});
  };

  render() {
    return this.state.backgroundImgLoaded ? (
      <MovieCardLayout movie={this.props.movie}
                       onPressHeader={this.navToMovieDetails}
                       backgroundImgUrl={this.state.backgroundImgUrl}
                       showCardBody={false}
                       width={this.props.width} />
    ) : null;
  }
};

export default withNavigation(MovieCardLink);
