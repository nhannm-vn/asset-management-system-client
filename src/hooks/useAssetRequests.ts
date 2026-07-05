import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { assetRequestsApi } from "@/api/assetRequests.api";
import { qk } from "@/lib/queryClient";
import type { ApiError } from "@/types/dto";

export function useMyRequestsQuery() {
  return useQuery({ queryKey: qk.myRequests, queryFn: assetRequestsApi.getMyRequests });
}

export function useAdminRequestsQueryLegacy() {
  return useQuery({ queryKey: qk.adminRequests, queryFn: assetRequestsApi.getAllForAdmin });
}

export function useCreateAssetRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ assetId, workflowId }: { assetId: number; workflowId: number }) =>
      assetRequestsApi.create(assetId, workflowId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.myRequests });
      qc.invalidateQueries({ queryKey: ["assets"] });
      toast.success("Đã gửi yêu cầu mượn tài sản");
    },
    onError: (err: ApiError) => toast.error(err.message),
  });
}

export function useCancelAssetRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => assetRequestsApi.cancel(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.myRequests });
      toast.success("Đã hủy yêu cầu");
    },
    onError: (err: ApiError) => toast.error(err.message),
  });
}
