import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { Home } from "./screens/home.screen";
import { Dashboard } from "./screens/dashboard.screen";

const defaultState = {
  aadhar: "",
  allowed: false,
  photo: "",
  name: "",
};

export default App = () => {
  const [auth, setAuth] = useState(defaultState);
  return (
    <SafeAreaView>
      <View>
        {auth.allowed ? (
          <Dashboard auth={auth} logout={() => setAuth(defaultState)} />
        ) : (
          <Home
            login={(aadhar, photo, name) =>
              setAuth({ ...defaultState, aadhar, allowed: true, photo, name })
            }
          />
        )}
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};
