import { createStore, applyMiddleware } from "redux";

const middleware = ({ dispatch }) => (next) => async (action) => {
    const { type, payload } = action;
    switch (type) {
        default: {
            next(action);
            break;
        }
    }
};

const initialState = {
    theme: "light",
};

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "LIGHT_THEME":
            return { theme: "light" };
        case "DARK_THEME":
            return { theme: "dark" };
        default:
            return { ...state };
    }
};

const store = createStore(reducer, {}, applyMiddleware(middleware));

export default store;
