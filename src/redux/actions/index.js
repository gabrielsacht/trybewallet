export const SAVE_USER = 'SAVE_USER';
export const SAVE_WALLET = 'SAVE_WALLET';

export const saveUserData = (email) => ({
  type: SAVE_USER,
  email,
});

export const saveWalletData = (data) => ({
  type: SAVE_WALLET,
  data,
});
