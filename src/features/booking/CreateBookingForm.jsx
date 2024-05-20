/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { useGetCabin } from "../cabins/useCabin";

import CreateGuestForm from "./CreateGuestForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Checkbox from "../../ui/Checkbox";
import Textarea from "../../ui/Textarea";
import Form from "../../ui/Form";
import Spinner from "../../ui/Spinner";
import { useCreateBooking, useGetGuests } from "./useBookings";
import styled from "styled-components";
import { useGetSettings } from "../settings/useSettings";
import { formatCurrency, getNumNights } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const Styledselect = styled.select`
  border-radius: 12px;
  background-color: transparent;
  padding: 6px 12px;
`;

// useForm suggesttion for select inputs
const Select = React.forwardRef(
  // @ts-ignore
  ({ onChange, onBlur, name, options }, ref) => (
    <>
      <Styledselect name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.text}
          </option>
        ))}
      </Styledselect>
    </>
  )
);

const today = new Date().toISOString;

export default function CreateBookingForm() {
  const { register, handleSubmit, formState, control, getValues } = useForm();

  const { cabins, isLoading } = useGetCabin();
  const { guests, isLoading: isLoading2 } = useGetGuests();
  const { settings, isLoading: isLoading3 } = useGetSettings();

  const { createBooking, isLoading: isCreating } = useCreateBooking();

  const { errors } = formState;

  if (isLoading || isLoading2 || isLoading3) return <Spinner />;
  const cabinsOption = cabins?.map((data) => {
    return {
      text: `${data.name} / ${data.maxCapacity} guest / ${formatCurrency(
        data.regularPrice
      )}`,
      value: data.id,
    };
  });

  const guestsOption = guests?.map((data) => {
    return {
      text: data.fullName,
      value: data.id,
    };
  });

  function submitAction(data) {
    data.numNights = getNumNights(data.startDate, data.endDate);
    data.status = "unconfirmed";
    data.isPaid = false;
    data.cabinId = Number(data.cabinId);

    data.cabinPrice =
      cabins?.filter((cabin) => cabin.id === data.cabinId)[0].regularPrice *
      data.numNights;

    data.hasBreakfast = data.hasBreakfast === undefined ? false : true;

    data.extrasPrice = data.hasBreakfast
      ? settings.breakfastPrice * data.numNights * data.numGuests
      : 0;

    data.totalPrice = data.cabinPrice + data.extrasPrice;

    createBooking(data);
  }

  return (
    <>
      <Modal>
        <span>Add or Select a guest </span>
        <Modal.open opens="guest-form">
          <Button type="button">Add guest</Button>
        </Modal.open>
        <Modal.window name="guest-form">
          <CreateGuestForm />
        </Modal.window>
      </Modal>

      <Form onSubmit={handleSubmit(submitAction)}>
        <FormRow label="select a guest" error={errors?.geust?.message}>
          <Select
            // @ts-ignore
            options={guestsOption}
            {...register("guestId")}
          />
        </FormRow>
        <FormRow label={"select a cabin"} error={errors?.cabin?.message}>
          <Select
            // @ts-ignore
            options={cabinsOption}
            {...register("cabinId")}
          />
        </FormRow>
        <FormRow label={"guest number"} error={errors?.guestNum?.message}>
          <Input
            type="number"
            id="numGuests"
            {...register("numGuests", {
              required: "Guests number of nights coundn't be empty",
            })}
          />
        </FormRow>
        <FormRow label={"Start date"} error={errors?.startDate?.message}>
          <Input
            type="date"
            id="startDate"
            {...register("startDate", {
              required: "Start date coundn't be empty",
              validate: (value) =>
                today <= value || "start date can not be before today",
            })}
          />
        </FormRow>
        <FormRow label={"Nights of stying"} error={errors?.endDate?.message}>
          <Input
            type="date"
            id="endDate"
            {...register("endDate", {
              required: "Start date coundn't be empty",
              validate: (value) =>
                getValues().startDate < value ||
                "end date is before start date",
            })}
          />
        </FormRow>
        <Box>
          <Controller
            name="hasBreakfast"
            control={control}
            render={({ field }) => (
              // @ts-ignore
              <Checkbox {...field}>
                want break fast for {formatCurrency(settings.breakfastPrice)}{" "}
                per night
              </Checkbox>
              // @ts-ignore
            )}
          />
        </Box>
        <FormRow label={"observations"} error={errors?.observations?.message}>
          <Textarea
            id="observations"
            placeholder="guests will be ..."
            {...register("observations")}
          />
        </FormRow>
        <FormRow>
          <Button
            type="reset"
            // @ts-ignore
            variation="secondary"
          >
            Reset
          </Button>
          <Button type="submit" disabled={isCreating}>
            Register
          </Button>
        </FormRow>
      </Form>
    </>
  );
}
