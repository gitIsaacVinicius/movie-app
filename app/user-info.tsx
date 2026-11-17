import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Colors from "../constants/colors";
import { api } from "../utils/api";
import { ms } from "../screen-dimensions";

interface UserResponseDTO {
    name: string;
    email: string;
}

const UserInfoScreen = () => {
    const [user, setUser] = useState<UserResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get<UserResponseDTO>("/user/me");
                setUser(response.data);
            } catch (error: any) {
                console.log("Erro ao buscar dados do usuário:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color={Colors.text} />
            </TouchableOpacity>

            <View style={styles.content}>
                <Image source={require("@/assets/images/profile.jpg")} style={styles.avatar} />

                {loading ? (
                    <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 20 }} />
                ) : (
                    <View style={styles.infoBox}>
                        <Text style={styles.label}>Nome</Text>
                        <Text style={styles.value}>{user?.name || "Não encontrado"}</Text>

                        <Text style={styles.label}>E-mail</Text>
                        <Text style={styles.value}>{user?.email || "Não encontrado"}</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default UserInfoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 16,
    },
    backButton: {
        marginBottom: 20,
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        width: ms(140),
        height: ms(140),
        borderRadius: 100,
        marginBottom: 24,
    },
    infoBox: {
        width: "85%",
        backgroundColor: "#1E1E1E",
        borderRadius: 12,
        padding: 20,
    },
    label: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: "600",
        marginTop: 10,
    },
    value: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: "500",
        marginTop: 4,
    },
});