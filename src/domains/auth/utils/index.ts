export const isTokenValid = (token: string) => {
  try {
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    return Date.now() / 1000 < exp;
  } catch {
    return false;
  }
};
