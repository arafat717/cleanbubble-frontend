

import { TQueryParams } from "@/types/user.type";
import { baseApi } from "../baseApi";

export const homeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOffers: builder.query({
            query: () => ({
                url: "/subscription",
                method: "GET",
            }),
            providesTags: ['subs']
        }),
        getSingleOffers: builder.query({
            query: (id) => ({
                url: `/subscription/${id}`,
                method: "GET",
            }),
            providesTags: ['subs']
        }),

        editPlan: builder.mutation({
            query: ({ id, body }) => ({
                url: `/subscription/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ['subs']
        }),

        getTopRatedContractor: builder.query({
            query: () => ({
                url: "/users/contractors/top-rated",
                method: "GET",
            }),
        }),

        getSinglePost: builder.query({
            query: (id) => ({
                url: `/posts/${id}`,
                method: "GET",
            }),
        }),

        getReviews: builder.query({
            query: (id) => ({
                url: `/reviews/order/${id}`,
                method: "GET",
            }),
        }),

        getSingleUser: builder.query({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET",
            }),
        }),
        getAllCompletedOrder: builder.query({
            query: (id) => ({
                url: `/orders/completed/${id}`,
                method: "GET",
            }),
        }),

        getPostByServiceArea: builder.query({
            query: () => {
                return {
                    url: "/posts/contractor/posts",
                    method: "GET",
                };
            },
            providesTags: [],
        }),
        allPost: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: "/posts",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: [],
        }),
        createPost: builder.mutation({
            query: (data) => ({
                url: "/posts",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['post'],
        }),
        giveOrder: builder.mutation({
            query: ({ data, id }) => ({
                url: `/posts/giveOrder/${id}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['post'],
        }),
        updatePost: builder.mutation({
            query: ({ id, body }) => ({
                url: `/posts/${id}`,
                method: "PUT",
                body, // ✅ send FormData directly
            }),
            invalidatesTags: ['post'],
        }),
        acceptTask: builder.mutation({
            query: (id) => ({
                url: `/offers/acceptOfferByContractor/${id}`,
                method: "POST",
            }),
            invalidatesTags: ['post'],
        }),
        acceptCounterTaskByContractor: builder.mutation({
            query: (id) => ({
                url: `/offers/contractor/accept-counter-offer/${id}`,
                method: "POST",
            }),
            invalidatesTags: ['post'],
        }),
        acceptCounterOfferByPoster: builder.mutation({
            query: (id) => ({
                url: `/offers/jobposter/accept-offer/${id}`,
                method: "POST",
            }),
            invalidatesTags: ['post'],
        }),
        makeOffer: builder.mutation({
            query: (data) => ({
                url: `/offers/makeOfferByContractor/${data?.id}`,
                method: "POST",
                body: data.data
            }),
            invalidatesTags: ['post'],
        }),
        makeOfferByPoster: builder.mutation({
            query: (data) => ({
                url: `/offers/jobposter/counter-offer/${data?.id}`,
                method: "POST",
                body: data.data
            }),
            invalidatesTags: ['post'],
        }),
        makeOfferByContractor: builder.mutation({
            query: (data) => ({
                url: `/offers/contractor/counter-offer/${data?.id}`,
                method: "POST",
                body: data.data
            }),
            invalidatesTags: ['post'],
        }),
        declineOffer: builder.mutation({
            query: (id) => ({
                url: `/offers/jobposter/cancel-offer/${id}`,
                method: "POST",
            }),
            invalidatesTags: ['post'],
        }),
    }),
});

export const {
    useGetAllOffersQuery,
    useGetSingleOffersQuery,
    useGetPostByServiceAreaQuery,
    useAllPostQuery,
    useGetSinglePostQuery,
    useGetTopRatedContractorQuery,
    useGetSingleUserQuery,
    useGetAllCompletedOrderQuery,
    useGetReviewsQuery,
    useCreatePostMutation,
    useEditPlanMutation,
    useUpdatePostMutation,
    useAcceptTaskMutation,
    useMakeOfferMutation,
    useAcceptCounterTaskByContractorMutation,
    useDeclineOfferMutation,
    useMakeOfferByPosterMutation,
    useAcceptCounterOfferByPosterMutation,
    useGiveOrderMutation,
    useMakeOfferByContractorMutation
} = homeApi;