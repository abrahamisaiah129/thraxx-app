import { Image, StyleSheet, Text, View } from 'react-native';

export function AppSplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/splash-icon.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Traxx</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    marginTop: 16,
    color: '#208AEF',
    fontSize: 24,
    fontWeight: '700',
  },
});
