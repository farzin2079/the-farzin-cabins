// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import styled from "styled-components";
import BookingDataBox from "../booking/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import { formatCurrency } from "../../utils/helpers";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useChecking } from "./useCheck-in-out";
import { useBooking } from "../booking/useBookings";
import { useGetSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useGetSettings();

  const moveBack = useMoveBack();
  const { checkin, isChecking } = useChecking();

  if (isLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfast = numGuests * numNights * settings.breakfastPrice;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      // @ts-ignore
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfast,
          totalPrice: totalPrice + optionalBreakfast,
        }
      });
    } else {
      // @ts-ignore
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
      
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            onChange={() => {
              setAddBreakfast((s) => !s);
              setConfirmPaid(false);
            }}
            checked={addBreakfast}
            id="breakfast"
            disabled={isChecking}
          >
            want breakfast for
            {formatCurrency(optionalBreakfast)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          onChange={() => setConfirmPaid((s) => !s)}
          checked={confirmPaid}
          id="confirm"
          disabled={confirmPaid || isChecking}
        >
          I confirm that {guests.fullName} has paid total amout of{" "}
          {hasBreakfast
            ? `${formatCurrency(totalPrice + optionalBreakfast)} (
          ${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfast)})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={isChecking}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
