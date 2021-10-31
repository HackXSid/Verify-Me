import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-elements";
import { Fumi } from "react-native-textinput-effects";
import axios from "axios";
import { parseString } from "react-native-xml2js";
import { BACKEND_URL } from "../constants";
import { OverlayContainer } from "../containers/OverlayContainer";

const styles = StyleSheet.create({
  heading: {
    fontSize: 23,
    marginBottom: 20,
    textDecorationLine: "underline",
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(208, 208, 203, 0.66)",
    marginTop: 10,
  },
  blocked: {
    backgroundColor: "rgba(208, 208, 203, 0.36)",
    marginTop: 10,
    width: "100%",
  },
  captcha: {
    width: 300,
    marginTop: 40,
    height: 80,
    borderWidth: 2,
    borderColor: "rgba(208, 208, 203, 0.66)",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  success: {
    color: "green",
    textAlign: "center",
  },
  buttonInBuildContainer: {
    marginTop: 35,
    width: 250,
    backgroundColor: "red",
  },
});

export const Login = ({ toggleOverlay, overlayVisible, login }) => {
  const [loading, setLoading] = useState(false);
  const [aadhar, setAadhar] = useState("999937304778");
  const [enteredCaptcha, setEnteredCaptcha] = useState("");
  const [otp, setOtp] = useState({});
  const [enteredOtp, setEnteredOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [captcha, setCaptcha] = useState("");

  const handleAadharChange = (text) => {
    setAadhar(text.split(" ").join(""));
  };

  const displayAadhar = () => {
    const regMatch = aadhar.match(/.{1,4}/g);
    if (!regMatch) return "";
    return regMatch.join(" ");
  };

  const getCaptcha = async () => {
    const response = await axios.get(`${BACKEND_URL}uidai/genCaptcha`);
    const { data } = response;
    setCaptcha(data);
  };

  useEffect(() => {
    getCaptcha();
  }, []);

  const verifyCaptchaAndGetOTP = async () => {
    const postData = {
      uidNumber: aadhar,
      captchaTxnId: captcha.captchaTxnId,
      captchaValue: enteredCaptcha,
    };
    const response = await axios.post(`${BACKEND_URL}uidai/getOtp`, postData);
    const { data } = response;
    const { status, message } = data;
    if (status === "Success") {
      if (errorMessage) setErrorMessage("");
      setSuccessMessage(message);
      setOtp(data);
    } else {
      if (successMessage) setSuccessMessage("");
      setErrorMessage(message);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    const postData = {
      uid: aadhar,
      txnId: otp.txnId,
      otp: enteredOtp,
    };

    const response = await axios.post(
      `${BACKEND_URL}uidai/authenticate`,
      postData
    );
    const { data } = response;
    if (data.errCode === "K-100") {
      setErrorMessage("Invalid OTP");
      setLoading(false);
      setSuccessMessage("");
    } else {
      if (errorMessage) setErrorMessage("");
      setLoading(false);
      const { eKycString } = data;
      parseString(eKycString, async (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        const ekyc = result.KycRes.UidData[0];
        console.log(ekyc);
        const photo = ekyc.Pht[0];
        const response = await axios.post(BACKEND_URL + "uidai/ekyc", {
          image: photo,
        });
        const { data } = response;
        const { id: imageId } = data;
        const name = ekyc.Poi[0]["$"]["name"];
        login(aadhar, imageId, name);
      });
    }
  };

  return (
    <OverlayContainer toggleOverlay={toggleOverlay} visible={overlayVisible}>
      <Text style={styles.heading}>Login via Aadhar</Text>
      {loading ? <ActivityIndicator size="large" /> : null}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {successMessage ? (
        <Text style={styles.success}>{successMessage}</Text>
      ) : null}
      <Fumi
        label={"Aadhar Number"}
        iconClass={FontAwesomeIcon}
        iconName={"lock"}
        iconColor={"black"}
        iconSize={20}
        iconWidth={40}
        inputPadding={16}
        style={
          Object.keys(otp).length !== 0 ? styles.blocked : styles.textInput
        }
        value={displayAadhar(aadhar)}
        onChangeText={handleAadharChange}
      />
      <Fumi
        label={"Captcha Code"}
        iconClass={FontAwesomeIcon}
        iconName={"eye"}
        iconColor={"black"}
        iconSize={20}
        iconWidth={40}
        inputPadding={16}
        autoCapitalize={"none"}
        style={
          Object.keys(otp).length !== 0 ? styles.blocked : styles.textInput
        }
        value={enteredCaptcha}
        onChangeText={setEnteredCaptcha}
      />
      <Fumi
        label={"OTP"}
        iconClass={MaterialCommunityIcons}
        iconName={"security"}
        iconColor={"black"}
        iconSize={20}
        iconWidth={40}
        inputPadding={16}
        style={
          Object.keys(otp).length === 0 ? styles.blocked : styles.textInput
        }
        value={enteredOtp}
        onChangeText={setEnteredOtp}
      />
      {captcha.captchaBase64String ? (
        <Image
          source={{
            uri: `data:image/png;base64,${captcha.captchaBase64String}`,
          }}
          style={styles.captcha}
        />
      ) : null}
      <Button
        title={Object.keys(otp).length === 0 ? "Verify Captcha" : "Submit OTP"}
        onPress={
          Object.keys(otp).length === 0 ? verifyCaptchaAndGetOTP : verifyOTP
        }
        raised
        containerStyle={styles.buttonInBuildContainer}
      />
    </OverlayContainer>
  );
};
