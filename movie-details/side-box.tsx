import React from 'react';
import {getMovieDetails, MovieDetailsResponse} from '../store/tmdb.connector';

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
    return (
      
    );
  }

}
