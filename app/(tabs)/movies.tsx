import { TouchableOpacity, ScrollView, StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import Colors from "../../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { movies } from "../../mock-data";
import MovieCard from "../../components/MovieCard";
import FilterItem from "../../components/FilterItem";

const MoviesScreen = () => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", alignItems: "center", marginVertical: 20}}>
                <ScrollView horizontal showsVerticalScrollIndicator={false}>
                    <FilterItem title="Categoria" />
                    <FilterItem title="Região" />
                    <FilterItem title="Ano de lançamento" />
                </ScrollView>

                <TouchableOpacity activeOpacity={0.8} style={{padding: 10}}>
                    <MaterialCommunityIcons name="filter-outline" size={24} color={Colors.text}/>
                </TouchableOpacity>
            </View>

            <FlatList 
                data={movies}
                renderItem={({item}) => (
                    <MovieCard genre={item.genre} title={item.title} image={item.image} />
                )}
                numColumns={3}
            />
        </View>
    );
}

export default MoviesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    
});