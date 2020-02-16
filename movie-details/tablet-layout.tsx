import React from 'react';
import {baseImageUrl, getMovieDetails, MovieDetailsResponse} from '../store/tmdb.connector';
import {Text, View} from 'native-base';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {baseFontSize, sharedDynamicStyleSheet} from '../styles';
import {LayoutProps} from './movie-details.page';
import {Movie} from '../models';
import {ImageBackground, StyleSheet} from 'react-native';
import MovieCard from './movie-card';
import {MovieCardHeaderMarkup, MovieTitle} from './movie-card-header';
import MovieInfoAsideBox from './movie-info-aside-box';

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
      <TabletLayoutBox movie={this.props.movie} details={this.state.details} />
    ) : null;
  }
}

const layoutStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%'
  },
  imageBackground: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: baseFontSize * 40
  },
  imageView: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  movieTitle: {
    width: '100%',
    height: 8 * baseFontSize,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: baseFontSize * 4
  },
  innermostTitleContainer: {
    width: '100%',
    textAlign: 'left'
  },
  halfWidthInItem: {
    flexGrow: 1,
    maxWidth: '50%',
    margin: baseFontSize
  }
});

type SideBoxMarkupProps = {
  details: MovieDetailsResponse;
  movie: Movie;
};
const TabletLayoutBox = (props: SideBoxMarkupProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <View style={[
      sharedStyles.squareEntity,
      sharedStyles.dynamicTextColor,
      sharedStyles.dynamicPageBackgroundColor,
      layoutStyles.container
    ]}>
      {props.details?.backdrop_path ? (
        <MovieImageSplash backdropPath={props.details.backdrop_path}
                          movie={props.movie} />
      ) : null}
      <View style={layoutStyles.item}>
        <View style={layoutStyles.halfWidthInItem}>
          <MovieCard movie={props.movie} open={true} />
        </View>
        {props.details ? (
          <View style={[layoutStyles.halfWidthInItem, {paddingTop: baseFontSize / 4}]}>
            <MovieInfoAsideBox details={props.details} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

type MovieImageSplashProps = {
  backdropPath: string | undefined;
  movie: Movie;
};
const MovieImageSplash = (props: MovieImageSplashProps) => (
  <ImageBackground source={{uri: baseImageUrl + props.backdropPath}}
                   style={[
                     layoutStyles.imageBackground,
                     layoutStyles.item
                   ]}>
    <View style={layoutStyles.imageView}>
      <View style={layoutStyles.movieTitle}>
        <View style={layoutStyles.innermostTitleContainer}>
          <MovieCardHeaderMarkup parentProps={{movie: props.movie, open: false, backgroundImgUrl: ''}} biggetText={true} />
        </View>
      </View>
    </View>
  </ImageBackground>
);

export default TabletLayout;
