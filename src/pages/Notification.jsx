import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

function Notification({ navigation }) {
  let data = [];
  const [newNotification, setNewNotification] = useState([]);
  const [notification, setNotification] = useState(true);

  //Função para verificar dados em DB e renderizar de acordo com a informação
  function handleRefuse(id, status) {
    data.push({ id: id, status: status });

    setNewNotification(data);
  }

  //Função para salvar infrmação na memoria do aparelho e ser utilizada pelas outras telas
  async function saveAccept() {
    try {
      await AsyncStorage.setItem("accept", "1");
    } catch (error) {
      console.log("erro =>", error);
    }
  }

  // (INVERSA) Função para salvar infrmação na memoria do aparelho e ser utilizada pelas outras telas
  async function saveDeny() {
    try {
      await AsyncStorage.setItem("accept", "0");
    } catch (error) {
      console.log("erro =>", error);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {newNotification &&
          newNotification.map(n => {
            n.status && (
              <View key={n.id} style={style.container}>
                <View style={style.card}>
                  <Text style={style.title}>Local para entrega</Text>
                  <Text style={style.andress}>Rua das Fronteiras, Nº 162</Text>
                  <Text style={style.andress}>Bloco C, Apt 210</Text>
                  <Text style={style.andress}>Arianopoles</Text>
                  <Text style={style.andress}>Caucaia - Ceará</Text>
                  <Text style={style.question}>Deseja aceitar a entrega?</Text>
                  <View style={style.buttons}>
                    <TouchableOpacity
                      style={style.acceptDelivery}
                      onPress={() => {
                        setNewNotification(false);
                        navigation.navigate("Main", {
                          latitude: -3.7320258, //LOCALIDADE QUE VAI SER RECEBIDA VIA API
                          longitude: -38.5193898
                        });
                        navigation.navigate("Two", {
                          accept: true,
                          id: 1
                        });
                      }}
                    >
                      <Text style={style.buttonsStyles}>Aceitar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={style.denyDelivery}
                      onPress={handleRefuse(1, false)}
                    >
                      <Text style={style.buttonsStyles}>Recusar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        {notification === true ? (
          <View style={style.container}>
            <View style={style.card}>
              <Text style={style.title}>Local para entrega</Text>
              <Text style={style.andress}>Rua das Fronteiras, Nº 162</Text>
              <Text style={style.andress}>Bloco C, Apt 210</Text>
              <Text style={style.andress}>Arianopoles</Text>
              <Text style={style.andress}>Caucaia - Ceará</Text>
              <Text style={style.question}>Deseja aceitar a entrega?</Text>
              <View style={style.buttons}>
                <TouchableOpacity
                  style={style.acceptDelivery}
                  onPress={() => {
                    saveAccept();
                    navigation.navigate("Main", {
                      latitude: -3.7320258, //LOCALIDADE QUE VAI SER RECEBIDA VIA API
                      longitude: -38.5193898
                    });
                  }}
                >
                  <Text style={style.buttonsStyles}>Aceitar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.denyDelivery}
                  onPress={() => {
                    saveDeny();
                    setNotification(false);
                    navigation.navigate("Main", {
                      latitude: null,
                      longitude: null
                    });
                  }}
                >
                  <Text style={style.buttonsStyles}>Recusar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}
      </ScrollView>
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
    paddingHorizontal: 10,
    borderRadius: 8
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 5,
    marginTop: 10
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
  buttons: {
    backgroundColor: "#fff",
    width: 350,
    height: 70
  },
  acceptDelivery: {
    backgroundColor: "#1CB1B7",
    height: 27,
    justifyContent: "center",
    marginVertical: 5,
    borderRadius: 10
  },
  denyDelivery: {
    backgroundColor: "#00425f",
    height: 27,
    justifyContent: "center",
    borderRadius: 10
  },
  buttonsStyles: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  }
});
export default Notification;
