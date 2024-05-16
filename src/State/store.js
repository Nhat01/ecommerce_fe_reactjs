import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { customerProductReducer } from "./Product/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import { userReducer } from "./User/Reducer";
import { customerCategoryReducer } from "./Category/Reducer";

const rootReducers = combineReducers({
   auth: authReducer,
   products: customerProductReducer,
   cart: cartReducer,
   order: orderReducer,
   user: userReducer,
   category: customerCategoryReducer,
});
export const store = legacy_createStore(
   rootReducers,
   composeWithDevTools(applyMiddleware(thunk))
);
