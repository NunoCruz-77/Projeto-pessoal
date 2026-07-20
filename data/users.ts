export type Credentials = {
  standardUser: string;
  lockedOutUser: string;
  problemUser: string;
  performanceGlitchUser: string;
  errorUser: string;
  visualUser: string;
  password: string;
};

export const USERS: Credentials = {
  standardUser: 'standard_user',
  lockedOutUser: 'locked_out_user',
  problemUser: 'problem_user',
  performanceGlitchUser: 'performance_glitch_user',
  errorUser: 'error_user',
  visualUser: 'visual_user',
  password: 'secret_sauce',
};
