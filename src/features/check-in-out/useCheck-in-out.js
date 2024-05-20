import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getStaysTodayActivity, updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import TodayActivity from "./TodayActivity";

export function useChecking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isChecking } = useMutation({
    // @ts-ignore
    mutationFn: ({bookingId, breakfast}) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in `);
      // @ts-ignore
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => toast.error("there was an error while checking in ")
  });

  return{ checkin, isChecking }
}


export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out `);
      // @ts-ignore
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error("there was an error while checking out ")
  });

  return { checkout, isCheckingOut }
}

export function useTodayActivity(){

  const {data: activity, isLoading} = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"]
  })

  return {activity, isLoading}
}