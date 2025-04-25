export type SignUpRequestDataType = {
  memberName: string;
  email: string;
  password: string;
  phoneNumber: string;
  nickName: string;
  memberBirth: string;
  memberLevel: string;
  gender: 'M' | 'W';
};

export type SignUpFormState = {
  email: string;
  password: string;
  passwordConfirm: string;
  memberName: string;
  phoneNumber: string;
  nickName: string;
  memberBirth: string;
  gender: 'M' | 'W';
};

export type FormErrors = {
  [K in keyof SignUpFormState]?: string;
};

export interface CheckboxState {
  all: boolean;
  terms: boolean;
  privacy: boolean;
  card: boolean;
  marketing: boolean;
  [key: string]: boolean;
}
