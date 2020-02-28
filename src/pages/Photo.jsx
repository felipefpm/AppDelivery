import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground
} from "react-native";
import { Camera } from "expo-camera";
import { getCurrentPositionAsync } from "expo-location";
import { createAssetAsync, requestPermissionsAsync } from "expo-media-library";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Geofence from "react-native-expo-geofence";

function Photo({ navigation }) {
  const [permission, setPermission] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [photoID, setPhotoID] = useState(null);
  const [geoDistance, setGeoDistance] = useState([]);

  const points = [
    {
      latitude: -3.7493393,
      longitude: -38.5002843
    }
  ];

  const startPoint = {
    latitude,
    longitude
  };

  //Função para fazer a comparação da geolocalização utilizando dados do startPoint e points
  async function getProximity() {
    const maxDistanceInKm = 0.1;
    const result = await Geofence.filterByProximity(
      startPoint,
      points,
      maxDistanceInKm
    );
    const distance = await result[0].distanceInKM;
    setGeoDistance(distance);
  }

  //Função para solicitar utilização da camera do celular
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  if (setPermission === null) {
    return <View />;
  }
  if (setPermission === false) {
    return <Text>Sem acesso a Camera</Text>;
  }

  //Função para coletar a localização do motoqueiro
  useEffect(() => {
    async function takeLocation() {
      const { coords } = await getCurrentPositionAsync({
        enableHighAccuracy: true
      });
      const { latitude, longitude } = coords;

      if ((latitude, longitude)) {
        setLatitude(latitude);
        setLongitude(longitude);
      }
    }

    takeLocation();
  }, []);

  //Função para tirar a foto
  takePicture = async () => {
    const { uri } = await camera.takePictureAsync();
    setPhotoID(uri);
    await getProximity();
  };

  //Função para salvar a foto no rolo da camera do aparelho
  savePicture = async () => {
    await requestPermissionsAsync();
    await createAssetAsync(photoID);

    if (geoDistance <= 0.1) {
      await navigation.navigate("Three", { geoDistance });
    } else {
      Alert.alert(
        "Erro",
        "Sua localizção está muito distatne do local de entrega tente novamente!"
      );
    }
  };

  return photoID ? (
    <ImageBackground style={style.photoPreview} source={{ uri: photoID }}>
      <ScrollView></ScrollView>
      <View style={style.buttonsPreview}>
        <TouchableOpacity onPress={() => savePicture()}>
          <MaterialIcons name="check-box" size={50} color="#1CB1B7" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPhotoID(null)}>
          <MaterialIcons name="cancel" size={50} color="red" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  ) : (
    <View style={style.screen}>
      <Camera
        autoFocus
        style={style.photo}
        ref={ref => {
          this.camera = ref;
        }}
      >
        <View style={style.screenInter}>
          <TouchableOpacity style={style.buttonCapture} onPress={takePicture}>
            <MaterialIcons
              name="radio-button-checked"
              size={70}
              color="#1CB1B7"
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const style = StyleSheet.create({
  screen: {
    flex: 1
  },
  photo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  screenInter: {
    height: 100,
    backgroundColor: "transparent",
    flexDirection: "column",
    justifyContent: "center"
  },
  buttonCapture: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  photoPreview: {
    flex: 1
  },
  buttonsPreview: {
    height: 100,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default Photo;
