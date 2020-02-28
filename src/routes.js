import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import Main from "./pages/Main";
import Documents from "./pages/Documents";
import Notification from "./pages/Notification";
import CompleteNotification from "./pages/CompleteNotification";
import PendentNofitication from "./pages/PendentNofitication";
import Historic from "./pages/Historic";
import Photo from "./pages/Photo";
import Login from "./pages/Login";

//Rotas das paginas do sistema
const TabNav = createMaterialTopTabNavigator(
  {
    One: {
      screen: Notification,
      navigationOptions: {
        title: "Disponiveis"
      }
    },
    Two: {
      screen: PendentNofitication,
      navigationOptions: {
        title: "Pendentes"
      }
    },
    Three: {
      screen: CompleteNotification,
      navigationOptions: {
        title: "Concluidas"
      }
    },
    Four: {
      screen: Historic,
      navigationOptions: {
        title: "Historico"
      }
    }
  },
  {
    initialRouteName: "One",
    tabBarOptions: {
      inactiveTintColor: "#1CB1B7",
      activeTintColor: "#246682",
      labelStyle: {
        fontSize: 12,
        fontWeight: "bold"
      },
      style: {
        backgroundColor: "#fff"
      },
      indicatorStyle: {
        backgroundColor: "#246682"
      }
    }
  }
);

const MainStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false
      }
    },
    Main: {
      screen: Main,
      navigationOptions: ({ navigation }) => ({
        title: "Bind Radar",
        headerRight: () => (
          <View style={style.btnNotification}>
            <Button
              onPress={() => navigation.navigate("Notification")}
              title="Notificações"
              color="#00425f"
            />
          </View>
        )
      })
    },
    Documents: {
      screen: Documents,
      navigationOptions: {
        title: "Dados da Entrega"
      }
    },
    Notification: {
      screen: TabNav,
      navigationOptions: {
        title: "Notificações"
      }
    },
    Photo: {
      screen: Photo,
      navigationOptions: {
        headerShown: false
      }
    }
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#00425f"
      }
    }
  }
);

const style = StyleSheet.create({
  btnNotification: {
    right: 15
  }
});

const Routes = createAppContainer(MainStack);

export default Routes;
