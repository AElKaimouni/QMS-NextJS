import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<string>) {
      state.token = action.payload;
      window.localStorage.setItem("JWT_TOKEN", action.payload)
    },
    clearAuth(state) {
      state.token = '';
      window.localStorage.removeItem("JWT_TOKEN")
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;