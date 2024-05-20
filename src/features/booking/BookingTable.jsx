// eslint-disable-next-line no-unused-vars
import React from "react";

import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useBookings } from "./useBookings";
import Button from "../../ui/Button";

function BookingTable() {
  const { isLoading, bookings, count } = useBookings();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.header>
        <Table.body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.footer>
          <Pagination count={count} />
        </Table.footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
