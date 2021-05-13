import cookies from 'js-cookie';

export const getUserFromCookie = () => {
  const cookie = cookies.get('auth');
  if (!cookie) {
    return;
  }
  return JSON.parse(cookie);
};

export const setUserCookie = user => {
  cookies.set('auth', user, {
    expires: 1 / 24
  });
};

export const removeUserCookie = () => cookies.remove('auth');
