import { TouchableOpacity, ScrollView, StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MovieCard from "../../components/MovieCard";
import FilterItem from "../../components/FilterItem";
import { useFetch } from "../../hooks/useFetch";
import { Movie } from "../../types";

const MoviesScreen = () => {
    const [page, setPage] = useState(1)
    const params = {
        include_adult: false,
        include_video: false,
        language: "pt-BR",
        page,
        sort_by: "popularity.desc",
    }

    const {data, loading} = useFetch("/discover/movie", params)

    const movies: Movie[] = data?.results

    const handleRefresh = () => {
        const randomPage = Math.floor(Math.random() * 10) + 1
        setPage(randomPage)
    }

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

            <View style={{flex: 1}}>
                <FlatList 
                data={movies}
                renderItem={({item}) => (
                    <MovieCard movie={item} />
                )}
                numColumns={3}
                refreshControl={
                    <RefreshControl 
                        refreshing={loading}
                        onRefresh={handleRefresh}
                        colors={[Colors.gray]}
                        tintColor={Colors.gray}
                    />
                }
            />
            </View>
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