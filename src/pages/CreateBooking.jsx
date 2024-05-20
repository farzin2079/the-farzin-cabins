// eslint-disable-next-line no-unused-vars
import React from "react";

import CreateBookingForm from "../features/booking/CreateBookingForm";
import Row from "../ui/Row";
import Heading from "../ui/Heading";

export default function CreateBooking() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Create booking</Heading>
      </Row>
      <CreateBookingForm />
    </>
  );
}
