// Coloque aqui suas actions
export const SAVE_USER = 'SAVE_USER';

export const saveUserData = (email) => ({
  type: SAVE_USER,
  email,
});
