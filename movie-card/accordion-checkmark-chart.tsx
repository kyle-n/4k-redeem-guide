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
type AccordionCheckmarkChartState = {
  open: boolean;
};

class AccordionCheckmarkChart extends React.Component<AccordionCheckmarkChartProps, AccordionCheckmarkChartState> {
  constructor(props: AccordionCheckmarkChartProps) {
    super(props);

    this.state = {open: false};
  }

  render() {
    return (
      <View style={accordionCheckmarkChartStyles.container}>
        <Accordion dataArray={[{title: 'Format and availability', content: ''}]}
                   expanded={this.state.open ? 0 : -1}
                   style={accordionCheckmarkChartStyles.accordion}
                   renderContent={() => (
                     <CheckmarkChart movie={this.props.movie} />
                   )} />
      </View>
    );
  }
}

export default AccordionCheckmarkChart;
