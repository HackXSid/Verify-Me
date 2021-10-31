import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ViewBooking } from "../components/ViewBooking";
import { Logout } from "../components/Logout";
import { Profile } from "../components/Profile";

const Tab = createBottomTabNavigator();

const Dashboard = ({ logout, auth }) => {
  return (
    <View style={{ height: "100%" }}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Bookings">
          <Tab.Screen
            name="Bookings"
            options={{
              tabBarLabel: "Bookings",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="laptop" color={color} size={size} />
              ),
            }}
          >
            {(props) => (
              <ViewBooking
                {...props}
                aadhar={auth.aadhar}
                photo={auth.photo}
                name={auth.name}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Profile"
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" color={color} size={size} />
              ),
            }}
          >
            {(props) => <Profile {...props} aadhar={auth.aadhar} />}
          </Tab.Screen>
          <Tab.Screen
            name="Logout"
            options={{
              tabBarLabel: "Logout",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="log-out" color={color} size={size} />
              ),
            }}
          >
            {(props) => <Logout {...props} logout={logout} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export { Dashboard };
