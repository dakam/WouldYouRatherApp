export const LOGOUT_AUTHED_USER = "LOGOUT_AUTHED_USER";
export const LOGIN_AUTHED_USER = "LOGIN_AUTHED_USER";

export function setAuthedUser(id) {
  return {
    type: LOGIN_AUTHED_USER,
    id,
  };
}

export function unsetAuthedUser() {
  return {
    type: LOGOUT_AUTHED_USER,
  };
}
