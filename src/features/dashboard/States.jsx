// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export default function States({
  bookings,
  confirmedStays,
  numDays,
  CabinCount,
}) {
  const bookingCount = bookings.length,
    sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0),
    checkin = confirmedStays.length,
    occupation =
      confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
      (numDays * CabinCount);
  return (
    <>
      <Stat
        title={"bookings"}
        color={"blue"}
        icon={<HiOutlineBriefcase />}
        value={bookingCount}
      />
      <Stat
        title={"sales"}
        color={"green"}
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title={"check-ins"}
        color={"indigo"}
        icon={<HiOutlineCalendarDays />}
        value={checkin}
      />
      <Stat
        title={"occupation rate"}
        color={"yellow"}
        icon={<HiOutlineChartBar />}
        value={Math.ceil(occupation * 100)}
      />
    </>
  );
}
