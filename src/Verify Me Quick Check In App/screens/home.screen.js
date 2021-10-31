import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import * as MediaLibrary from "expo-media-library";
import { VerifyUser } from "../components/VerifyUser";
import { ViewCodes } from "../components/ViewCodes";
import { Login } from "../components/Login";
import { homeStyles } from "../styles/home.styles";

const styles = StyleSheet.create(homeStyles());

const Home = ({ login }) => {
  const [mode, setMode] = useState(0);
  const [loginVisible, setLoginVisible] = useState(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  if (status && !status.granted) requestPermission();

  const handleVerify = () => {
    setMode(1);
  };

  const handleViewQR = () => {
    setMode(2);
  };

  const toggleLoginOverlay = () => {
    setLoginVisible(!loginVisible);
  };

  if (mode === 1) return <VerifyUser back={() => setMode(0)} />;
  if (mode === 2) return <ViewCodes back={() => setMode(0)} />;

  return (
    <View style={{ minHeight: "100%" }}>
      {loginVisible ? (
        <Login
          toggleOverlay={toggleLoginOverlay}
          overlayVisible={loginVisible}
          login={login}
        />
      ) : null}
      <View style={styles.container}>
        <Image
          source={require("../assets/logo_transparent.png")}
          style={styles.landingImage}
        />
        <View style={styles.footerImageContainer}>
          <Image
            source={require("../assets/uidai_english_logo.png")}
            style={styles.footerImage}
          />
          <Image
            source={require("../assets/aadhaar_english_logo.png")}
            style={styles.footerImage}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={"Login Via Aadhar"}
            onPress={() => setLoginVisible(true)}
            raised
            containerStyle={styles.buttonInBuildContainer}
          />
          <Button
            title={"View Downloaded QR Codes"}
            type="outline"
            raised
            buttonStyle={{ width: 250 }}
            containerStyle={styles.buttonInBuildContainer}
            onPress={handleViewQR}
          />
          <Button
            title={"Verify User"}
            type="outline"
            raised
            buttonStyle={{ width: 250 }}
            containerStyle={styles.buttonInBuildContainer}
            onPress={handleVerify}
          />
        </View>
      </View>
    </View>
  );
};

export { Home };
