import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Colors from "../../constants/colors";
import { Feather, Octicons } from "@expo/vector-icons";

const TabLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarInactiveBackgroundColor: Colors.gray,
            tabBarActiveBackgroundColor: Colors.primary,
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
          
          <Tabs.Screen name='(home)/movies' options={{
            tabBarIcon: ({color}) => (
                <Feather name="play-circle" size={20} color={color}/>
            ),
            tabBarLabel: "Filmes",
            headerShown: false,
          }}/> 
          
          <Tabs.Screen name='(home)/series' options={{
            tabBarIcon: ({color}) => (
                <Feather name="folder" size={20} color={color}/>
            ),
            tabBarLabel: "TV/Séries",
            headerShown: false,
          }}/> 
          
          <Tabs.Screen name='(home)/profile' options={{
            tabBarIcon: ({color}) => (
                <Octicons name="person" size={20} color={color}/>
            ),
            tabBarLabel: "Perfil",
            headerShown: false,
          }}/> 
        </Tabs>
    );
}

export default TabLayout;

const styles = StyleSheet.create({});