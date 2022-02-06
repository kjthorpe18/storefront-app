export function userLoggedIn() {
  const loggedInUser = localStorage.getItem("user");
  return loggedInUser ? true : false;
}
