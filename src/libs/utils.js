

export const firebaseAuthErrors = {

  default: "Something went wrong. Please try again.",
};

export function getFirebaseAuthError(code) {
  return firebaseAuthErrors[code] || firebaseAuthErrors.default;
}