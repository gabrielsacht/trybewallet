export const SAVE_USER = 'SAVE_USER';
export const SAVE_WALLET = 'SAVE_WALLET';

export const saveUserData = (email) => ({
  type: SAVE_USER,
  email,
});

export const getCurrenciesData = (data) => ({
  type: SAVE_WALLET,
  data,
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
