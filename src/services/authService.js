// import api from "./api";

// export const registerUser = async (data) => {
//   const res = await api.post("/auth/register", data);
//   return res.data;
// };

// export const loginUser = async (data) => {
//   const res = await api.post("/auth/login", data);
//   return res.data;
// };




import api from "./api";

/* =========================
   REGISTER
========================= */
export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);

  // ✅ persist user + token if backend returns them
  if (res.data?.token) {
    localStorage.setItem("wellcare_token", res.data.token);
    localStorage.setItem(
      "wellcare_user",
      JSON.stringify(res.data.user)
    );
  }

  return res.data;
};

/* =========================
   LOGIN
========================= */
export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);

  // ✅ SAVE SESSION (CRITICAL FIX)
  if (res.data?.token) {
    localStorage.setItem("wellcare_token", res.data.token);
    localStorage.setItem(
      "wellcare_user",
      JSON.stringify(res.data.user)
    );
  }

  // ❌ DO NOT clear localStorage here
  // ❌ DO NOT touch wellcare_goal_done

  return res.data;
};

/* =========================
   LOGOUT
========================= */
export const logoutUser = () => {
  // ✅ remove only auth-related keys
  localStorage.removeItem("wellcare_token");
  localStorage.removeItem("wellcare_user");

  // ❌ DO NOT remove wellcare_goal_done
};
