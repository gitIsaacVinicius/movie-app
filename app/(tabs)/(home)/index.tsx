import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../../../constants/colors";
import OverviewSection from "../../../components/OverviewSection";
import MovieCard from "../../../components/MovieCard";
import { movies } from "../../../mock-data";
import ContinueWatchingMovieCard from "../../../components/ContinueWatchingMovieCard";

const SectionHeader = ({title}:{title: string}) => {
    return (
        <View style={styles.sectionheader}>
            <Text style={{color: Colors.text, fontWeight: "600", fontSize: 16}}>{title}</Text>
            
            <TouchableOpacity activeOpacity={.8} style={{padding: 10}}>
                <Text style={{ color: Colors.primary}}>Veja mais</Text>
            </TouchableOpacity>
        </View>
    )
}

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <OverviewSection />

                <View style={{marginVertical: 20}}>
                    <SectionHeader title="Populares agora" /> 
                    <FlatList data={movies} renderItem={( {item} ) => (
                        <MovieCard genre={item.genre} title={item.title} image={item.image} 
                        />
                    )} 
                    horizontal
                    />
                </View>

                <View style={{marginVertical: 20}}>
                    <SectionHeader title="Continuar assistindo" />
                        <FlatList data={[...movies].reverse()} renderItem={( {item} ) => (
                            <ContinueWatchingMovieCard  genre={item.genre} title={item.title} image={item.image} />
                        )} 
                        horizontal
                        />    
                </View>

                
                <View style={{marginVertical: 20}}>
                    <SectionHeader title="Novos lançamentos" /> 
                    <FlatList data={movies} renderItem={( {item} ) => (
                        <MovieCard genre={item.genre} title={item.title} image={item.image} 
                        />
                    )} 
                    horizontal
                    />
                </View>

                <View style={{marginVertical: 20}}>
                    <SectionHeader title="Escolhas internacionais" /> 
                    <FlatList data={[...movies].reverse()} renderItem={( {item} ) => (
                        <MovieCard genre={item.genre} title={item.title} image={item.image} 
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
    sectionheader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
        paddingHorizontal: 14,
    }
});