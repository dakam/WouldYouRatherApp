import { LOGIN_AUTHED_USER, LOGOUT_AUTHED_USER } from "../actions/authedUser";

export default function authedUser(state = null, action) {
  switch (action.type) {
    case LOGOUT_AUTHED_USER:
      return null;

    case LOGIN_AUTHED_USER:
      return action.id;
    default:
      return state;
  }
}
