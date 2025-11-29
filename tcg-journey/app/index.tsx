import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, world!</Text>
      <Link href={"/about"} style={styles.button}>
        Go to About Screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#131313ff"
  },
  text: {
    color: "white"
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "white"
  }
});