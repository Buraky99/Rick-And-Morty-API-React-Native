import React from 'react';
import {View, ActivityIndicator, Text, FlatList, StyleSheet, Image, Pressable} from 'react-native';
import Http from '../libs/http';
import CharacterItem from './CharacterItem';

class EpisodeDetail extends React.Component{

    state={
        loading: false,
        characters: [],
        episode: null,
        character: null,
    }

    componentDidMount = async ()=>{
        this.setState({loading:true});
        const res = await Http.instance.get(this.props.route.params.episode_url);
        this.setState({episode: res});
        const {episode} = this.state 
        if(episode){
            let characters_info = []
            //console.log(character.episode)
            for (let i in episode.characters){
                //console.log(character.episode[i]);
                characters_info.push(await Http.instance.get(episode.characters[i]));
            }
            
            this.setState({characters:characters_info})
        }
        this.setState({loading:false});
    }

    handleCharacterPress = (character_url) =>{
        console.log(character_url)
        this.props.navigation.navigate('CharacterDetail',{character_url});
    }
    
    render(){
        const {characters, loading, episode} = this.state;
        return(
            <View>
                {episode?
                    <View style={styles.container}>
                      <Image source={require('../Assets/randm.png')}
                        style={styles.image}></Image>
                        <View style={styles.description}>
                            <Text style={styles.text}>Name: {episode.name}</Text>
                            <Text style={styles.text}>Air_Date: {episode.air_date}</Text>
                            <Text style={styles.text}>Episode: {episode.episode}</Text>
                        </View>
                    </View>
                    
                :null
                }
                {loading?
                <ActivityIndicator 
                    color='#005' 
                    size='large'
                    style={styles.loader}
                    >
                </ActivityIndicator>
                :
                    <FlatList
                    style={styles.characters_list}
                    data={characters} 
                    renderItem={
                        ({item}) => {
                            return(
                                <View>
                                    <Pressable onPress={()=>this.handleCharacterPress('https://rickandmortyapi.com/api/character/'+item.id)}>
                                    <CharacterItem item={item}></CharacterItem>
                                    </Pressable>
                                </View>
                            );
                        }
                    }>
                    </FlatList>
                }                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height: '45%',
        backgroundColor: '#4D4A95',
        alignItems:'center'
    },
    description:{
        padding:20,
        marginTop:20,
        backgroundColor: '#035',
        width:'100%'
    },
    characters_list:{
        padding:20,
        backgroundColor: '#4D4A95',
        width:'100%'
    },
    loader:{
        marginTop:10,
    },
    image: {
        marginTop:20,
        width: '80%',
        height: '60%',
    },
    text:{
        fontSize: 18,
        color: '#53eae3'
    }
}); 

export default EpisodeDetail;