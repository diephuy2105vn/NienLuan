import {
    GET_CART,
    ADD_DETAIL,
    DELETE_DETAIL,
    INCREASE_QUANTITY,
    REDUCE_QUANTITY,
    SET_QUANTITY,
} from "./constances";

export const getCart = (payload) => {
    return {
        type: GET_CART,
        payload,
    };
};

export const addDetail = (product, quantity, userId = null) => {
    return {
        type: ADD_DETAIL,
        payload: {
            product,
            quantity,
            userId,
        },
    };
};

export const deleteDetail = (payload) => {
    return {
        type: DELETE_DETAIL,
        payload,
    };
};

export const reduceQuantity = (payload) => {
    return {
        type: REDUCE_QUANTITY,
        payload,
    };
};

export const increaseQuantity = (payload) => {
    return {
        type: INCREASE_QUANTITY,
        payload,
    };
};

export const setQuantity = (payload) => {
    return {
        type: SET_QUANTITY,
        payload,
    };
};
