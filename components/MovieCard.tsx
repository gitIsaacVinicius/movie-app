import {Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import { hs, ms, vs } from "../screen-dimensions";
import Colors from "../constants/colors";

interface MovieCardProps {
    title: string,
    genre: string,
    image?: ImageSourcePropType | undefined;
}

const MovieCard = ({title, genre, image}: MovieCardProps) => {
    return (
        <TouchableOpacity activeOpacity={.8} style={styles.container}>
            <Image style={styles.image} 
            source={image} />

            <View>
                <Text numberOfLines={1} style={{color: Colors.text, fontWeight: "600", fontSize: ms(14)}}>
                    {title}
                </Text>
                <Text numberOfLines={1} style={{color: Colors.gray, fontSize: ms(10)}}>
                    {genre}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export default MovieCard;

const styles = StyleSheet.create({
    container: {
        width: hs(110),
        marginHorizontal: 8,
        marginBottom: 14,
    },
    image: {
        width: "100%",
        height: vs(150),
        borderRadius: 10,
    },
});
