// eslint-disable-next-line no-unused-vars
import React from "react";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

export default function CabinTableOpration() {
  return (
    <TableOperations>
      <Filter
        filterField={"discount"}
        options={[
          { value: "all", label: "All" },
          { value: "discounted", label: "Discounted" },
          { value: "no-discount", label: "No discounted" },
        ]}
      />
      <SortBy
        options={[
          { value: "name", label: "Name" },
          { value: "regularPrice", label: "Price" },
          { value: "maxCapacity", label: "Capacity" },
        ]}
      />
    </TableOperations>
  );
}
