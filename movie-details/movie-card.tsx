import React from 'react';
import {Movie} from '../models';
import {getMovieImage} from '../store/tmdb.connector';
import MovieCardLayout from './movie-card-layout';

type MovieCardProps = {
  movie: Movie;
  onPressHeader?: () => void;
  width?: number;
};
type MovieCardState = {
  backgroundImgUrl: string;
  backgroundImgLoaded: boolean;
};

class MovieCard extends React.PureComponent<MovieCardProps, MovieCardState> {
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

  render() {
    return this.state.backgroundImgLoaded ? (
      <MovieCardLayout movie={this.props.movie}
                       onPressHeader={this.props.onPressHeader}
                       backgroundImgUrl={this.state.backgroundImgUrl}
                       showCardBody={true}
                       width={this.props.width} />
    ) : null;
  }
};

export default MovieCard;
