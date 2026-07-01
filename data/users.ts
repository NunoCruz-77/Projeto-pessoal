export type Credentials = {
  standardUser: string;
  lockedOutUser: string;
  password: string;
};

export const USERS: Credentials = {
  standardUser: 'standard_user',
  lockedOutUser: 'locked_out_user',
  password: 'secret_sauce',
};
