import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";

function Login({ navigation }) {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <SafeAreaView style={style.background}>
      <View style={style.fundo}>
        <Text style={style.title}>Delivery</Text>
        <View>
          <TextInput
            onChangeText={cpf => setCpf(cpf)}
            placeholder="CPF"
            placeholderTextColor={"#666"}
            maxLength={11}
            style={style.cpf}
            autoCompleteType="off"
            autoCorrect={false}
            keyboardType="numeric"
          ></TextInput>
          <TextInput
            onChangeText={senha => setSenha(senha)}
            placeholder="Senha"
            placeholderTextColor={"#666"}
            maxLength={11}
            style={style.cpf}
            autoCompleteType="off"
            autoCorrect={false}
            secureTextEntry={true}
          ></TextInput>
          <View style={style.buttons}>
            <TouchableOpacity
              style={style.enter}
              onPress={() => {
                navigation.navigate("Main");
              }}
            >
              <MaterialIcons name="vpn-key" size={25} color="#1CB1B7" />
              <Text>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.cleans}>
              <MaterialIcons name="clear" size={25} color="#00425f" />
              <Text>Limpar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#00425f",
    justifyContent: "center",
    alignItems: "center"
  },
  fundo: {
    backgroundColor: "#ECEFF1",
    justifyContent: "space-around",
    height: 250,
    width: 330,
    borderRadius: 15
  },
  title: {
    fontSize: 25,
    color: "#666",
    textAlign: "center"
  },
  cpf: {
    backgroundColor: "#fff",
    fontSize: 25,
    borderColor: "#ECEFF1",
    borderRadius: 8,
    margin: 20
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  enter: {
    justifyContent: "center",
    alignItems: "center"
  },
  cleans: {
    justifyContent: "center",
    alignItems: "center"
  }
});
export default Login;
