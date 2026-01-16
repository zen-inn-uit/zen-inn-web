import axiosInstance from './axios';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password?: string;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface SetPasswordRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: string;
    status: string;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  role: string;
  status: string;
}

export const authAPI = {
  // Login with email and password
  login: (data: LoginRequest): Promise<AuthResponse> =>
    axiosInstance.post('/auth/login', data),

  // Register - Step 1: Send OTP to email
  register: (data: RegisterRequest): Promise<{ message: string }> =>
    axiosInstance.post('/auth/register', data),

  // Register - Step 2: Verify email with OTP
  verifyEmail: (data: VerifyEmailRequest): Promise<{ message: string }> =>
    axiosInstance.post('/auth/verify-email', data),

  // Register - Step 3: Set password and get tokens
  setPassword: (data: SetPasswordRequest): Promise<AuthResponse> =>
    axiosInstance.post('/auth/set-password', data),

  // Get current user profile
  getProfile: (): Promise<UserProfile> =>
    axiosInstance.get('/auth/profile'),

  // Logout
  logout: (): Promise<{ ok: boolean }> =>
    axiosInstance.post('/auth/logout'),
};
