import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getSettings,
  updateSetting as updateSettingsApi,
} from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useGetSettings() {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryFn: getSettings,
    queryKey: ["settings"],
  });

  return { settings, isLoading, error };
}

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    // @ts-ignore
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      toast.success("Setting update successfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      // @ts-ignore
      toast.error(err.message);
    },
  });

  return { updateSetting, isUpdating };
}
