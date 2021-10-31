import React, { useEffect, useState } from "react";
import { SearchBar } from "react-native-elements";
import { Bookings } from "./Bookings";
import axios from "axios";
import { BACKEND_URL } from "../constants";

const ViewBooking = ({ aadhar, name, photo }) => {
  const [searchText, setSearchText] = useState("");
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    const upcomingBookings = [];
    const expiredBookings = [];

    const response = await axios.post(BACKEND_URL + "user/service", { aadhar });
    const { data } = response;
    const { services } = data;
    const formatData = services.map((service) => ({
      provider: service["hospitality.name"],
      image: service["hospitality.url"],
      name: service["name"],
      description: service["description"],
      date_of_booking: new Date(service["date_of_booking"]),
      date_of_avail: new Date(service["date_of_avail"]),
      id: service["id"],
    }));

    formatData.forEach((booking) => {
      if (new Date() > booking.date_of_avail) upcomingBookings.push(booking);
      else expiredBookings.push(booking);
    });

    upcomingBookings.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    expiredBookings.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    upcomingBookings.push(...expiredBookings);
    setBookings(upcomingBookings);
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <>
      <SearchBar
        placeholder="Search via booking info or provider"
        onChangeText={setSearchText}
        value={searchText}
      />
      <Bookings bookings={bookings} name={name} photo={photo} />
    </>
  );
};

export { ViewBooking };
