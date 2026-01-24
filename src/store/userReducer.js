export const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
  isError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true, isError: false };
    case "LOG_IN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload, isLoading: false };
    case "LOG_OUT":
      localStorage.removeItem("user");
      return { ...state, user: null, isLoading: false };
    case "ERROR":
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export default reducer;