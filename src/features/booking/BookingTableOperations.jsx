// eslint-disable-next-line no-unused-vars
import React from "react";
import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate", label: "Sort by date" },
          { value: "totalPrice", label: "Sort by amount" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
