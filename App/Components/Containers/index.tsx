import useThemeColor from "../../Hooks/useThemeColor";
import { IApp, IThemedComponent } from "../../Interfaces";
import { View } from 'react-native'

export type IContainer = View['props'] & IThemedComponent
export type ContainerSpaceBetween = IContainer & {
    justify: 'flex-start' | 'center' | 'space-between' | 'flex-end'
    align: 'center' | 'baseline'
}

export const ContainerFlex = (props: IContainer) => {
    const { style, ...otherProps } = props
    const { background } = useThemeColor()
    const styles: IContainer['style'] = {
        backgroundColor: background,
        flex: 1
    }
    return <View style={[styles, style]} {...otherProps} />
}

export const ContainerBlock = (props: IContainer) => {
    const { style, ...otherProps } = props
    const { background2 } = useThemeColor()
    const styles: IContainer['style'] = {
        backgroundColor: background2,
        padding: 10
    }
    return <View style={[styles, style]} {...otherProps} />
}

export const ContainerSpaceBetween = (props: ContainerSpaceBetween) => {
    const { style, justify = 'space-between', align, ...otherProps } = props
    const { background2 } = useThemeColor()
    const styles: IContainer['style'] = {
        backgroundColor: background2,
        padding: 10,
        justifyContent: justify,
        alignItems: align
    }
    return <View style={[styles, style]} {...otherProps} />
}