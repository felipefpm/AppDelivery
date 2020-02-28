import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
  reverseGeocodeAsync,
  geocodeAsync
} from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Linking } from "expo";
import api from "../services/api";

function Main({ navigation }) {
  const [latitudeDelivery, setLatitudeDelivery] = useState(null);
  const [longitudeDelivery, setLongitudeDelivery] = useState(null);
  const [currentRegion, setCurrentRegion] = useState(null);

  //Função para coletar dados da entrega, como localização de acordo com sua latitude e longitude
  useEffect(() => {
    async function locationDelivery() {
      await setLatitudeDelivery(navigation.getParam("latitude"));
      await setLongitudeDelivery(navigation.getParam("longitude"));
    }
    locationDelivery();
  }, [navigation]);

  //Função para solicitar permição para usar o GPS e coletar localização no mapa e mostrar a posição atual do motoqueiro
  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });
        const { latitude, longitude } = coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.06, //CALCULO DE ZOOM
          longitudeDelta: 0.06 //CALCULO DE ZOOM
        });
      }
    }

    loadInitialPosition();
  }, []);

  async function wazeGps() {
    await Linking.openURL(
      `https://www.waze.com/ul?ll=${latitudeDelivery}%2C${longitudeDelivery}&navigate=yes&zoom=18`
    );
  }

  //Função para mudar a posição do motoqueiro de acordo com o que ele mude.
  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  return (
    <>
      <MapView
        // onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
        style={style.map}
        showsUserLocation
        loadingEnabled
      >
        {latitudeDelivery && longitudeDelivery && (
          <Marker
            coordinate={{
              latitude: latitudeDelivery,
              longitude: longitudeDelivery
            }}
          >
            <MaterialIcons name="room" size={50} color="#00425f" />
            <Callout
              onPress={() => {
                navigation.navigate("Documents");
                // wazeGps();
              }}
            >
              <View style={style.callout}>
                <Text style={style.deliveryName}>Felipe Pinto</Text>
                <Text style={style.deliveryAndress}>
                  Rua das Fronteiras, Nº 162 - Arianopoles Bloco C, Apt 210
                </Text>
                <View style={style.downloadArea}>
                  <Text style={style.downloadTextArea}>Informações</Text>
                  <TouchableOpacity
                    onPress={() => {}}
                    style={style.downloadIconButtton}
                  >
                    <MaterialIcons name="archive" size={23} color={"#fff"} />
                  </TouchableOpacity>
                </View>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
      {latitudeDelivery && longitudeDelivery && (
        <TouchableOpacity
          style={style.mapGPS}
          onPress={() => {
            wazeGps();
          }}
        >
          <MaterialIcons name="my-location" size={60} color={"#00425f"} />
        </TouchableOpacity>
      )}
    </>
  );
}

const style = StyleSheet.create({
  map: {
    flex: 1
  },
  callout: {
    width: 260,
    height: 105
  },
  deliveryName: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 16
  },
  deliveryAndress: {
    color: "#666",
    marginTop: 5,
    fontWeight: "bold"
  },
  downloadArea: {
    height: 30,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1CB1B7",
    borderRadius: 5
  },
  downloadTextArea: {
    paddingVertical: 4,
    paddingHorizontal: 15,
    color: "#FFF",
    fontWeight: "bold"
  },
  downloadIconButtton: {
    backgroundColor: "#1CB1B7",
    justifyContent: "center",
    alignItems: "center"
  },
  mapGPS: {
    position: "absolute",
    zIndex: 5,
    width: 60,
    height: 60,
    backgroundColor: "#1CB1B7",
    borderRadius: 50,
    bottom: 50,
    right: 30
  }
});

export default Main;
