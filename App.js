import {
  Dimensions,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState, useRef } from "react";
import Otp from "./screens/Otp";
import AccountEmail from "./screens/AccountEmail";
import OtpEmail from "./screens/Otpemail";
import axios from "axios";
import EnterEmail from "./screens/enterEmail";
import EnterName from "./screens/enterName";
import MainHome from "./screens/MainHome";
import { Button } from "react-native-paper";
import MapPage from "./screens/MapPage";
import TimePage from "./screens/timePage";
import MapDriver from "./screens/MapDriver";
import PaymentMethod from "./screens/PaymentMethod";
import CreditCard from "./screens/creditCard";
import { getAllItems, getItem, setItem } from "./utils/AsyncStorage";
import ServicesScreen from "./screens/ServicesScreen";
import ActivityScreen from "./screens/ActivityScreens";
import ProfileScreen from "./screens/ProfileScreens";

const Stack = createNativeStackNavigator();

export default function App() {
  let [user, setuser] = useState();
  const navigationRef = useRef();

  const newSet = new Set();
  let newData = [];
  function sendData(nav) {
    newData = nav.routes.map((ele) => {
      if (ele.name == "otp") {
        return ele?.params?.number;
      } else if (ele?.name == "enterEmail") {
        return ele?.params?.email;
      } else if (ele?.name == "enterName") {
        return ele?.params?.FirstName + " " + ele?.params?.LastName;
      }
    });
    newData = newData.filter((ele, index) => Boolean(ele));
    if (newData.length == 3) {
      setItem("phoneNumber", newData[0]);
      setItem("email", newData[1]);
      setItem("name", newData[2]);
      postUser({
        phoneNumber: newData[0],
        email: newData[1],
        name: newData[2],
      });
    }
    if (user) {
    }
  }
  async function postUser({ phoneNumber, email, name }) {
    await axios
      .post("https://ubeback.onrender.com/user/", { phoneNumber, email, name })
      .then((res) => console.log(res.data, "data"))
      .catch((error) => console.log(error));
  }
  async function getAllItemsFromStore() {
    setuser(await getItem("user"));
  }
  useEffect(() => {
    getAllItemsFromStore();
  }, []);
  useEffect(() => {
    if (Boolean(user)) {
      navigationRef.current?.navigate("Main", { user });
    }
  }, [user]);
  return (
    <NavigationContainer
      independent={true}
      ref={navigationRef}
      onUnhandledAction={() => {
        console.log("ubhadle");
      }}
      onStateChange={(nav) => sendData(nav)}
      screenOptions={{
        gestureEnabled: true,
      }}
      onReady={() => {
        console.log("nav", user);
      }}
    >
      <StatusBar />
      <Stack.Navigator initialRouteName={Boolean(user) ? "Main" : "Home"}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
          // options={{ header: (navigationOptions) => {

          // }}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            header: (navigationOptions) => {
              // console.log(navigationOptions.route.params)
              return (
                <View style={styles.styleHeader}>
                  <Pressable
                    style={{
                      backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                    }}
                    onPress={() => navigationOptions.navigation.goBack()}
                  >
                    <Icon name="arrow-left" size={25} color={"#000"} />
                  </Pressable>
                </View>
              );
            },
          }}
        />
        <Stack.Screen
          name="otp"
          component={Otp}
          options={{
            header: (navigationOptions) => {
              // console.log(navigationOptions.route.params.code,"navigationOptions")
              // console.log(navigationOptions.route.params,"navigationOptions.route.params")
              return (
                <View style={[styles.styleHeader, styles.styleNext]}>
                  <Pressable
                    style={{
                      backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                    }}
                    onPress={() => navigationOptions.navigation.goBack()}
                  >
                    <Icon name="arrow-left" size={25} color={"#000"} />
                  </Pressable>
                  <Pressable
                    style={{
                      backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onPress={() => {
                      if (
                        !Boolean(navigationOptions.route.params.user) &&
                        navigationOptions.route.params.check
                      ) {
                        navigationOptions.navigation.navigate("enterEmail");
                      } else if (Boolean(navigationOptions.route.params.user)) {
                        navigationOptions.navigation.navigate("Main", {
                          user: navigationOptions.route.params.user,
                        });
                      }
                    }}
                    disabled={!Boolean(navigationOptions.route.params.code)}
                  >
                    <Text style={{ marginHorizontal: 10 }}>Next</Text>
                    <Icon name="arrow-right" size={25} color={"#000"} />
                  </Pressable>
                </View>
              );
            },
          }}
        />
        <Stack.Screen
          name="acountEmail"
          component={AccountEmail}
          options={{
            header: (navigationOptions) => {
              // console.log(navigationOptions.route.params,"navigationOptions")
              return (
                <View style={[styles.styleHeader, styles.styleNext]}>
                  <Pressable
                    style={{
                      backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                    }}
                    onPress={() => navigationOptions.navigation.goBack()}
                  >
                    <Icon name="arrow-left" size={25} color={"#000"} />
                  </Pressable>
                  <Pressable
                    style={{
                      backgroundColor: "black",
                      borderRadius: "50%",
                      padding: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onPress={() =>
                      navigationOptions.navigation.navigate("otpemail", {
                        email: navigationOptions?.route?.params?.email,
                      })
                    }
                    disabled={!Boolean(navigationOptions?.route?.params?.email)}
                  >
                    <Text style={{ marginHorizontal: 10, color: "#fff" }}>
                      Next
                    </Text>
                    <Icon name="arrow-right" size={25} color={"#fff"} />
                  </Pressable>
                </View>
              );
            },
          }}
        />

        <Stack.Screen
          name="otpemail"
          component={OtpEmail}
          options={{
            header: (navigationOptions) => {
              const back = navigationOptions?.back?.title;
              // console.log(back,"nav")
              // console.log(localStorage?.getItem("phone"),"navigationOptions")
              return (
                <View style={[styles.styleHeader, styles.styleNext]}>
                  <Pressable
                    style={{
                      backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                    }}
                    onPress={() => navigationOptions.navigation.goBack()}
                  >
                    <Icon name="arrow-left" size={25} color={"#000"} />
                  </Pressable>
                  <Pressable
                    style={{
                      backgroundColor: "black",
                      borderRadius: "50%",
                      padding: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onPress={() => {
                      if (
                        navigationOptions?.route?.params?.checkPhone &&
                        back != "enterEmail"
                      ) {
                        navigationOptions.navigation.navigate("otp");
                      } else if (
                        navigationOptions?.route?.params?.checkPhone &&
                        back == "enterEmail"
                      ) {
                        navigationOptions.navigation.navigate("enterName");
                      }
                    }}
                    disabled={
                      !Boolean(navigationOptions?.route?.params?.checkPhone)
                    }
                  >
                    <Text style={{ marginHorizontal: 10, color: "#fff" }}>
                      Next
                    </Text>
                    <Icon name="arrow-right" size={25} color={"#fff"} />
                  </Pressable>
                </View>
              );
            },
          }}
        />
        <Stack.Screen
          name="enterEmail"
          component={EnterEmail}
          options={{
            header: (navigationOptions) => {
              // console.log(navigationOptions,"nav")
              return (
                <View style={[styles.styleHeader, styles.styleNext]}>
                  <Pressable
                    style={{
                      backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                    }}
                    onPress={() => navigationOptions.navigation.goBack()}
                  >
                    <Icon name="arrow-left" size={25} color={"#000"} />
                  </Pressable>
                  <Pressable
                    style={{
                      backgroundColor: "black",
                      borderRadius: "50%",
                      padding: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onPress={() =>
                      navigationOptions?.route?.params?.email &&
                      navigationOptions.navigation.navigate("otpemail", {
                        email: navigationOptions?.route?.params?.email,
                      })
                    }
                    disabled={!Boolean(navigationOptions?.route?.params?.email)}
                  >
                    <Text style={{ marginHorizontal: 10, color: "#fff" }}>
                      Next
                    </Text>
                    <Icon name="arrow-right" size={25} color={"#fff"} />
                  </Pressable>
                </View>
              );
            },
          }}
        />
        <Stack.Screen
          name="enterName"
          component={EnterName}
          options={{
            header: (navigationOptions) => {
              return (
                <View style={[styles.styleHeader, styles.styleNext]}>
                  <Pressable
                    style={{
                      backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                    }}
                    onPress={() => navigationOptions.navigation.goBack()}
                  >
                    <Icon name="arrow-left" size={25} color={"#000"} />
                  </Pressable>
                  <Pressable
                    style={{
                      backgroundColor: "black",
                      borderRadius: "50%",
                      padding: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onPress={() => {
                      if (
                        Boolean(
                          navigationOptions?.route?.params?.FirstName &&
                            navigationOptions?.route?.params?.LastName
                        )
                      ) {
                        return navigationOptions.navigation.navigate("Main");
                      }
                    }}
                    disabled={
                      !Boolean(
                        navigationOptions?.route?.params?.FirstName &&
                          navigationOptions?.route?.params?.LastName
                      )
                    }
                  >
                    <Text style={{ marginHorizontal: 10, color: "#fff" }}>
                      Next
                    </Text>
                    <Icon name="arrow-right" size={25} color={"#fff"} />
                  </Pressable>
                </View>
              );
            },
          }}
        />
        <Stack.Screen
          name="Main"
          component={MainHome}
          options={{
            header: (navigationOptions) => {
              return (
                <View style={[styles.styleHeader, styles.styleNext]}>
                  <Pressable
                    style={{
                      // backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => navigationOptions.navigation.goBack()}
                  >
                    <Button
                      icon={({ size, color }) => (
                        <Icon
                          name="home"
                          size={35}
                          color={
                            navigationOptions.route.name == "Main"
                              ? "black"
                              : "lightgray"
                          }
                        />
                      )}
                      style={{ fontSize: 9 }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        color:
                          navigationOptions?.route?.name == "Main"
                            ? "black"
                            : "lightgray",
                      }}
                    >
                      Home
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      // backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() =>
                      navigationOptions.navigation.navigate("Services")
                    }
                  >
                    <Button
                      icon={({ size, color }) => (
                        <Ionicons
                          name="apps"
                          size={35}
                          color={
                            navigationOptions.route.name == "Services"
                              ? "black"
                              : "lightgray"
                          }
                        />
                      )}
                      style={{ fontSize: 9 }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        color:
                          navigationOptions.route.name == "Services"
                            ? "black"
                            : "lightgray",
                      }}
                    >
                      Services
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      // backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => navigationOptions.navigation.navigate("Activity")}
                  >
                    <Button
                      icon={({ size, color }) => (
                        <Ionicons
                          name="document-text-outline"
                          size={35}
                          color={ navigationOptions.route.name == "Activity"
                          ? "black"
                          : "lightgray"}
                        />
                      )}
                      style={{ fontSize: 9 }}
                    />
                    <Text style={{ fontSize: 18, color:  navigationOptions.route.name == "Activity"
                            ? "black"
                            : "lightgray" }}>
                      Activity
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      // backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => navigationOptions.navigation.navigate("Profile")}
                  >
                    <Button
                      icon={({ size, color }) => (
                        <Icon name="user" size={35} color={navigationOptions.route.name == "Profile"
                        ? "black"
                        : "lightgray"} />
                      )}
                      style={{ fontSize: 9 }}
                    />
                    <Text style={{ fontSize: 18, color: navigationOptions.route.name == "Profile"
                        ? "black"
                        : "lightgray" }}>
                      profile
                    </Text>
                  </Pressable>
                </View>
              );
            },
          }}
          // options={{ header: (navigationOptions) => {

          // }}
        />
        <Stack.Screen
          name="Services"
          component={ServicesScreen}
          options={{
            header: (navigationOptions) => {
              return (
                <View style={[styles.styleHeader, styles.styleNext]}>
                  <Pressable
                    style={{
                      // backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => navigationOptions.navigation.goBack()}
                  >
                    <Button
                      icon={({ size, color }) => (
                        <Icon
                          name="home"
                          size={35}
                          color={
                            navigationOptions.route.name == "Main"
                              ? "black"
                              : "lightgray"
                          }
                        />
                      )}
                      style={{ fontSize: 9 }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        color:
                          navigationOptions?.route?.name == "Main"
                            ? "black"
                            : "lightgray",
                      }}
                    >
                      Home
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      // backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() =>
                      navigationOptions.navigation.navigate("Services")
                    }
                  >
                    <Button
                      icon={({ size, color }) => (
                        <Ionicons
                          name="apps"
                          size={35}
                          color={
                            navigationOptions.route.name == "Services"
                              ? "black"
                              : "lightgray"
                          }
                        />
                      )}
                      style={{ fontSize: 9 }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        color:
                          navigationOptions.route.name == "Services"
                            ? "black"
                            : "lightgray",
                      }}
                    >
                      Services
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      // backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => navigationOptions.navigation.navigate("Activity")}
                  >
                    <Button
                      icon={({ size, color }) => (
                        <Ionicons
                          name="document-text-outline"
                          size={35}
                          color={ navigationOptions.route.name == "Activity"
                          ? "black"
                          : "lightgray"}
                        />
                      )}
                      style={{ fontSize: 9 }}
                    />
                    <Text style={{ fontSize: 18, color:  navigationOptions.route.name == "Activity"
                            ? "black"
                            : "lightgray" }}>
                      Activity
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      // backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => navigationOptions.navigation.navigate("Profile")}
                  >
                    <Button
                      icon={({ size, color }) => (
                        <Icon name="user" size={35} color={navigationOptions.route.name == "Profile"
                        ? "black"
                        : "lightgray"} />
                      )}
                      style={{ fontSize: 9 }}
                    />
                    <Text style={{ fontSize: 18, color: navigationOptions.route.name == "Profile"
                        ? "black"
                        : "lightgray" }}>
                      profile
                    </Text>
                  </Pressable>
                </View>
              );
            },
          }}
          // options={{ header: (navigationOptions) => {

          // }}
        />
        <Stack.Screen
          name="Activity"
          component={ActivityScreen}
          options={{
            header: (navigationOptions) => {
              return (
                <View style={[styles.styleHeader, styles.styleNext]}>
                  <Pressable
                    style={{
                      // backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => navigationOptions.navigation.navigate("Main")}
                  >
                    <Button
                      icon={({ size, color }) => (
                        <Icon
                          name="home"
                          size={35}
                          color={
                            navigationOptions.route.name == "Main"
                              ? "black"
                              : "lightgray"
                          }
                        />
                      )}
                      style={{ fontSize: 9 }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        color:
                          navigationOptions?.route?.name == "Main"
                            ? "black"
                            : "lightgray",
                      }}
                    >
                      Home
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      // backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() =>
                      navigationOptions.navigation.navigate("Services")
                    }
                  >
                    <Button
                      icon={({ size, color }) => (
                        <Ionicons
                          name="apps"
                          size={35}
                          color={
                            navigationOptions.route.name == "Services"
                              ? "black"
                              : "lightgray"
                          }
                        />
                      )}
                      style={{ fontSize: 9 }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        color:
                          navigationOptions.route.name == "Services"
                            ? "black"
                            : "lightgray",
                      }}
                    >
                      Services
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      // backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => navigationOptions.navigation.navigate("Activity")}
                  >
                    <Button
                      icon={({ size, color }) => (
                        <Ionicons
                          name="document-text-outline"
                          size={35}
                          color={ navigationOptions.route.name == "Activity"
                          ? "black"
                          : "lightgray"}
                        />
                      )}
                      style={{ fontSize: 9 }}
                    />
                    <Text style={{ fontSize: 18, color:  navigationOptions.route.name == "Activity"
                            ? "black"
                            : "lightgray", }}>
                      Activity
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      // backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => navigationOptions.navigation.navigate("Profile")}
                  >
                    <Button
                      icon={({ size, color }) => (
                        <Icon name="user" size={35} color={navigationOptions.route.name == "Profile"
                        ? "black"
                        : "lightgray"} />
                      )}
                      style={{ fontSize: 9 }}
                    />
                    <Text style={{ fontSize: 18, color:navigationOptions.route.name == "Profile"
                        ? "black"
                        : "lightgray" }}>
                      profile
                    </Text>
                  </Pressable>
                </View>
              );
            },
          }}
          // options={{ header: (navigationOptions) => {

          // }}
        />
          <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            header: (navigationOptions) => {
              return (
                <View style={[styles.styleHeader, styles.styleNext]}>
                  <Pressable
                    style={{
                      // backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => navigationOptions.navigation.goBack()}
                  >
                    <Button
                      icon={({ size, color }) => (
                        <Icon
                          name="home"
                          size={35}
                          color={
                            navigationOptions.route.name == "Main"
                              ? "black"
                              : "lightgray"
                          }
                        />
                      )}
                      style={{ fontSize: 9 }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        color:
                          navigationOptions?.route?.name == "Main"
                            ? "black"
                            : "lightgray",
                      }}
                    >
                      Home
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      // backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() =>
                      navigationOptions.navigation.navigate("Services")
                    }
                  >
                    <Button
                      icon={({ size, color }) => (
                        <Ionicons
                          name="apps"
                          size={35}
                          color={
                            navigationOptions.route.name == "Services"
                              ? "black"
                              : "lightgray"
                          }
                        />
                      )}
                      style={{ fontSize: 9 }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        color:
                          navigationOptions.route.name == "Services"
                            ? "black"
                            : "lightgray",
                      }}
                    >
                      Services
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      // backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => navigationOptions.navigation.navigate("Activity")}
                  >
                    <Button
                      icon={({ size, color }) => (
                        <Ionicons
                          name="document-text-outline"
                          size={35}
                          color={ navigationOptions.route.name == "Activity"
                          ? "black"
                          : "lightgray"}
                        />
                      )}
                      style={{ fontSize: 9 }}
                    />
                    <Text style={{ fontSize: 18, color:  navigationOptions.route.name == "Activity"
                            ? "black"
                            : "lightgray" }}>
                      Activity
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      // backgroundColor: "lightgray",
                      borderRadius: "50%",
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => navigationOptions.navigation.navigate("Profile")}
                  >
                    <Button
                      icon={({ size, color }) => (
                        <Icon name="user" size={35} color={navigationOptions.route.name == "Profile"
                        ? "black"
                        : "lightgray"} />
                      )}
                      style={{ fontSize: 9 }}
                    />
                    <Text style={{ fontSize: 18, color:navigationOptions.route.name == "Profile"
                        ? "black"
                        : "lightgray"}}>
                      profile
                    </Text>
                  </Pressable>
                </View>
              );
            },
          }}
          // options={{ header: (navigationOptions) => {

          // }}
        />
        <Stack.Screen
          name="Map"
          component={MapPage}
          options={{ headerShown: false }}
          // options={{ header: (navigationOptions) => {

          // }}}
        />
        <Stack.Screen
          name="Time"
          component={TimePage}
          options={{
            header: (navigationOptions) => {
              return;
            },
          }}
          // options={{ header: (navigationOptions) => {

          // }}}
        />
        <Stack.Screen
          name="MapTOdriver"
          component={MapDriver}
          options={{
            header: (navigationOptions) => {
              return;
            },
          }}
          // options={{ header: (navigationOptions) => {

          // }}}
        />
        <Stack.Screen
          name="paymentMethod"
          component={PaymentMethod}
          options={{
            header: (navigationOptions) => {
              return;
            },
          }}
          // options={{ header: (navigationOptions) => {

          // }}}
        />
        <Stack.Screen
          name="creditcard"
          component={CreditCard}
          options={{
            header: (navigationOptions) => {
              return;
            },
          }}
          // options={{ header: (navigationOptions) => {

          // }}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  styleHeader: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: Dimensions.get("window").height - 100,
    height: 100,
    width: "90%",
    marginHorizontal: 20,
    justifyContent: "flex-start",
  },
  styleNext: {
    justifyContent: "space-between",
  },
});
