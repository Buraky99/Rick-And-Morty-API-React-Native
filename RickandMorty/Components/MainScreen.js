import React from 'react';
import Episode from './Episode'
import EpisodeDetail from './EpisodeDetail'
import Character from './Character'
import CharacterDetail from './CharacterDetail'
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();


class MainScreen extends React.Component{
    render(){
        return(
            <Stack.Navigator
            screenOptions = {{
                headerStyle:{
                    backgroundColor: '#4D4A95',
                },
                headerTintColor: '#53eae3',                
            }}
            >
            <Stack.Screen name='Episode' 
            component={Episode}></Stack.Screen>
            <Stack.Screen name='EpisodeDetail' 
            component={EpisodeDetail}></Stack.Screen>
            <Stack.Screen name='Character' 
            component={Character}></Stack.Screen>
            <Stack.Screen name='CharacterDetail' 
            component={CharacterDetail}></Stack.Screen>
            

            </Stack.Navigator>
        );
    }
}

export default MainScreen;