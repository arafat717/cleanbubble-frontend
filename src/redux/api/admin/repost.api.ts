import { TQueryParams } from "@/types/user.type";
import baseApi from "../baseApi";


export const ApproveApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getContractorReport: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: "/reports/getContractorReports",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: ["User"],
        }),
        getUserReport: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: "/reports/getUserReports",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: ['post'],
        }),
        getSingleReport: builder.query({
            query: (id) => ({
                url: `/reports/getReport/${id}`,
                method: "GET",
            }),
        }),
        getNotiFication: builder.query({
            query: () => ({
                url: `/notification/get-noti`,
                method: "GET",
            }),
        }),
        getUnreadNoti: builder.query({
            query: () => ({
                url: `/notification/unread-noti`,
                method: "GET",
            }),
        }),
        readNotification: builder.mutation({
            query: () => ({
                url: `/notification/read-noti`,
                method: "PATCH",
            }),
        }),
        deleteNoti: builder.mutation({
            query: (id) => ({
                url: `/notification/delete-noti/${id}`,
                method: "DELETE",
            }),
        }),
        sentMessage: builder.mutation({
            query: (data) => ({
                url: `/users/support/message`,
                method: "POST",
                body: data
            }),
        }),
        trackProgress: builder.query({
            query: (id) => ({
                url: `/orders/trackOrder/${id}`,
                method: "GET"
            }),
        }),
        getMySubsCribtion: builder.query({
            query: () => ({
                url: `/userSubscription/getMySubscription`,
                method: "GET"
            }),
        }),
        cancelMySubsCribtion: builder.mutation({
            query: () => ({
                url: `/userSubscription/cancel-subscription`,
                method: "POST"
            }),
        }),
    }),
});

export const {
    useGetContractorReportQuery,
    useGetUserReportQuery,
    useGetSingleReportQuery,
    useGetNotiFicationQuery,
    useReadNotificationMutation,
    useGetUnreadNotiQuery,
    useDeleteNotiMutation,
    useSentMessageMutation,
    useTrackProgressQuery,
    useGetMySubsCribtionQuery,
    useCancelMySubsCribtionMutation
} = ApproveApi;