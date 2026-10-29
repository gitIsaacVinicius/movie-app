import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/colors";
import { ms } from "../../screen-dimensions";
import SectionHeader from "../../components/SectionHeader";
import { movies } from "../../mock-data";
import MovieCard from "../../components/MovieCard";

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{alignItems: "center", justifyContent: "center", marginVertical: 20}}>
                    <Image source={require("@/assets/images/profile.jpg")} style={styles.profile}/>

                    <Text style={styles.name}>Kelvin</Text>
                    <Text style={{color: Colors.gray, textAlign: "center"}}>Kelvin@email.com</Text>
                </View>

                <Text style={{color: Colors.primary, fontWeight: "600", fontSize: 16, marginHorizontal: 12}}>
                    Histórico de visualização
                </Text>

                <View style={{marginVertical: 12}}>
                    <SectionHeader title="Ontem" /> 
                    <FlatList data={movies} renderItem={( {item} ) => (
                        <MovieCard genre={item.genre} title={item.title} image={item.image} 
                        />
                    )} 
                    horizontal
                    />
                </View>
                
                <View style={{marginBottom: 12}}>
                    <SectionHeader title="20 de Outubro de 2026" /> 
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
  }
});