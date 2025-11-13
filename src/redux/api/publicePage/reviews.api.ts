import { TQueryParams } from "@/types/user.type";
import { baseApi } from "../baseApi";

export const homeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCustomerReviews: builder.query({
            query: () => ({
                url: "/reviews/customers",
                method: "GET",
            }),
        }),

        getAllCustomerPendingReviews: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: "/reviews/pending-customers",
                    method: "GET",
                };
            },
            providesTags: ['reviews'],
        }),

        getAllContractorReviews: builder.query({
            query: () => ({
                url: "/reviews/contractors",
                method: "GET",
            }),
        }),


        getAllContractorPendingReviews: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: "/reviews/pending-contractors",
                    method: "GET",
                };
            },
            providesTags: ['reviews'],
        }),

        getAllPaymentStatus: builder.query({
            query: () => ({
                url: "/admin/payments/stats",
                method: "GET",
            }),
        }),
        approveReview: builder.mutation({
            query: (id) => ({
                url: `/reviews/approve/${id}`,
                method: "PATCH",
            }),
        }),
        getSingleSubscription: builder.query({
            query: (id) => ({
                url: `/subscription/${id}`,
                method: "GET",
            }),
        }),
        rejectReview: builder.mutation({
            query: (id) => ({
                url: `/reviews/decline/${id}`,
                method: "PATCH",
            }),
        }),
        addReview: builder.mutation({
            query: (data) => ({
                url: `/reviews/createReview`,
                method: "POST",
                body: data
            }),
        }),
        addReport: builder.mutation({
            query: (data) => ({
                url: `/reports/reportUser`,
                method: "POST",
                body: data
            }),
        }),
    }),
});

export const {
    useGetAllCustomerReviewsQuery,
    useGetAllContractorReviewsQuery,
    useGetAllPaymentStatusQuery,
    useGetAllContractorPendingReviewsQuery,
    useGetAllCustomerPendingReviewsQuery,
    useApproveReviewMutation,
    useRejectReviewMutation,
    useAddReviewMutation,
    useAddReportMutation,
    useGetSingleSubscriptionQuery
} = homeApi;