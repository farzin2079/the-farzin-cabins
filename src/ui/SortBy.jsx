// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";
import Button from "./Button";
import { HiOutlineArrowsUpDown, HiArrowUp, HiOutlineAcademicCap } from "react-icons/hi2";

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [direction, setdirection] = useState("asc");

  function changeHandler(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  function directionsHandler(){
    setdirection((d) => d === "asc" ? "desc" : "asc")
    searchParams.set("direction", direction)
    setSearchParams(searchParams)
  }

  return (
    <>
      <Select options={options} type="white" onChange={changeHandler} />
      <Button variation="secondary" onClick={directionsHandler}> <HiOutlineArrowsUpDown /> </Button>
    </>
  );
}
