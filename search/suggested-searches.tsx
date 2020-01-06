import React from 'react';
import {Button, View, Text} from 'native-base';
import {PresetSearch} from '../models';

const presetSearches: PresetSearch[] = [
	{
		title: '"Batman" movies',
		query: 'Batman'
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
	<View>
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
	<Button onPress={() => props.onPress(props.presetSearch)} rounded light>
		<Text>{props.presetSearch.title}</Text>
	</Button>
);

export default SuggestedSearches;
