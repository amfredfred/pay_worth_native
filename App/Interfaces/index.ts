import { TouchableOpacity } from 'react-native'

export interface IThemedComponent {
    isVisible?: boolean
}

export interface IColors {
    background: string
    headerBackground: string
    text: string
    headline: string
    primary: string
    secondary: string
    accent: string
    success: string
    error: string
    warning: string
    background2: string
}

// Interface for defining themes
export interface ITheme {
    light: IColors
    dark: IColors
}

export interface IApp {
    themeColors: ITheme
}