import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import FilterItem from "@/components/FilterItem";
import MovieCard from "@/components/MovieCard";
import Colors from "@/constants/colors";
import { useFetch } from "@/hooks/useFetch";
import { Movie } from "@/types";

const MoviesScreen = () => {
    const [page, setPage] = useState(1)
    const [genre, setGenre] = useState<number | undefined>(undefined)
    const [year, setYear] = useState<number | undefined>(undefined)

    const { data: genresData } = useFetch("/genre/movie/list", { language: "pt-BR" })
    const genres = genresData?.genres || []

    const years = [
        { id: 2025, name: "2025" },
        { id: 2024, name: "2024" },
        { id: 2023, name: "2023" },
        { id: 2022, name: "2022" },
        { id: 2021, name: "2021" },
    ]

    const params = {
        include_adult: false,
        include_video: false,
        language: "pt-BR",
        page,
        sort_by: "popularity.desc",
        with_genres: genre,
        primary_release_year: year,
    }

    const {data, loading} = useFetch("/discover/movie", params)

    const movies: Movie[] = data?.results

    const handleRefresh = () => {
        const randomPage = Math.floor(Math.random() * 10) + 1
        setPage(randomPage)
    }

    const clearFilters = () => {
        setGenre(undefined)
        setYear(undefined)
        setPage(1)
    }

    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", alignItems: "center", marginVertical: 20}}>
                <ScrollView horizontal showsVerticalScrollIndicator={false}>
                    <FilterItem title="Categoria" options={genres} selectedValue={genre} onSelect={(id) => { setGenre(id); setPage(1); }} />
                    <FilterItem title="Ano de lançamento" options={years} selectedValue={year} onSelect={(id) => { setYear(id); setPage(1); }} />
                </ScrollView>

                <TouchableOpacity activeOpacity={0.8} style={{padding: 10}} onPress={clearFilters} >
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