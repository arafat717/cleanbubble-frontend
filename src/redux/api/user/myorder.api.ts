import { TQueryParams } from "@/types/user.type";
import baseApi from "../baseApi";


export const MyorderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllpost: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: "/posts/my-posts/list",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: ["post"],
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
        getAllCompletedPost: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: "/orders/completed",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: ["post"],
        }),
        getAllAcceptedPost: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: "/orders/pending",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: ["post"],
        }),
        getAllPostersOffers: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: "/offers/jobposter/pending",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: ["post"],
        }),
        getAllContractorOffers: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: "/offers/contractor/pending",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: ["post"],
        }),
        repostJob: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/posts/${id}/repost`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ['post']
        }),
        deletePost: builder.mutation({
            query: (id,) => ({
                url: `/orders/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['post']
        }),

        updateUser: builder.mutation({
            query: () => ({
                url: `/users/profile`,
                method: "PUT",
            }),
            invalidatesTags: ['User']
        }),
        updateProgress: builder.mutation({
            query: ({ data, id }) => ({
                url: `/orders/update-status/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['post']
        }),
        getSingleOrder: builder.query({
            query: (id) => ({
                url: `/orders/trackOrder/${id}`,
                method: "GET",
            }),
            providesTags: ['post']
        }),
        getAllOffers: builder.query({
            query: (id) => ({
                url: `/offers/post/${id}`,
                method: "GET",
            }),
            providesTags: ['post']
        }),
        getAllOffersForPoster: builder.query({
            query: (id) => ({
                url: `/offers/post/${id}`,
                method: "GET",
            }),
            providesTags: ['post']
        }),
    }),
});

export const {
    useGetAllpostQuery,
    useGetAllUserRequestQuery,
    useGetAllPendingJobsQuery,
    useGetAllCompletedPostQuery,
    useRepostJobMutation,
    useDeletePostMutation,
    useGetAllAcceptedPostQuery,
    useUpdateUserMutation,
    useGetAllContractorOffersQuery,
    useGetAllPostersOffersQuery,
    useUpdateProgressMutation,
    useGetSingleOrderQuery,
    useGetAllOffersQuery,
    useGetAllOffersForPosterQuery
} = MyorderApi;