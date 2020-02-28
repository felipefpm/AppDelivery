import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";

function Historic({ navigation }) {
  const [newDate, setNewDate] = useState("");

  //Função que recebe a data e mostra no celular do envio dos documentos
  useEffect(() => {
    async function setDate() {
      const date = await navigation.getParam("fullDate");
      setNewDate(date);
    }
    setDate();
  }, [navigation]);

  return (
    <SafeAreaView>
      {newDate ? (
        <ScrollView>
          <View style={style.container}>
            <View style={style.card}>
              <Text style={style.name}>Felipe Pinto</Text>
              <Text style={style.andress}>Rua das Fronteiras, Nº 162</Text>
              <Text style={style.andress}>Bloco C, Apt 210</Text>
              <Text style={style.andress}>Arianopoles</Text>
              <Text style={style.andress}>Caucaia - Ceará</Text>
              <Text style={style.date}>Data da Finalização:</Text>
              <Text style={style.date}>{newDate}</Text>
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
  question: {
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center"
  },
  date: {
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 15,
    textAlign: "center"
  }
});

export default Historic;
