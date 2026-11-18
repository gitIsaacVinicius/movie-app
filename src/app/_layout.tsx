import { Stack } from "expo-router";

export const unstable_settings = {
    anchor: "(login)/index",
};

export default function RootLayout() {
    return (
        <Stack
        screenOptions={{
            headerShown: false
        }}
        >
            <Stack.Screen name="(login)/index" />
            <Stack.Screen name="sign-up" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="details" />
            <Stack.Screen name="search" />
            <Stack.Screen name="user-info" />
        </Stack>
    )
}