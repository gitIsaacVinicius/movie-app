import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Colors from "../../constants/colors";
import { Feather, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

const RightIcon = ({ icon }: {icon?: any}) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.righticonwrapper}>
            {icon ? icon : <Feather name="search" size={24} color={Colors.text} />}
        </TouchableOpacity>
    )
}

const TabLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarInactiveBackgroundColor: Colors.gray,
            tabBarActiveBackgroundColor: Colors.background,
            tabBarStyle: {
                backgroundColor: Colors.background,
                borderColor: Colors.background
            }
            
        }}>
          <Tabs.Screen name='(home)/index' options={{
            tabBarIcon: ({color}) => (
                <Feather name="home" size={20} color={color}/>
            ),
            tabBarLabel: "Início",
            headerShown: false,
          }}/> 
          
          <Tabs.Screen name='movies' options={{
            tabBarIcon: ({color}) => (
                <Feather name="play-circle" size={20} color={color}/>
            ),
            tabBarLabel: "Filmes",
            headerShown: false,
          }}/> 
          
          <Tabs.Screen name='series' options={{
            tabBarIcon: ({color}) => (
                <Feather name="folder" size={20} color={color}/>
            ),
            tabBarLabel: "TV/Séries",
            headerShown: false,
          }}/> 
          
          <Tabs.Screen name='profile' options={{
            tabBarIcon: ({color}) => (
                <Octicons name="person" size={20} color={color}/>
            ),
            tabBarLabel: "Perfil",
            headerStyle: {backgroundColor: Colors.background},
            headerTitle: "",
            headerRight: () => {
              return (
                <RightIcon icon={<MaterialCommunityIcons name="cog-outline" color={Colors.text} size={24}/>} />
              )
            },
            headerLeft: () => <Text style={styles.title}>Meu Perfil</Text>

          }}/> 
        </Tabs>
    );
}

export default TabLayout;

const styles = StyleSheet.create({
  righticonwrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 45,
    marginRight: 14,
    borderRadius: "50%",
    backgroundColor: "#202020",
  },
  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "600",
    marginLeft: 14,
  }
});