export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'Password is wrong';
export const USER_SUBSCRIBE_EXIST = 'You have already subscribed to this user';

export const AuthenticationResponseMessage = {
  LoggedSuccess: 'User has been successfully logged.',
  LoggedError: 'Password or Login is wrong.',
  PasswordChangeSuccess: 'Password has been successfully changed.',
  PasswordChangeError: 'Password or Login is wrong.',
  UserFound: 'User found',
  UserNotFound: 'User not found',
  UserExist: 'User with the email already exists',
  UserCreated: 'The new user has been successfully created.',
} as const;

export const AuthenticationValidateMessage = {
  EmailNotValid: 'The email is not valid',
} as const;
export const AVATAR_FILE = 'avatarFile';
export const MIME_TYPES = ['image/jpg', 'image/jpeg', 'image/png']
export const MAX_FILE_SIZE = 500*1024;
