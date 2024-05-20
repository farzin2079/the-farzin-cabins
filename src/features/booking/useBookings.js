import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import {
  getBookings,
  getBooking,
  deleteBooking as deleteBookingApi,
  getGuests,
  greateBookingApi,
  greateGuestApi,
} from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";
import toast from "react-hot-toast";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const field = searchParams.get("sortBy") || "startDate";
  const direction = searchParams.get("direction") === "asc";

  // PAGINATION
  const page = Number(searchParams.get("page")) || 1;

  const sortBy = { field, direction };

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // @ts-ignore
  const pageCount = Math.ceil(count / PAGE_SIZE);

  // PRE-FETCHING
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, error, count };
}

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
  });

  return { isLoading, booking, error };
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking successfully DELETED ");

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    // @ts-ignore
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}

export function useGetGuests() {
  const { data: guests, isLoading } = useQuery({
    queryFn: getGuests,
    queryKey: ["guests"],
  });

  return { guests, isLoading };
}

export function useCreateBooking() {
  const navigate = useNavigate();

  const { mutate: createBooking, isLoading } = useMutation({
    mutationFn: greateBookingApi,
    onSuccess: () => {
      toast.success("create booking was successfuly");
      navigate(`/bookings/${data.id}`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createBooking, isLoading };
}

export function useCreateGuest() {
  const { mutate: createGuest, isLoading } = useMutation({
    mutationFn: greateGuestApi,
    onSuccess: () => {
      toast.success("create guest was successfuly");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createGuest, isLoading };
}