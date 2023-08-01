import { TouchableOpacity } from 'react-native'

export interface IThemedComponent {
    isVisible?: boolean
}

export interface ITheme {
    light: {
        background: string
        textColor: string
        headlineColor: string
        primaryColor: string
        secondaryColor: string
        accentColor: string
        sucessColor: string
        errorColor: string
        warningColor: string
        elevation: number
        borderRadius: number
        background2: string
        opacity: number
    }
    dark: {
        background: string
        textColor: string
        headlineColor: string
        primaryColor: string
        secondaryColor: string
        accentColor: string
        sucessColor: string
        errorColor: string
        warningColor: string
        elevation: number
        borderRadius: number
        background2: string
        opacity: number
    }
}

export interface IApp {
    themeColors: ITheme
}