// eslint-disable-next-line no-unused-vars
import React from "react";
import styled from "styled-components";

import { useRecentBookings, useRecentStays } from "./usedashboard";
import { useGetCabin } from "../cabins/useCabin";
import Spinner from "../../ui/Spinner";
import States from "./States";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useGetCabin();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  
  return (
    <StyledDashboardLayout>
      <States
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        CabinCount={cabins?.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
