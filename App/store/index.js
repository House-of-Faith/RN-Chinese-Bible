import { createStore, applyMiddleware } from "redux";
import reducers, { initialState } from './reducers';
import selectors from './selectors';

const middleware = ({ dispatch }) => (next) => async (action) => {
    const { type, payload } = action;
    switch (type) {
        default: {
            next(action);
            break;
        }
    }
};

const store = createStore(reducers, applyMiddleware(middleware));

export default store;

export { selectors, initialState }
