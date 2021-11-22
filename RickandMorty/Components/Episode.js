import React from 'react';
import {View, ActivityIndicator, Pressable, Text, StyleSheet, FlatList} from 'react-native';
import Http from '../libs/http';
import EpisodeItem from './EpisodeItem';
import CharacterItem from './CharacterItem';

class Episode extends React.Component{
    state ={
        episodes:[],
        loading: false,
        next: null,
        prev: null,
    }

    componentDidMount = async ()=>{
        this.setState({loading:true});
        const res = await Http.instance.get('https://rickandmortyapi.com/api/episode');
        this.setState({episodes: res.results, loading:false});
        if(res.info.next){
            this.setState({next:res.info.next });
        }
        if(res.info.prev){
            this.setState({prev:res.info.prev });    
        }
    }
    
    
    handleNextPress = async () =>{
        const {next} = this.state;
        this.setState({loading:true});
        const res = await Http.instance.get(next);
        console.log('Go to Next Page ');
        this.setState({episodes: res.results, loading:false});
        if(res.info.next){
            this.setState({next:res.info.next });
        }
        else{
            this.setState({next:null})
        }
        if(res.info.prev){
            this.setState({prev:res.info.prev });    
        }else{
            this.setState({prev:null})
        }

    }
    handlePrevPress = async () =>{
        const {prev} = this.state;
        this.setState({loading:true});
        const res = await Http.instance.get(prev);
        console.log('Go to Next Page ');
        this.setState({episodes: res.results, loading:false});

        if(res.info.next){
            this.setState({next:res.info.next });
        }
        else{
            this.setState({next:null})
        }
        if(res.info.prev){
            this.setState({prev:res.info.prev });    
        }else{
            this.setState({prev:null})
        }

    }
    
    handleCharacterPress = (episode_url) =>{
        console.log(episode_url)
        this.props.navigation.navigate('EpisodeDetail',{episode_url});
    }

    render(){
        
        const {episodes, loading, next, prev} = this.state;
        return(
            <View style={styles.container}>
                {loading?
                <ActivityIndicator 
                    color='#000' 
                    size='large'
                    style={styles.loader}
                    >
                </ActivityIndicator>
                :null
                }
                <FlatList 
                    data={episodes} 
                    renderItem={
                        ({item}) => {
                            return(
                                <View>
                                    <Pressable onPress={()=>this.handleCharacterPress('https://rickandmortyapi.com/api/episode/'+item.id)}>
                                    <EpisodeItem item={item}></EpisodeItem>
                                    </Pressable>
                                </View>
                            );
                        }
                    }>
                </FlatList>
                {prev?
                <Pressable style={styles.btn}
                onPress={this.handlePrevPress}>
        
                    <Text style={styles.btnText}>Previous</Text>
                </Pressable>
                :null
                }
                {next?
                <Pressable style={styles.btn}
                onPress={this.handleNextPress}>
                    <Text style={styles.btnText}>Next</Text>
                </Pressable>
                :null
                }
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6b4a95',

    },
    btn:{
        padding: 0,
        backgroundColor: '#4D4A95',
        height:30,
        margin:1,   
    },

    btnText:{
        color: '#53eae3',
        textAlign: 'center',
        fontSize: 22,
    },
    loader:{
        marginTop:10,
    },
});

export default Episode;