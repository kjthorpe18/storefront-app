export function userLoggedIn() {
  const loggedInUser = localStorage.getItem("user");
  console.log(loggedInUser);
  return loggedInUser ? true : false;
}
