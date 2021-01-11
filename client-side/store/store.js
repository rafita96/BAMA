import { createStore, applyMiddleware, combineReducers } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'

import users from './_reducer/userReducer'
import pacients from './_reducer/pacientReducer'
import alerts from './_reducer/alertReducer'

import storage from 'redux-persist/lib/storage'

const bindMiddleware = (middleware) => {
  // if (process.env.NODE_ENV !== 'production') {
  //   const { composeWithDevTools } = require('redux-devtools-extension')
  //   return composeWithDevTools(applyMiddleware(...middleware))
  // }
  return applyMiddleware(...middleware)
}

const combinedReducer = combineReducers({
	users,
	pacients,
	alerts
});

const reducer = (state, action) => {
	return combinedReducer(state, action);
}

const initStore = ({ isServer }) => {

	if(isServer){
		return createStore(reducer, bindMiddleware([thunkMiddleware])); 
	}else{
		const { persistStore, persistReducer, autoRehydrate } = require("redux-persist");
        const storage = require("redux-persist/lib/storage").default;

        const persistConfig = {
			key: 'root_tacos',
			storage
		}

		const persistedReducer = persistReducer(persistConfig, reducer);
		const store = createStore(
            persistedReducer,
            {},
            bindMiddleware([thunkMiddleware])
        ); 

		store.__persistor = persistStore(store); 
        return store;
	}
}

export const wrapper = createWrapper(initStore);