import React from 'react';
import { View,Text} from 'react-native';

export default function Line({navigation}) {
    return (
        <View style={{
            height: 1,
            backgroundColor: '#ccc',
            alignSelf: 'stretch'
        }} navigation={navigation}><Text>poa</Text></View>
    )
}