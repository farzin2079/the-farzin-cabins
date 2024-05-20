// eslint-disable-next-line no-unused-vars
import React from "react";
import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import { useCreateGuest } from "./useBookings";

export default function CreateGuestForm() {
  const { register, handleSubmit, formState, reset } = useForm(),
    { errors } = formState;

  const { createGuest, isLoading } = useCreateGuest();

  function submitAction(data) {
    data.countryFlag = `https://flagcdn.com/${data.countryFlag}.png`;
    console.log(data);
    createGuest(data);
  }

  return (
    <Form onSubmit={handleSubmit(submitAction)} type="modal">
      <FormRow label={"Guest Fullname"} error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "guest fullname most be fill" })}
        />
      </FormRow>

      <FormRow label={"Guest Email"} error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", { required: "Guest email most be fill" })}
        />
      </FormRow>

      <FormRow label={"Guest National id"} error={errors?.nationalId?.message}>
        <Input
          type="number"
          id="national-id"
          {...register("nationalID", {
            required: "Guest nationalId most be fill",
          })}
        />
      </FormRow>

      <FormRow label={"Guest Nationality"} error={errors?.nationality?.message}>
        <Input
          type="text"
          id="nationality"
          {...register("nationality", {
            required: "Guest nationality most be fill",
          })}
        />
      </FormRow>

      <FormRow
        label={"Guest country code"}
        error={errors?.countryFlag?.message}
      >
        <Input
          type="text"
          id="countryFlag"
          {...register("countryFlag", {
            required: "Guest country code most be fill",
          })}
        />
      </FormRow>

      <FormRow>
        <Button type="reset" variation="secondary">
          Reset
        </Button>
        <Button disabled={isLoading}>Done with Geust</Button>
      </FormRow>
    </Form>
  );
}

// most go to another page and there can add guest in modal
