import { createStore } from 'redux';
import searchReducer from './Reducer';

const store = createStore(searchReducer);

export default store;