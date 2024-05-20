// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSearchParams } from "react-router-dom";

import { useGetCabin } from "./useCabin";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";


export default function CabinTable() {
  const { isLoading, cabins } = useGetCabin();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
// FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filtredCabins =
    filterValue !== "all"
      ? filterValue !== "discounted"
        ? cabins?.filter((cabin) => cabin.discount === 0)
        : cabins?.filter((cabin) => cabin.discount > 0)
      : cabins;
// SORT
const sortBy = searchParams.get("sortBy") || "name";
const direction = searchParams.get("direction") === "desc" ? -1 : 1 ;

const sortCabin = filtredCabins?.sort((a,b) => (a[sortBy] - b[sortBy]) * direction)

  return (
    <Menus>
      <Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
        <Table.header>
          <div></div>
          <div>cabin</div>
          <div>capacity</div>
          <div>Price</div>
          <div>discount</div>
          <div></div>
        </Table.header>

        <Table.body
          data={sortCabin}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
