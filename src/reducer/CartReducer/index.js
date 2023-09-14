import {
    GET_CART,
    ADD_DETAIL,
    DELETE_DETAIL,
    INCREASE_QUANTITY,
    REDUCE_QUANTITY,
    SET_QUANTITY,
} from "./constances";
import instance from "../../axios";

export const initialCart = { details: [], totalPrice: 0 };

const CartReducer = (state, action) => {
    switch (action.type) {
        case GET_CART:
            break;
        case ADD_DETAIL:
            break;
        case DELETE_DETAIL:
            break;
        case INCREASE_QUANTITY:
            break;
        case REDUCE_QUANTITY:
            break;
        case SET_QUANTITY:
            break;
        default:
            break;
    }
};

export default CartReducer;
