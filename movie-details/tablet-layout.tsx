import React from 'react';
import {baseImageUrl, getMovieDetails, MovieDetailsResponse} from '../store/tmdb.connector';
import {View} from 'native-base';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {baseFontSize, darkLightGray, sharedDynamicStyleSheet} from '../styles';
import {LayoutProps} from './movie-details.page';
import {Movie} from '../models';
import {ImageBackground, StyleSheet} from 'react-native';
import {MovieCardHeaderMarkup} from './movie-card-header';
import MovieInfoAsideBox from './movie-info-aside-box';
import MovieCardBody from './movie-card-body';
import * as Animatable from 'react-native-animatable';

type SideBoxState = {
  details: MovieDetailsResponse | null;
  reqDone: boolean;
};

class TabletLayout extends React.Component<LayoutProps, SideBoxState> {
  constructor(props: LayoutProps) {
    super(props);

    this.state = {
      details: null,
      reqDone: false
    };
  }

  componentDidMount(): void {
    getMovieDetails(this.props.movie.title, this.props.movie.year)
      .then(details => {
        this.setState({details});
      }).finally(() => {
        this.setState({reqDone: true})
      });
  }

  render() {
    return this.state.reqDone ? (
      <TabletLayoutBox movie={this.props.movie} details={this.state.details} reqDone={this.state.reqDone} />
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
    height: 12 * baseFontSize,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: baseFontSize * 6
  },
  innermostTitleContainer: {
    width: '100%',
    height: baseFontSize * 12,
    textAlign: 'left'
  },
  halfWidthInItem: {
    flexGrow: 1,
    maxWidth: '47%',
    margin: baseFontSize
  }
});

type SideBoxMarkupProps = {
  details: MovieDetailsResponse;
  movie: Movie;
  reqDone: boolean;
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

      {props.details?.backdrop_path && props.reqDone ? (
        <MovieImageSplash backdropPath={props.details.backdrop_path}
                          movie={props.movie} />
      ) : null}
      {!props.details?.backdrop_path && props.reqDone ? (
        <MovieCardHeaderMarkup parentProps={{movie: props.movie, open: false, backgroundImgUrl: ''}} biggetText={true} />
      ) : null}

      <View style={layoutStyles.item}>
        <View style={layoutStyles.halfWidthInItem}>
          <Animatable.View style={[
            sharedStyles.squareEntity,
            {borderWidth: 1, borderColor: darkLightGray}
          ]} animation="slideInUp" duration={750}>
            <MovieCardBody movie={props.movie} roundedCorners={true} />
          </Animatable.View>
        </View>
        {props.details ? (
          <Animatable.View style={[layoutStyles.halfWidthInItem, {paddingTop: baseFontSize / 4}]}
                           animation="slideInUp" duration={750}>
            <MovieInfoAsideBox details={props.details} />
          </Animatable.View>
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
        <Animatable.View style={layoutStyles.innermostTitleContainer}
                         animation="slideInUp" duration={750}>
          <MovieCardHeaderMarkup parentProps={{movie: props.movie, open: false, backgroundImgUrl: ''}} biggetText={true} />
        </Animatable.View>
      </View>
    </View>
  </ImageBackground>
);

export default TabletLayout;
