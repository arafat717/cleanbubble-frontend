import baseApi from "@/redux/api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        makeStripePayment: builder.mutation({
            query: (data) => ({
                url: "/payments/makePayment",
                method: "POST",
                body: data,
            }),
        }),
        makeStripePaymentForPlan: builder.mutation({
            query: (data) => ({
                url: "/userSubscription/createStripeSubscribtion",
                method: "POST",
                body: data,
            }),
        }),
        createStripeAccount: builder.mutation({
            query: (data) => ({
                url: "/payments/create-stripe-account",
                method: "POST",
                body: data
            }),
        }),
        createPaypalAccount: builder.mutation({
            query: (data) => ({
                url: "/paypalPayments/connect",
                method: "PATCH",
                body: data
            }),
        }),
        saveStripePayment: builder.mutation({
            query: (data) => ({
                url: "/payments/save-card",
                method: "POST",
                body: data,
            }),
        }),
        makePaypalPayment: builder.mutation({
            query: (data) => ({
                url: "/paypalPayments/create-payment",
                method: "POST",
                body: data,
            }),
        }),
        makePaypalForSubscription: builder.mutation({
            query: (subscriptionOfferId) => ({
                url: `/userSubscription/createPaypalSubscribtion/${subscriptionOfferId}`,
                method: "POST",
            }),
        }),
        handlePaypalSuccess: builder.mutation({
            query: (data) => ({
                url: "/paypalPayments/success",
                method: "POST",
                body: data,
            }),
        }),
        cancelSubscribtion: builder.mutation({
            query: (data) => ({
                url: "/userSubscription/cancel-subscription",
                method: "POST",
                body: data,
            }),
        }),
        paypalWebhook: builder.mutation({
            query: (data) => ({
                url: "/userSubscription/paypalWebhook",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useMakeStripePaymentMutation,
    useSaveStripePaymentMutation,
    useCreateStripeAccountMutation,
    useMakePaypalPaymentMutation,
    useHandlePaypalSuccessMutation,
    useCancelSubscribtionMutation,
    useCreatePaypalAccountMutation,
    useMakePaypalForSubscriptionMutation,
    useMakeStripePaymentForPlanMutation,
    usePaypalWebhookMutation
} = paymentApi;
