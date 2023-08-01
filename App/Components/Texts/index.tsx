import useColorSchemes from "../../Hooks/useColorSchemes";
import { IApp, IThemedComponent } from "../../Interfaces";
import { View, Text } from 'react-native'

export type ISpanText = Text['props'] & IThemedComponent

export const SpanText = (props: ISpanText) => {
    const { isVisible = true, style, ...otherProps } = props
    const { textColor } = useColorSchemes()

    const styles: ISpanText['style'] = {
        color: textColor,
        fontWeight: '500',
        fontSize: 18
    }

    return <Text style={[styles, style]} {...otherProps} />
}