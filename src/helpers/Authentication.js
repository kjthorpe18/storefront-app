export function userLoggedIn() {
  const loggedInUser = localStorage.getItem("email");
  return loggedInUser ? true : false;
}

export function logOutUser() {
  localStorage.clear();
}
