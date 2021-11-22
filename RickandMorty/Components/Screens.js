import React, { useEffect, useRef } from "react"
import { Animated, Image, View, Text, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MainScreen from "../Components/MainScreen";

//Giriş resmi
import Icon from '../Assets/rm_icon.png'


const CBG = "#4D4A95"

export default function Screens(){

    //SafeArea
    const edges = useSafeAreaInsets();
    
    //Animasyon
    const startAnimation = useRef(new Animated.Value(0)).current;

    //Eşitleme
    const Eicon = useRef(new Animated.Value(1)).current;
    const Etext = useRef(new Animated.Value(1)).current;

    //Hareket
    const Micon = useRef(new Animated.ValueXY({x: 0,y: 0})).current;
    const Mtext = useRef(new Animated.ValueXY({x: 0,y: 0})).current;

    useEffect(() => {

        //500ms Animasyon başlat    
        setTimeout(() => {
            
            Animated.parallel([
                Animated.timing(
                    startAnimation,{
                        toValue: -Dimensions.get('window').height + (edges.top + 80),
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    Eicon,{
                        toValue: 0.3,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    Etext,{
                        toValue: 0.8,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    Micon,{
                        toValue: {
                            x: (Dimensions.get("window").width / 2) - 35,
                            y: (Dimensions.get('window').height / 2) - 5
                    },
                    useNativeDriver: true
                    }
                ),  
                Animated.timing(
                    Mtext,{
                        toValue: {
                            x: 0,
                            y: (Dimensions.get('window').height / 2) - 90
                    },
                    useNativeDriver: true
                    }
                ),
                
            ]).start();

        }, 500);

    },[])
    return(
        //Animasyon Kısmı
        <View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        }}>
            <Animated.View style={{
                flex: 1,            
                backgroundColor: CBG,
                zIndex: 1,
                transform: [{
                    translateY: startAnimation
                }]
            }}>

                <Animated.View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Animated.Image source={Icon} style={{
                        width: 200,
                        height: 200,
                        marginBottom: 40,
                        transform:[
                            {translateX: Micon.x},
                            {translateY: Micon.y},
                            {scale: Eicon},
                    ]
                    }}></Animated.Image>
                <Animated.Text style={{
                    fontSize: 25,
                    bottom: 70,
                    fontWeight: 'bold',
                    color: 'white',
                    transform:[
                        {translateY: Mtext.y},
                        {scale: Etext}
                        ]
                }}>Rick And Morty</Animated.Text>  
                </Animated.View>
            </Animated.View>
            
            <Animated.View style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#4D4A95',
                zIndex: 0
            }}>

       <MainScreen>
            
            </MainScreen>

            </Animated.View>
        </View>
    );
}