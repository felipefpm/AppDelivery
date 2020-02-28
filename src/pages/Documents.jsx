import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  TextInput,
  Alert,
  AsyncStorage
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Modal, Portal, Provider, RadioButton } from "react-native-paper";

function Documents({ navigation }) {
  const [comments, setComments] = useState("");
  const [recivedDocs, setReciveDocs] = useState(false);
  const [frist, setFrist] = useState("frist");

  //Função de envio das informações
  function sendInfos() {
    if (comments > 5) {
      //Envio das informações para o banco

      hideModal();
    } else {
      Alert.alert("Dados incorretos", "Verifique os campos e tente novamente.");
    }
  }

  //Funçães para abrir modal com informações da entrega dos documentos
  showModal = () => setReciveDocs(true);
  hideModal = () => setReciveDocs(false);

  //Função para caancelar a entrega
  async function deliveyCancel() {
    try {
      await AsyncStorage.setItem("accept", "0");
    } catch (error) {
      console.log("erro =>", error);
    }
    navigation.navigate("Main", {
      latitude: null,
      longitude: null
    });
  }

  return (
    <View style={style.contentMaster}>
      <ScrollView>
        <View style={style.container}>
          <View style={style.card}>
            <Text style={style.name}>Felipe Pinto</Text>
            <Text style={style.andress}>Rua das Fronteiras, Nº 162</Text>
            <Text style={style.andress}>Bloco C, Apt 210</Text>
            <Text style={style.andress}>Arianopoles</Text>
            <Text style={style.andress}>Caucaia - Ceará</Text>
          </View>
          <View style={style.areaButton}>
            <TouchableOpacity onPress={showModal} style={style.buttonDocs}>
              <Text style={style.textButton}>Documentos Entregues</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={style.areaDownload}>
          <Text style={style.textDownload}>Documentos</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://www.habitusbrasil.com/wp-content/uploads/2016/03/habitus-modelo3-contrato-marcenaria.pdf"
              );
            }}
          >
            <MaterialIcons name="cloud-download" size={120} color={"#1CB1B7"} />
          </TouchableOpacity>
        </View>

        <View style={style.confirmArea}>
          <Text style={style.confirmText}>Finalizar entrega?</Text>
          <View style={style.confirmButtons}>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Finalizar Entrega?",
                  "Entrega realizada com sucesso? Prepare-se para tirar a foto da faixada do local de entrega!",
                  [
                    {
                      text: "Sim",
                      onPress: () => {
                        navigation.navigate("Photo");
                      }
                    },
                    {
                      text: "Não",
                      onPress: () => {}
                    }
                  ]
                )
              }
              style={style.buttonAcc}
            >
              <MaterialIcons name="check-circle" size={80} color={"#1CB1B7"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Cancelar Entrega?",
                  "Tem certeza que deseja cancelar a entrega?",
                  [
                    {
                      text: "Sim",
                      onPress: () => {
                        deliveyCancel();
                      }
                    },
                    {
                      text: "Não",
                      onPress: () => {}
                    }
                  ]
                )
              }
              style={style.buttonDeny}
            >
              <MaterialIcons name="delete" size={80} color={"#246682"} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Provider>
        <Portal>
          <Modal
            visible={recivedDocs}
            onDismiss={hideModal}
            style={style.modal}
          >
            <View style={style.areaModal}>
              <RadioButton.Group
                value={frist}
                onValueChange={value => setFrist(value)}
              >
                <View style={style.areaRadius}>
                  <View style={style.groupRadius}>
                    <View style={style.radiusOpts}>
                      <Text>Destinatario</Text>
                      <RadioButton value="frist" />
                    </View>
                    <View style={style.radiusOpts}>
                      <Text>Porteiro</Text>
                      <RadioButton value="three" />
                    </View>
                    <View style={style.radiusOpts}>
                      <Text>Secretaria</Text>
                      <RadioButton value="four" />
                    </View>
                  </View>
                  <View style={style.groupRadius}>
                    <View style={style.radiusOpts}>
                      <Text>Vizinho</Text>
                      <RadioButton value="five" />
                    </View>
                    <View style={style.radiusOpts}>
                      <Text>Parente</Text>
                      <RadioButton value="six" />
                    </View>
                    <View style={style.radiusOpts}>
                      <Text>Outros:</Text>
                      <RadioButton value="seven" />
                    </View>
                  </View>
                </View>
              </RadioButton.Group>
              <View style={style.areaRadius}>
                <TextInput
                  style={style.comments}
                  onChangeText={setComments}
                  placeholder={
                    "Informe os dados de um documento:  RG ou CPF do receptor."
                  }
                  multiline
                  placeholderTextColor={"#000"}
                  textAlignVertical={"top"}
                  maxLength={100}
                />
              </View>
              <View style={style.areaRadius}>
                <TouchableOpacity
                  style={style.buttonComments}
                  onPress={() => {
                    sendInfos();
                  }}
                >
                  <Text style={style.sendComments}>Enviar</Text>
                  <MaterialIcons name={"send"} size={20} color={"#fff"} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </Portal>
      </Provider>
    </View>
  );
}

const style = StyleSheet.create({
  contentMaster: {
    flex: 1,
    justifyContent: "center"
  },
  container: {
    height: 185,
    marginVertical: 15,
    backgroundColor: "#fff"
  },
  card: {
    paddingHorizontal: 20,
    marginTop: 20
  },
  name: {
    fontSize: 25,
    fontWeight: "bold"
  },
  andress: {
    fontSize: 18,
    color: "#666"
  },
  areaButton: {
    alignItems: "center"
  },
  buttonDocs: {
    backgroundColor: "#1CB1B7",
    width: 200,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10
  },
  textButton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 3
  },
  areaDownload: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    backgroundColor: "#fff",
    marginVertical: 15
  },
  textDownload: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#00425f"
  },
  confirmArea: {
    height: 180,
    marginVertical: 15,
    justifyContent: "center",
    backgroundColor: "#fff",
    marginVertical: 15
  },
  confirmText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#00425f",
    textAlign: "center"
  },
  confirmButtons: {
    height: 150,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonAcc: {
    marginRight: 60
  },
  buttonDeny: {
    marginLeft: 60
  },
  modal: {},
  areaModal: {
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 500,
    width: 350,
    marginHorizontal: 40
  },
  areaRadius: {
    flexDirection: "row",
    marginTop: 15,
    width: 350,
    justifyContent: "space-around"
  },
  groupRadius: {
    marginVertical: 15,
    justifyContent: "center"
  },
  radiusOpts: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 3,
    marginStart: 15
  },
  comments: {
    height: 90,
    fontSize: 15,
    width: 300,
    marginVertical: 10,
    paddingHorizontal: 3,
    backgroundColor: "#ECEFF1",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000"
  },
  buttonComments: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 80,
    height: 30,
    paddingHorizontal: 8,
    backgroundColor: "#1CB1B7",
    borderRadius: 10
  },
  sendComments: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff"
  }
});

export default Documents;
