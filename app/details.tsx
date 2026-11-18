import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import Colors from "../constants/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AppButton from "../components/AppButton";
import SectionHeader from "../components/SectionHeader";
import { movies } from "../mock-data";
import MovieCard from "../components/MovieCard";
import { getGenreString } from "../utils/genres";
import { TMDB_IMAGE_BASE_PATH, useFetch } from "../hooks/useFetch";
import { default_image } from "../utils/assets";
import { Movie } from "../types";

const DetailsScreen = () => {
    const router = useRouter();

    const {title, backdrop_path, date, genere_ids, overview, rating} = useLocalSearchParams<any>()
    const yearReleased = date?.split("-")[0] ?? ""

    const backdrop_image = backdrop_path ? `${TMDB_IMAGE_BASE_PATH}${backdrop_path}` : null

    const params = {
        include_adult: false,
        include_video: false,
        language: "pt-BR",
        page: 1,
        sort_by: "popularity.desc",
    }

    const {data} = useFetch("/discover/movie", params)
    const similarMovies: Movie[] = data?.results

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.overview}>
                    <Image style={styles.overviewImage} source={backdrop_image ? {uri: backdrop_image} : default_image} />
                    
                    <SafeAreaView edges={["top"]} style={styles.cover}>
                        <View style={{flex: 1, paddingHorizontal: 14}}>
                            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8} style={styles.backbtnwrapper}>
                                <Feather name="chevron-left" size={26} color={Colors.text}/>
                            </TouchableOpacity>
                        </View>

                        <LinearGradient style={styles.blur} colors={["transparent", Colors.background]}>
                            <Text numberOfLines={1} style={{fontSize: 26, fontWeight: "600", color: Colors.text}}>
                                {title}
                            </Text>

                            <Text style={{color: Colors.gray}}>
                                {`${yearReleased} | ${getGenreString(genere_ids.split(",") || [])}`}
                            </Text>

                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <AntDesign name="star" size={16} color={"#FF891B"} />
                                <Text style={{color: "#FF891B", fontWeight: "600", marginLeft: 6}}>{rating}</Text>
                            </View>
                        </LinearGradient>
                    </SafeAreaView>
                </View>

                <View style={{padding: 14}}>
                    <View style={{flexDirection: "row", alignItems: "center", gap: 12}}>
                        <AppButton 
                        title="Assista agora"
                        style={{backgroundColor: Colors.primary}}
                        icon={<FontAwesome5 name="play" size={16} color={Colors.text} />}
                        />

                        <AppButton  
                        title="Baixar" 
                        style={{borderColor: Colors.gray}}
                        icon={<Feather name="download" size={16} color={Colors.text} />}/>
                    </View>

                    <View style={styles.btnwrapper}>
                        <TouchableOpacity activeOpacity={.6} style={{alignItems: "center"}}>
                            <Feather name="bookmark" size={16} color={Colors.text}/>
                            <Text style={{fontSize: 10, color: Colors.text}}>Salvar</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity activeOpacity={.6} style={{alignItems: "center", marginLeft: 18}}>
                            <Ionicons name="paper-plane-outline" size={16} color={Colors.text}/>
                            <Text style={{fontSize: 10, color: Colors.text}}>Compartilhar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{backgroundColor: Colors.background}}>
                        <Text style={{color: Colors.text, fontWeight: "600", fontSize: 18}}>Sobre</Text>
                        
                        <Text style={{color: Colors.text, fontSize: 12, marginTop: 10}}>
                            {overview}
                        </Text>
                    </View>
                </View>

                <View style={{marginVertical: 20}}>
                    <SectionHeader title="Você também deve gostar" /> 
                    <FlatList data={similarMovies || []} renderItem={( {item} ) => (
                        <MovieCard movie={item} />
                    )} 
                    horizontal
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    overview: {
        height: 400,
        position: "relative",
    },
    overviewImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    cover: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 9999,
        justifyContent: "space-between",
        backgroundColor: "rgba(30, 30, 30, 0.4)",
    },
    backbtnwrapper: {
        backgroundColor: "#202020",
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    blur: {
        height: 120,
        width: "100%",
        padding: 14,
        justifyContent: "space-between",
    },
    btnwrapper:{
        flexDirection:"row",
        alignItems: "center",
        marginVertical: 16,
    }
});
