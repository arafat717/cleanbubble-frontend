import { TQueryParams } from "@/types/user.type";
import baseApi from "../baseApi";


export const ApproveApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllContractorRequest: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: "/users/getContractorRequests",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: ["User"],
        }),
        getAllPendingJobs: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: "/posts/pending",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: ['post'],
        }),
        getAllUserRequest: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: "/users/getUserRequests",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: ["User"],
        }),
        getSingleUser: builder.query({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET",
            }),
        }),
        getSinglePost: builder.query({
            query: (id) => ({
                url: `/posts/${id}`,
                method: "GET",
            }),
        }),
        approveJobPoster: builder.mutation({
            query: (id) => ({
                url: `/admin/approvePost/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ['post']
        }),
        approveUser: builder.mutation({
            query: (id) => ({
                url: `/admin/approveUser/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ['User']
        }),
        rejectUser: builder.mutation({
            query: ({ id, suggestion }) => ({
                url: `/admin/rejectUser/${id}`,
                method: "PUT",
                body: { suggestion },
            }),
            invalidatesTags: ['User']
        }),
        rejectPost: builder.mutation({
            query: (id) => ({
                url: `/admin/rejectPost/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ['post']
        }),
        adminReport: builder.mutation({
            query: ({ action, id }) => ({
                url: `/reports/takeAction/${id}/action`,
                method: "POST",
                body: { action }
            }),
            invalidatesTags: ['post']
        }),
        sentNotification: builder.mutation({
            query: (data) => ({
                url: `/notification/send-noti`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['post']
        }),
    }),
});

export const {
    useGetAllContractorRequestQuery,
    useGetAllUserRequestQuery,
    useGetAllPendingJobsQuery,
    useGetSingleUserQuery,
    useGetSinglePostQuery,
    useApproveJobPosterMutation,
    useApproveUserMutation,
    useRejectUserMutation,
    useRejectPostMutation,
    useAdminReportMutation,
    useSentNotificationMutation
} = ApproveApi;