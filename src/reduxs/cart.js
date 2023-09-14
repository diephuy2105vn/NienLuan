import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: "cart",
    initialState: {
        cart: {},
        loading: false,
        error: null,
    },

    reducers: {
        cartRequested: (state, action) => {
            state.loading = true;
        },

        cartReceived: (state, action) => {
            state.cart = action.payload.data;
            state.loading = false;
        },

        cartRequestFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default slice.reducer;

const { cartRequested, cartReceived, cartRequestFailed } = slice.actions;

export const getCart = (id) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: `/${id}`,
            onStart: cartRequested.type,
            onSuccess: cartReceived.type,
            onError: cartRequestFailed.type,
        })
    );
};

export const addDetail = (id, detail) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: `/${id}`,
            method: "POST",
            data: detail,
            onStart: cartRequested.type,
            onSuccess: cartReceived.type,
            onError: cartRequestFailed.type,
        })
    );
};

export const deleteDetail = (id, detail) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: `/${id}`,
            method: "DELETE",
            data: detail,
            onStart: cartRequested.type,
            onSuccess: cartReceived.type,
            onError: cartRequestFailed.type,
        })
    );
};
