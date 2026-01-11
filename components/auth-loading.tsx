export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center">
        <div className="inline-block">
          <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-slate-600 font-medium">Đang kiểm tra phiên đăng nhập...</p>
      </div>
    </div>
  );
}
