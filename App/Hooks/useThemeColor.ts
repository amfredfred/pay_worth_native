import { useColorScheme } from "react-native";
import { ITheme } from "../Interfaces/Interfaces";

export default function useThemeColors(): ITheme['dark' | 'light'] {
    const currentColorScheme = useColorScheme()
    const schemes: ITheme = {
        dark: {
            background: '#050807',//#050807
            headerBackgorund: '#17181A',
            text: '#EAEAEA',
            text2: '#666E80',
            headline: '#E1E2E6',
            primary: '#9602D3',
            secondary: '#4BC7EF',
            accent: "#3838E4",
            sucess: '#07D95A',
            error: 'red',
            warning: '#FF6347',
            background2: '#17181A',
        },
        light: {
            background: '#F7F8FA',
            headerBackgorund: '#FFFFFF',
            text: '#333333',
            text2: '#333333',
            headline: '#98A1B3',
            primary: '#4C0E87',
            secondary: '#2EA7FA',
            accent: "#3838E4",
            sucess: '#07D95A',
            error: 'red',
            warning: '#FF6347',
            background2: '#FFFFFF',
        },
    }
    return schemes?.[currentColorScheme || 'light']
}