export function notBlank(input) {
  return input.trim() !== "";
}

export function validEmail(email) {
  let result = email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  return result !== null;
}

export function passwordsMatch(pass1, pass2) {
  return pass1 === pass2;
}
