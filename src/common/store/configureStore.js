import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { appReducer as rootReducer} from "./rootReducer";


export const configureStore = (initialState) => {
    let middlewares = [
        thunk
    ];
    return createStore(rootReducer, initialState, compose(
        applyMiddleware(...middlewares)
    ));
}
