import { ActivityIndicator, View, StyleSheet } from "react-native"
import { GlobalStyles } from "../../contants/styles"

const LoadingOverlay = () => {
  return (
    <View style={styles.loadingContainer}>
        <ActivityIndicator color="white" size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
    loadingContainer: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700

    }
})

export default LoadingOverlay