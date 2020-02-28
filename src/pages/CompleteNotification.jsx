import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

function CompleteNotification({ navigation }) {
  const [iconColorLocation, setIconColorLocation] = useState(false);
  const [iconColorFachada, setIconColorFachada] = useState(false);
  const [iconColorDocument, setIconColorDocument] = useState(false);
  const [distance, setDistance] = useState(null);
  const [accept, setAccept] = useState(0);

  //Função para coletar informação que esta salva na memoria do celular
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

  //Função para coletar a localização do Motoqueiro
  useEffect(() => {
    async function uploadLocation() {
      const getDistance = await navigation.getParam("geoDistance");
      setDistance(getDistance);

      if (distance <= 0.1) {
        return setIconColorLocation(true);
      }
      if (distance >= 0.1) {
        return setIconColorLocation(false);
      }
    }

    uploadLocation();
  }, [navigation]);

  //Função para upload da foto da fachada
  async function uploadFachada() {
    await ImagePicker.launchImageLibraryAsync({ base64: true });
    setIconColorFachada(true);
  }
  //Função para upload dos documentos assinados
  async function uploadDocument() {
    await ImagePicker.launchImageLibraryAsync({ base64: true });
    setIconColorDocument(true);
  }

  //função que coleta a data de finalização com o click do botão
  async function getDate() {
    const date = await new Date().getDate();
    const month = (await new Date().getMonth()) + 1;
    const year = await new Date().getFullYear();
    const hours = await new Date().getHours();
    const min = await new Date().getMinutes();
    const fullDate = `${date}/${month}/${year} - ${hours}:${min}`;
    navigation.navigate("Four", { fullDate });
  }

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
              <Text style={style.linha}></Text>
              <View style={style.list}>
                <TouchableOpacity style={style.buttonText} disabled>
                  <Text style={style.textList}>Localização</Text>
                  <View style={style.buttonList}>
                    <MaterialIcons
                      name={"done-all"}
                      size={30}
                      color={iconColorLocation ? "green" : "#666"}
                    />
                    <MaterialIcons
                      name={"location-on"}
                      size={30}
                      color={"#1CB1B7"}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={style.list}>
                <TouchableOpacity
                  style={style.buttonText}
                  onPress={() => {
                    uploadFachada();
                  }}
                >
                  <Text style={style.textList}>Foto da Fachada</Text>
                  <View style={style.buttonList}>
                    <MaterialIcons
                      name={"done-all"}
                      size={30}
                      color={iconColorFachada ? "green" : "#666"}
                    />
                    <MaterialIcons
                      name={"cloud-upload"}
                      size={30}
                      color={"#1CB1B7"}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={style.list}>
                <TouchableOpacity
                  style={style.buttonText}
                  onPress={() => {
                    uploadDocument();
                  }}
                >
                  <Text style={style.textList}>Foto dos Documentos</Text>
                  <View style={style.buttonList}>
                    <MaterialIcons
                      name={"done-all"}
                      size={30}
                      color={iconColorDocument ? "green" : "#666"}
                    />
                    <MaterialIcons
                      name={"cloud-upload"}
                      size={30}
                      color={"#1CB1B7"}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.sendFiles}
                  onPress={() => {
                    getDate();
                  }}
                >
                  <Text style={style.textFiles}>Enviar Documentos</Text>
                </TouchableOpacity>
              </View>
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
    padding: 15,
    borderRadius: 8
  },
  name: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 5
  },
  andress: {
    color: "#666",
    fontSize: 15,
    marginBottom: 3
  },
  list: {
    marginTop: 2
  },
  buttonList: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonText: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textList: {
    fontSize: 18,
    color: "#246682"
  },
  sendFiles: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1CB1B7",
    marginTop: 15,
    borderRadius: 30
  },
  textFiles: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  }
});

export default CompleteNotification;
