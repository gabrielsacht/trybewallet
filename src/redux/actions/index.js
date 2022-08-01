export const SAVE_USER = 'SAVE_USER';
export const SAVE_WALLET = 'SAVE_WALLET';
export const SAVE_TASK = 'SAVE_TASK';
export const SAVE_CASH = 'SAVE_CASH';
export const DELETE_TASK = 'DELETE_TASK';
// USER REDUCER

export const saveUserData = (email) => ({
  type: SAVE_USER,
  email,
});

// WALLET REDUCER

export const getCurrenciesData = (data) => ({
  type: SAVE_WALLET,
  data,
});

export const saveTaskData = (task) => ({
  type: SAVE_TASK,
  task,
});

export const saveCash = (cash) => ({
  type: SAVE_CASH,
  cash,
});

export const deleteTask = (task) => ({
  type: DELETE_TASK,
  task,
});

export const getCurrencies = () => async (dispatch) => {
  try {
    const response = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
    const currenciesArray = Object.keys(response).filter((moeda) => moeda !== 'USDT');
    dispatch(getCurrenciesData(currenciesArray));
  } catch (error) {
    console.log(error);
  }
};
