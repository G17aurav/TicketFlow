import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Auth: (() => {
    try {
      const profile = localStorage.getItem("profile");
      if (profile && profile !== "undefined") {
        return JSON.parse(profile).user;
      }
    } catch (error) {
      console.error("Error parsing stored profile:", error);
    }
    return null;
  })(),
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  user: (() => {
    try {
      const profile = localStorage.getItem("profile");
      if (profile && profile !== "undefined") {
        return JSON.parse(profile).user;
      }
    } catch (error) {
      console.error("Error parsing stored profile:", error);
    }
    return null;
  })(),
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("profile");

  dispatch(authSlice.actions.logout());
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.user = action.payload.user;

      const authData = {
        token: action.payload.token,
        role: action.payload.role,
        user: action.payload.user,
      };

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("profile", JSON.stringify(authData));
    },
    logout(state) {
      state.token = null;
      state.role = null;
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("profile");
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    loadUserFromStorage(state) {
      try {
        const storedAuth = localStorage.getItem("profile");
        if (storedAuth && storedAuth !== "undefined") {
          const { role, token, user } = JSON.parse(storedAuth);
          state.role = role;
          state.token = token;
          state.user = user;
        }
      } catch (error) {
        console.error("Error parsing stored auth:", error);
      }
    },
  },
});

export const { login, logout, setToken, setRole, loadUserFromStorage } =
  authSlice.actions;
export default authSlice.reducer;
