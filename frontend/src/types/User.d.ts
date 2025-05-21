export interface User {
    id?: number;
    uid_firebase: string;
    usuario: string;
    rol?: 'admin' | 'user' | 'guest';
  }

export interface LoginFormData {
    email: string;
    password: string;
  }
  
export interface AuthResponse {
    token: string;
    user: User;
  }