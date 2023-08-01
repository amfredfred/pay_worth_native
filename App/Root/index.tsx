import { useEffect, useState } from "react"
import { Text, Keyboard } from "react-native"
import UserLayout from "../Layouts/User"
import GuestLayout from "../Layouts/Guest"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from "../Screens/Guest/Landing";


export default function Root() {
    const [isAuthenticated, setisAuthenticated] = useState(false)

    const Stack = createNativeStackNavigator();

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {isAuthenticated ?
                    <UserLayout>
                        <Text>USer</Text>
                    </UserLayout>
                    :
                    <GuestLayout>
                        <Text>Guest</Text>
                        <Stack.Navigator initialRouteName="Landing">
                            <Stack.Screen name='Landing' component={Landing} options={{ title: 'Welcome' }} />
                        </Stack.Navigator>
                        <Text>Guest</Text>
                    </GuestLayout>
                }
            </NavigationContainer>
        </SafeAreaProvider>
    )
}