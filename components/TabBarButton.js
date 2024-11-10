import {Text, StyleSheet, Pressable} from 'react-native'

const TabBarButton = props => {
    console.log(props.to)

    const {children, onPress} = props

if(props.to === '/Search'){
    return (
      <Pressable onPress={onPress} style={[styles.inactiveBtnLeft, {backgroundColor: '#1D1D1E'}]}>
                <Text>{children}</Text>
            </Pressable>
    )
} else if (props.to === '/ProfileStack'){
    return (
      <Pressable onPress={onPress} style={[styles.inactiveBtnRight, {backgroundColor: '#1D1D1E'}]}>
                <Text>{children}</Text>
            </Pressable>
    )
} else {
    return (
      <Pressable onPress={onPress} style={[styles.inactiveBtn, {backgroundColor: '#1D1D1E'}]}>
                <Text>{children}</Text>
            </Pressable>
    )
}
}

export default TabBarButton

const styles=StyleSheet.create({
    inactiveBtn: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inactiveBtnLeft: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        marginLeft: 20
    },
    inactiveBtnRight: {
        flex:1,
        justifyContent: 'center',
        marginRight: 20,
        alignItems: 'center',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    }
})