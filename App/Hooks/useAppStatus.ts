import { useEffect, useLayoutEffect, useState } from 'react';
import { AppState } from 'react-native';
import {
    useFonts,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_500Medium,
    Montserrat_900Black,
    Montserrat_800ExtraBold
} from '@expo-google-fonts/montserrat'
import * as SplashScreen from 'expo-splash-screen';

export type IAppStatus = {
    status: "active" | "background" | "inactive" | "isLoading" | "isLoaded"
}

SplashScreen.preventAutoHideAsync();

const useAppStatus = (): IAppStatus => {
    const [appStatus, setAppStatus] = useState<IAppStatus['status']>('active');

    const [fontsLoaded, error] = useFonts({
        Montserrat_500Medium_Italic,
        Montserrat_600SemiBold,
        Montserrat_700Bold,
        Montserrat_500Medium,
        Montserrat_900Black,
        Montserrat_800ExtraBold
    });

    useLayoutEffect(() => {
        ; (async () => {
            if (fontsLoaded) {
                await SplashScreen.hideAsync();
                return setAppStatus('isLoaded')
            }
        })();
    }, [fontsLoaded]) 

    useEffect(() => {
        const handleAppStateChange = (nextAppState: any) => {
            // Determine the app status based on the nextAppState value
            if (!fontsLoaded) return setAppStatus('isLoading')
            !(nextAppState === 'active') || setAppStatus('active')
            !(nextAppState === 'background') || setAppStatus('background')
            !(nextAppState === 'inactive') || setAppStatus('inactive')
        }

        // Subscribe to the AppState change event
        const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

        // Clean up the subscription when the component unmounts
        return () => {
            appStateSubscription.remove()
        }
    }, [fontsLoaded])

    return {
        status: appStatus
    }
}

export default useAppStatus