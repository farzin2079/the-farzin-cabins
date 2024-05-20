import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getCabins } from "../../services/apiCabins";
import { createEditeCabin } from "../../services/apiCabins";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useGetCabin() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfully DELETED ");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    // @ts-ignore
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditeCabin,
    onSuccess: () => {
      toast.success("cabin create successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
        // @ts-ignore
      toast.error(err.message);
    },
  });

  return { createCabin, isCreating };
}

export function useEditeCabin() {
  const queryClient = useQueryClient();

  const { mutate: editeCabin, isLoading: isEditing } = useMutation({
    // @ts-ignore
    mutationFn: ({ newCabinData, id }) => createEditeCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("cabin edite successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      // @ts-ignore
      toast.error(err.message);
    },
  });

  return { editeCabin, isEditing };
}
