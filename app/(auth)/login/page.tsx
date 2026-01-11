import {LoginForm} from '@/app/(auth)/login/components/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-5/12 flex items-center justify-center bg-white p-8">
        <LoginForm />
      </div>

      <div className="hidden lg:block lg:w-7/12 relative">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80"
          alt="Hotel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
        
        <div className="relative h-full flex flex-col justify-center px-16 text-white">
          <div className="max-w-xl">
            <h2 className="text-5xl font-bold mb-6 text-white">
              Quản lý khách sạn
              <br />
              dễ dàng hơn bao giờ hết
            </h2>
            <p className="text-lg text-white mb-8 leading-relaxed">
              Hệ thống quản lý toàn diện cho khách sạn của bạn. Từ đặt phòng, quản lý phòng đến báo cáo doanh thu - tất cả trong một nền tảng.
            </p>
            
            <div className="space-y-4">
              <p className="text-white">Dashboard trực quan và dễ sử dụng</p>
              <p className="text-white">Quản lý phòng và giá linh hoạt</p>
              <p className="text-white">Theo dõi doanh thu real-time</p>
              <p className="text-white">Truy cập mọi lúc, mọi nơi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}