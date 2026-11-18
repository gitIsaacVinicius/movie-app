import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppButton from "@/components/AppButton";
import MovieCard from "@/components/MovieCard";
import SectionHeader from "@/components/SectionHeader";
import Colors from "@/constants/colors";
import { useFetch } from "@/hooks/useFetch";
import { ms } from "@/screen-dimensions";
import { Movie } from "@/types";
import { api } from "@/utils/api";

const ProfileScreen = () => {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    useFocusEffect(
        useCallback(() => {
            const fetchUserData = async () => {
                try {
                    const response = await api.get("/user/me");
                    setUser(response.data);
                } catch (error: any) {
                    console.log("Erro ao buscar dados do usuário:", error.response?.data || error.message);
                }
            };

            fetchUserData();
        }, [])
    )
    
    const params = {
        include_adult: false,
        include_video: false,
        language: "pt-BR",
        page: 1,
        sort_by: "popularity.desc",
    }

    const {data: yesterdayData} = useFetch("/discover/movie", params)
    const {data: dateData} = useFetch("/discover/movie", {...params, page: 2})
    
    const yesterdayMovies: Movie[] = yesterdayData?.results
    const dateMovies: Movie[] = dateData?.results

    const handleLogout = () => {
        Alert.alert("Sair da conta", "Tem certeza que deseja encerrar sua sessão?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Sair", style: "destructive", onPress: async () => {delete api.defaults.headers.common["Authorization"];
                router.replace("/(login)")
            }}
        ])
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{alignItems: "center", justifyContent: "center", marginVertical: 20}}>
                    <TouchableOpacity onPress={() => router.push("../user-info")} activeOpacity={0.7}>
                        <Image source={require("@/assets/images/profile.jpg")} style={styles.profile}/>
                    </TouchableOpacity>
                    

                    <Text style={styles.name}>{user?.name || "Carregando..."}</Text>
                    <Text style={{color: Colors.gray, textAlign: "center"}}>{user?.email || ""}</Text>
                </View>

                <Text style={{color: Colors.primary, fontWeight: "600", fontSize: 16, marginHorizontal: 12}}>
                    Histórico de visualização
                </Text>

                <View style={{marginVertical: 12}}>
                    <SectionHeader title="Ontem" /> 
                    <FlatList data={yesterdayMovies || []} renderItem={( {item} ) => (
                        <MovieCard movie={item} />
                    )} 
                    horizontal
                    />
                </View>
                
                <View style={{marginBottom: 12}}>
                    <SectionHeader title="20 de Outubro de 2026" /> 
                    <FlatList data={dateMovies || []} renderItem={( {item} ) => (
                        <MovieCard movie={item} />
                    )} 
                    horizontal
                    />
                </View>

                <View style={styles.logoutContainer}>
                    <AppButton title="Sair da conta" icon={<Ionicons name="log-out-outline" size={20} color={Colors.text} />} 
                        style={styles.logoutButton} onPress={handleLogout}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 4
  },
  profile: {
    width: ms(150),
    height: ms(150),
    borderRadius: 100,
  },
  name: {
    fontSize: ms(22),
    color: Colors.text,
    fontWeight: "600",
    marginTop: 12,
    textAlign: "center",
  },
  logoutContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  logoutButton: {
    backgroundColor: Colors.primary,
    width: "70%",
    height: 50,
  }
});