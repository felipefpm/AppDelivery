import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  AsyncStorage
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function PendentNofitication({ navigation }) {
  // let data = [];
  const [accept, setAccept] = useState(0);

  //Função para acessar dados salvos no aparelho do celualar e realizar a função e acordo com o dado salvo, 0 p/ false e 1 p/ true
  useEffect(() => {
    async function getAccept() {
      try {
        setAccept(await AsyncStorage.getItem("accept"));
      } catch (error) {
        console.log("ERRO => ", error);
      }
    }

    getAccept();
  }, [navigation]);

  return (
    <SafeAreaView>
      {accept === "1" ? (
        <ScrollView>
          <View style={style.container}>
            <View style={style.card}>
              <Text style={style.name}>Felipe Pinto</Text>
              <Text style={style.andress}>Rua das Fronteiras, Nº 162</Text>
              <Text style={style.andress}>Bloco C, Apt 210</Text>
              <Text style={style.andress}>Arianopoles</Text>
              <Text style={style.andress}>Caucaia - Ceará</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Documents");
                }}
                style={style.downloadIconButtton}
              >
                <Text style={style.downloadTextArea}>Informações</Text>
                <MaterialIcons name="archive" size={23} color={"#fff"} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20
  },
  card: {
    width: 380,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8
  },
  name: {
    fontWeight: "bold",
    fontSize: 30,
    marginVertical: 5
  },
  andress: {
    color: "#666",
    fontSize: 15,
    marginBottom: 3
  },
  question: {
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center"
  },
  downloadTextArea: {
    color: "#FFF",
    fontWeight: "bold"
  },
  downloadIconButtton: {
    flex: 1,
    height: 30,
    marginTop: 8,
    backgroundColor: "#1CB1B7",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  }
});

export default PendentNofitication;
