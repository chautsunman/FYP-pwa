import {fromJS} from 'immutable';

const INITIAL_STATE = fromJS({
  stocks: [],
  stockCodeIndexMap: {},
  stockDetails: {},
  stockPrices: {},
  models: {},
  predictions: {}
});

const stock = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_STOCKS':
      return state.set('stocks', action.stocks).set('stockCodeIndexMap', action.stockCodeIndexMap);
    case 'GET_STOCK':
      return state.set('stockDetails', action.stock);
    case 'GET_STOCK_PRICES':
      return state.setIn(['stockPrices', action.stockCode], action.stockPriceData);
    case 'GET_PREDICTIONS':
      return state
          .setIn(['predictions', action.stockCode], action.predictions)
          .setIn(['models', action.stockCode], action.models);
    default:
      return state;
  }
};

export default stock;
