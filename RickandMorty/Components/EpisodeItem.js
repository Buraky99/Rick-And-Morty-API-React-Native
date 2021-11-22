import React, { useState, useRef } from 'react';
import {View, Text, Image,StyleSheet,FlatList,characters} from 'react-native';
import CharacterItem from './CharacterItem';

const EpisodeItem = ({item,index})=>{

    return(
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.text}>{item.episode}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>{}</Text>
                <Image source={{uri: item.image}} key={index}
                    style={styles.tinyLogo}></Image>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        padding: 20,
        margin:1,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        backgroundColor:'#035',
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    row:{
        flexDirection:'row',
    },
    nameText:{
        color: '#fff',
        fontSize: 16,
        marginRight: 8,
        fontWeight: 'bold',
    },
    text:{
        color: '#fff',
        fontSize: 14,

    },
    priceText:{
        fontSize:14,
        color:'#035'
    },
});

export default EpisodeItem;
