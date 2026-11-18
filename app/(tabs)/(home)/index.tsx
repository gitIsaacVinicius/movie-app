import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../../../constants/colors";
import OverviewSection from "../../../components/OverviewSection";
import MovieCard from "../../../components/MovieCard";
import { movies } from "../../../mock-data";
import ContinueWatchingMovieCard from "../../../components/ContinueWatchingMovieCard";
import SectionHeader from "../../../components/SectionHeader";
import { useFetch } from "../../../hooks/useFetch";
import { Movie } from "../../../types";

function getRandomMovie(movies: Movie[]): Movie | null {
    if(!movies?.length) return null
    const withBackdrops = movies.filter((movie) => movie.backdrop_path)
    if (!withBackdrops.length) return null
    const randomMovie =
        withBackdrops[Math.floor(Math.random() * withBackdrops.length)]
    return randomMovie
}


const HomeScreen = () => {
    const currentYear = new Date().getFullYear()
    const params = {
        include_adult: false,
        include_video: false,
        language: "pt-BR",
        page: 1,
        sort_by: "popularity.desc",
    }

    const {data: trendingData, loading: trendingLoading} = useFetch("/discover/movie", params)

    const {data: newReleasesData, loading: newReleasesLoading} = useFetch("/discover/movie", {
      ...params,
      primary_release_year: currentYear
    })

    const {data: internacionalPicksData, loading: internacionalPicksLoading} = useFetch("/discover/tv", params)

    const {data: continueWatchingData, loading: continueWatchingLoading} = useFetch("/discover/tv", {
        ...params,
        page: 2,
    })

    const trendingMovies: Movie[] = trendingData?.results
    const newReleaseMovies: Movie[] = newReleasesData?.results
    const internationalPickMovies: Movie[] = internacionalPicksData?.results
    const continueWatchingMovies: Movie[] = continueWatchingData?.results

    const overviewMovie = getRandomMovie(trendingMovies)
    
    return (
        <View style={styles.container}>
            <ScrollView>
                <OverviewSection movie={overviewMovie}/>

                <View style={{marginVertical: 20}}>
                    <SectionHeader title="Populares agora" /> 
                    <FlatList data={trendingMovies} renderItem={({ item }) => (
                        <MovieCard movie={item}
                        />
                    )} 
                    horizontal
                    />
                </View>

                <View style={{marginVertical: 20}}>
                    <SectionHeader title="Continuar assistindo" />
                        <FlatList data={continueWatchingMovies} renderItem={( {item} ) => (
                            <ContinueWatchingMovieCard movie={item} />
                        )} 
                        horizontal
                        />    
                </View>

                
                <View style={{marginVertical: 20}}>
                    <SectionHeader title="Novos lançamentos" /> 
                    <FlatList data={newReleaseMovies} renderItem={( {item} ) => (
                        <MovieCard movie={item} 
                        />
                    )} 
                    horizontal
                    />
                </View>

                <View style={{marginVertical: 20}}>
                    <SectionHeader title="Escolhas internacionais" /> 
                    <FlatList data={internationalPickMovies} renderItem={( {item} ) => (
                        <MovieCard movie={item} 
                        />
                    )} 
                    horizontal
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
});