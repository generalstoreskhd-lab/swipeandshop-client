import authReducer, {
  login,
  logout,
  skipAuth,
  updateProfile,
  setAuthUser,
} from "../../src/store/slices/authSlice";

describe("client authSlice", () => {
  it("returns initial state", () => {
    const state = authReducer(undefined, { type: "unknown" });

    expect(state).toEqual({
      isLoggedIn: false,
      isGuest: false,
      user: null,
    });
  });

  it("handles login and resets guest mode", () => {
    const state = authReducer(
      { isLoggedIn: false, isGuest: true, user: null },
      login({ name: "Client One", email: "client@demo.com", role: "client" })
    );

    expect(state).toEqual({
      isLoggedIn: true,
      isGuest: false,
      user: { name: "Client One", email: "client@demo.com", role: "client" },
    });
  });

  it("handles skipAuth", () => {
    const state = authReducer(undefined, skipAuth());

    expect(state).toEqual({
      isLoggedIn: false,
      isGuest: true,
      user: null,
    });
  });

  it("updates user profile when logged in", () => {
    const loggedIn = authReducer(
      undefined,
      login({ name: "Client One", email: "client@demo.com", role: "client" })
    );
    const updated = authReducer(loggedIn, updateProfile({ name: "Updated Name" }));

    expect(updated.user).toEqual({
      name: "Updated Name",
      email: "client@demo.com",
      role: "client",
    });
  });

  it("syncs auth state from listener payload and logs out on null", () => {
    const withUser = authReducer(
      undefined,
      setAuthUser({ name: "Listener User", email: "listener@demo.com", role: "client" })
    );
    const cleared = authReducer(withUser, setAuthUser(null));

    expect(withUser.isLoggedIn).toBe(true);
    expect(withUser.isGuest).toBe(false);
    expect(cleared).toEqual({
      isLoggedIn: false,
      isGuest: false,
      user: null,
    });
  });

  it("handles logout", () => {
    const loggedIn = authReducer(
      undefined,
      login({ name: "Client One", email: "client@demo.com", role: "client" })
    );
    const state = authReducer(loggedIn, logout());

    expect(state).toEqual({
      isLoggedIn: false,
      isGuest: false,
      user: null,
    });
  });
});
