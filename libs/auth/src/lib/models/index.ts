export interface Group {
  name: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  surname: string;
  superuser: boolean;
}

export interface LocalData {
  user: User;
  token: string;
}
