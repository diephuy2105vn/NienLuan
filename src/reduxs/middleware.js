import axios from "axios";
import * as actions from "./api";

const middleware =
    ({ dispatch }) =>
    (next) =>
    async (action) => {
        if (action.type !== actions.apiCallBegan.type) return next(action);
        const { url, method, data, onStart, onSuccess, onError } =
            action.payload;
        if (onStart) dispatch({ type: onStart });
        next(action);
        try {
            const response = await axios.request({
                baseURL: "http://localhost:8080/cart",
                url,
                method,
                data: { data: data },
            });
            console.log(response.data);
            dispatch(actions.apiCallSucess(response.data));
            if (onSuccess)
                dispatch({ type: onSuccess, payload: response.data });
        } catch (error) {
            dispatch(actions.apiCallFailed(error.message));
            if (onError) dispatch({ type: onError, payload: error.message });
        }
    };

export default middleware;
