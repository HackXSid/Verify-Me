import React from "react";
import { ScrollView, Text } from "react-native";
import { CardBooking } from "./CardBooking";

export const Bookings = ({ bookings, name, photo }) => {
  const getBookings = () => {
    return bookings.map((booking) => (
      <CardBooking
        key={booking.id}
        image={booking.image}
        provider={booking.provider}
        name={booking.name}
        description={booking.description}
        date_of_booking={booking.date_of_booking}
        date_of_avail={booking.date_of_avail}
        personName={name}
        personPhoto={photo}
      />
    ));
  };

  if (bookings.length === 0) {
    return (
      <Text style={{ textAlign: "center", marginTop: 20, fontSize: 18 }}>
        No bookings available
      </Text>
    );
  }

  return (
    <>
      <ScrollView style={{ height: "100%", paddingBottom: 10 }}>
        {getBookings()}
      </ScrollView>
    </>
  );
};
