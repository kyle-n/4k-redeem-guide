import React from 'react';
import {Movie} from '../models';
import {Accordion, View} from 'native-base';
import {StyleSheet} from 'react-native';
import CheckmarkChart from '../search/checkmark-chart';

const accordionCheckmarkChartStyles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column'
  },
  accordion: {
    alignSelf: 'stretch'
  }
});

type AccordionCheckmarkChartProps = {
  movie: Movie;
};

const AccordionCheckmarkChart = (props: AccordionCheckmarkChartProps) => (
  <View style={accordionCheckmarkChartStyles.container}>
    <Accordion dataArray={[{title: 'Format and availability', content: ''}]}
               expanded={0}
               style={accordionCheckmarkChartStyles.accordion}
               renderContent={() => (
                 <CheckmarkChart movie={props.movie} />
               )} />
  </View>
);

export default AccordionCheckmarkChart;
