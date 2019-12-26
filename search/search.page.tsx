import React from 'react';
import {Button, Text, View} from 'react-native';
import LoadingRedirect from './loading-redirect';
import {getMovies} from '../store';

const SearchPage = (props: any) => {
  const navToLoadingPage = () => props.navigation.navigate('LoadingPage');
  console.log(getMovies().length)
  return (
    <View>
      <LoadingRedirect redirect={navToLoadingPage}/>
      <Text>Search</Text>
      <Button title="Go load" onPress={() => props.navigation.navigate('LoadingPage')} />
    </View>
  );
};

export default SearchPage;
