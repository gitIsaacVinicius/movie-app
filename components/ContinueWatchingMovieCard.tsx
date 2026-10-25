import {DimensionValue, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import { hs, ms, vs } from "../screen-dimensions";
import Colors from "../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";

interface ContinueWatchingMovieCardProps {
    title: string,
    genre: string,
    image?: ImageSourcePropType | undefined;
}

const ContinueWatchingMovieCard = ({title, genre, image}: ContinueWatchingMovieCardProps) => {
    const getRandomPercentage = (): DimensionValue => {
        const min = 10;
        const max = 100;
        const value = Math.floor(Math.random() * (max - min + 1)) + min;
        return `${value}%`;
    }

    const randomPercentage = getRandomPercentage()

    return (
        <View style={styles.container}>
            <View style={{position: "relative"}}>
        
                <TouchableOpacity style={styles.pressplay}>
                    <FontAwesome5 name="play" size={24} color={"#202020"} />
                </TouchableOpacity>

                <Image source={image} style={styles.image} />

                <View style={styles.progressbarcontainer}>
                    <View style={[styles.progress, {width: randomPercentage}]} />
                </View>

                <View style={{marginTop: 8}}>
                    <Text numberOfLines={1} style={{color: Colors.text, fontWeight: "600", fontSize: 16}}>
                        {title}
                    </Text>

                    <Text numberOfLines={1} style={{color: Colors.gray, fontSize: 12}}>
                        {genre}
                    </Text>
                </View>

            </View>
        </View>
    );
}

export default ContinueWatchingMovieCard;

const styles = StyleSheet.create({
    container: {
        width: hs(240),
        marginHorizontal: 8,
    },
    image: {
        width: "100%",
        height: vs(170),
        borderRadius: 6,
    },
    pressplay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },
    progressbarcontainer: {
        marginTop: 8,
        height: 3,
        width: "100%",
        backgroundColor: Colors.text,
        borderRadius: 4,
        overflow: "hidden",
    },
    progress: {
        height: "100%",
        backgroundColor: Colors.primary,
        borderRadius: 4,
    }
});
