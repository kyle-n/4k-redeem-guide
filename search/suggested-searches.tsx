import React from 'react';
import {Button, View, Text} from 'native-base';
import {PresetSearch} from '../models';
import {baseFontSize, darkColor, lightColor, lightGray, sharedDynamicStyleSheet} from '../styles'
import {DynamicStyleSheet, DynamicValue, useDynamicStyleSheet} from 'react-native-dark-mode';

const presetSearches: PresetSearch[] = [
	{
		title: '"John Wick" movies',
		query: 'John Wick'
	},
	{
		title: 'Movies Anywhere films in 4K on iTunes',
		filters: {
			vuduUhd: false,
			fandangoNowUhd: false,
			itunesUhd: true,
			itunesCodeRedeemsUhd: false,
			moviesAnywhere: true,
			dolbyVision: false,
			hdr: false,
			googlePlayUhd: false,
			amazonVideoUhd: false,
			microsoftUhd: false
		}
	},
	{
		title: 'Movies from 1974',
		query: '1974'
	},
	{
		title: 'Paramount films',
		query: 'Paramount'
	},
	{
		title: 'Movies with HDR and Dolby Vision',
		filters: {
			vuduUhd: false,
			fandangoNowUhd: false,
			itunesUhd: false,
			itunesCodeRedeemsUhd: false,
			moviesAnywhere: false,
			dolbyVision: true,
			hdr: true,
			googlePlayUhd: false,
			amazonVideoUhd: false,
			microsoftUhd: false
		}
	}
];

type SuggestedSearchesProps = {
	setSearch: (presetSearch: PresetSearch) => void;
};

const SuggestedSearches = (props: SuggestedSearchesProps) => (
	<View style={{alignSelf: 'stretch', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', backgroundColor: 'unset'}}>
		{presetSearches.map(presetSearch => {
			return (
				<SuggestedSearch presetSearch={presetSearch}
												 onPress={props.setSearch}
												 key={presetSearch.title} />
			);
		})}
	</View>
);

const dynamicStyleSheet = new DynamicStyleSheet({
	button: {
		borderColor: new DynamicValue(lightGray, 'black')
	}
});

type SuggestedSearchProps = {
	onPress: Function;
	presetSearch: PresetSearch;
};

const SuggestedSearch = (props: SuggestedSearchProps) => {
	const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
	const suggestedSearchStyles = useDynamicStyleSheet(dynamicStyleSheet);
	return (
		<Button onPress={() => props.onPress(props.presetSearch)}
						style={[{marginVertical: 0.5 * baseFontSize, marginHorizontal: baseFontSize}, suggestedSearchStyles.button]}
						rounded bordered light>
			<Text style={sharedStyles.dynamicTextColor}>{props.presetSearch.title}</Text>
		</Button>
	);
};

export default SuggestedSearches;
