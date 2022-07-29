import { SAVE_WALLET, SAVE_TASK, SAVE_CASH } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0,
  cash: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_WALLET:
    return {
      ...state,
      currencies: action.data,
    };
  case SAVE_TASK:
    return {
      ...state,
      expenses: [...state.expenses, action.task],
    };
  case SAVE_CASH:
    return {
      ...state,
      cash: Number(action.cash),
    };
  default:
    return state;
  }
};

export default wallet;
