import React from 'react';
import {Button, View, Text} from 'native-base';
import {PresetSearch} from '../models';
import {baseFontSize} from '../styles'

const presetSearches: PresetSearch[] = [
	{
		title: '"John Wick" movies',
		query: 'John Wick'
	},
	{
		title: 'Movies from 1974',
		query: '1974'
	},
	{
		title: 'Paramount films',
		query: 'Paramount'
	}
];

type SuggestedSearchesProps = {
	setSearch: Function;
};

const SuggestedSearches = (props: SuggestedSearchesProps) => (
	<View style={{alignSelf: 'stretch', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
		{presetSearches.map(presetSearch => {
			return (
				<SuggestedSearch presetSearch={presetSearch}
												 onPress={props.setSearch}
												 key={presetSearch.title} />
			);
		})}
	</View>
);

type SuggestedSearchProps = {
	onPress: Function;
	presetSearch: PresetSearch;
};

const SuggestedSearch = (props: SuggestedSearchProps) => (
	<Button onPress={() => props.onPress(props.presetSearch)}
					style={{marginVertical: 0.5 * baseFontSize, marginHorizontal: baseFontSize}}
					rounded light>
		<Text>{props.presetSearch.title}</Text>
	</Button>
);

export default SuggestedSearches;
