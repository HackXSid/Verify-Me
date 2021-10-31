import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, NativeModules } from "react-native";
import { Camera } from "expo-camera";
import { Button } from "react-native-elements";
import { BACKEND_URL } from "../constants";
import axios from "axios";

const RNScanUtil = NativeModules.RNScanUtil;
const RNCrypto = NativeModules.RNCrypto;
const RNTUtility = NativeModules.RNTUtility;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  camera: {
    height: 350,
    width: 350,
    marginTop: 30,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});

export const VerifyUser = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [data, setData] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoInfo, setPhotoInfo] = useState(null);

  const onQRScan = ({ data }) => {
    setData(JSON.parse(data));
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const fetchPhotoInfo = async (data) => {
    const response = await axios.get(BACKEND_URL + "uidai/ekyc", {
      params: {
        id: data.personPhoto,
      },
    });
    const { data: respData } = response;
    setPhotoInfo(respData.image);
  };

  useEffect(() => {
    if (data && !photoInfo) {
      fetchPhotoInfo(data);
    }
  }, [data, photoInfo]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const options = { year: "numeric", month: "short", day: "numeric" };

  if (data) {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 23,
            marginTop: 10,
            textDecorationLine: "underline",
          }}
        >
          Booking Information
        </Text>
        <View style={{ width: "90%", marginTop: 20 }}>
          <Text style={{ marginTop: 10, fontSize: 16 }}>
            <Text style={{ color: "gray", fontSize: 15 }}>Provider</Text> :{" "}
            {data["provider"]}
          </Text>
          <Text style={{ marginTop: 10, fontSize: 16 }}>
            <Text style={{ color: "gray", fontSize: 15 }}>Name</Text> :{" "}
            {data["personName"]}
          </Text>
          <Text style={{ marginTop: 10, fontSize: 16 }}>
            <Text style={{ color: "gray", fontSize: 15 }}>Booking Details</Text>{" "}
            : {data["name"]}
          </Text>
          <Text style={{ marginTop: 10, fontSize: 16 }}>
            <Text style={{ color: "gray", fontSize: 15 }}>Booking Date</Text> :{" "}
            {new Date(data["date_of_avail"]).toLocaleDateString(
              undefined,
              options
            )}
          </Text>
          <Text style={{ marginTop: 10, fontSize: 16 }}>
            <Text style={{ color: "gray", fontSize: 15 }}>Created On</Text> :{" "}
            {new Date(data["date_of_booking"]).toLocaleDateString(
              undefined,
              options
            )}
          </Text>
          <Text style={{ marginTop: 10, fontSize: 16, color: "gray" }}>
            Description
          </Text>
          <Text style={{ marginTop: 10, fontSize: 15 }}>
            {data["description"]}
          </Text>
        </View>
        {photoInfo ? (
          <Image
            source={{ uri: "data:image/png;base64," + photoInfo }}
            style={{
              width: 200,
              height: 200,
              marginTop: 20,
              resizeMode: "contain",
            }}
          />
        ) : null}
        <View style={{ marginTop: 20 }} />
        <Button
          title={"Scan Again"}
          onPress={() => {
            setData(null);
            setPhotoInfo(null);
          }}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 23,
          marginTop: 10,
          textDecorationLine: "underline",
        }}
      >
        Scan QR Codes to Verify
      </Text>
      <Camera style={styles.camera} type={type} onBarCodeScanned={onQRScan}>
        <View style={styles.buttonContainer}></View>
      </Camera>
    </View>
  );
};
