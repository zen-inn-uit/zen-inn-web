'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { loginSchema, type LoginFormData } from '../../schemas/auth.schema';
import { authAPI } from '@/lib/api/auth-api';

export function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await authAPI.login(data);
      
      localStorage.setItem('access_token', response.accessToken);
      localStorage.setItem('refresh_token', response.refreshToken);
      
      // Also set cookies for server-side access
      document.cookie = `access_token=${response.accessToken}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
      document.cookie = `refresh_token=${response.refreshToken}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
      
      if (response.user?.role === 'PARTNER') {
        router.push('/partner/dashboard');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-brand">Zen Inn</h2>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Chào mừng trở lại</h1>
        <p className="text-gray-600">Đăng nhập để quản lý khách sạn của bạn</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            {...register('email')}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.email
                ? 'border-red-300 focus:ring-red-200'
                : 'border-gray-300 focus:ring-brand/20 focus:border-brand'
            }`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-gray-700">
              Mật khẩu
            </label>
            <Link
              href="/reset-password"
              className="text-sm text-brand hover:text-primary transition-colors"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <input
            type="password"
            {...register('password')}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.password
                ? 'border-red-300 focus:ring-red-200'
                : 'border-gray-300 focus:ring-brand/20 focus:border-brand'
            }`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-brand text-white font-semibold rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Đang xử lý...
            </span>
          ) : (
            'Đăng nhập'
          )}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">hoặc tiếp tục với</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-sm font-medium text-gray-700">Google</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
        >
          <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span className="text-sm font-medium text-gray-700">Facebook</span>
        </button>
      </div>

      <p className="text-center text-gray-600 mt-8">
        Chưa có tài khoản?{' '}
        <Link
          href="/register"
          className="text-brand hover:text-primary font-semibold transition-colors"
        >
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
}
