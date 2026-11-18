import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFetch } from "../hooks/useFetch";
import { Movie } from "../types";

import Colors from "../constants/colors";
import MovieCard from "../components/MovieCard";



export default function SearchScreen() {
    const router = useRouter()
    const { type } = useLocalSearchParams<{ type?: "movie" | "tv" | "multi"}>()
    const [query, setQuery] = useState("")

    const searchType = (type || "multi").trim()
    const endpoint = query.trim().length > 0 ? `/search/${searchType}` : "/trending/all/day"

    const { data, loading } = useFetch(endpoint, {
        query: query.trim(),
        include_adult: false,
        language: "pt-BR",
        page: 1,
    })

    const results: Movie[] = (data?.results || []).filter((item: any) => item.media_type !== "person")

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Feather name="chevron-left" size={26} color={Colors.text} />
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                    <Feather name="search" size={20} color={Colors.gray} />

                    <TextInput style={styles.input} placeholder="Buscar filmes e séries" placeholderTextColor={Colors.gray}
                    value={query} onChangeText={setQuery} autoFocus returnKeyType="search" />
                    
                    {query.length > 0 && (
                        <TouchableOpacity onPress={() => setQuery("")}>
                            <Feather name="x" size={18} color={Colors.gray} />
                        </TouchableOpacity>
                    )}

                </View>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color = {Colors.primary} style={{marginTop: 40}} />
            ): (
                <FlatList data={results} keyExtractor={(item) => String(item.id)} numColumns={3} 
                    contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 20 }} renderItem={({ item }) => <MovieCard movie={item}/>}
                    ListEmptyComponent={<Text style={styles.emptyText}>Nenhum resultado encontrado.</Text>}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 10,
  },
  backBtn: {
    backgroundColor: "#202020",
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 45,
    gap: 8,
  },
  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 16,
  },
  emptyText: {
    color: Colors.gray,
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
})