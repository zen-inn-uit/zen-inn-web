import {RegisterForm} from '@/app/(auth)/register/components/register-form';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-5/12 flex items-center justify-center bg-white p-8">
        <RegisterForm />
      </div>

      <div className="hidden lg:block lg:w-7/12 relative">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80"
          alt="Hotel Lobby"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
        
        <div className="relative h-full flex flex-col justify-center px-16 text-white">
          <div className="max-w-xl">
            <h2 className="text-5xl font-bold mb-6 text-white">
              Tham gia cùng
              <br />
              hàng nghìn khách sạn
            </h2>
            <p className="text-lg text-white mb-8 leading-relaxed">
              Zen Inn giúp bạn tối ưu hóa vận hành, tăng doanh thu và mang đến trải nghiệm tốt nhất cho khách hàng.
            </p>
            
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div>
                <div className="text-4xl font-bold text-white mb-1">1,200+</div>
                <div className="text-sm text-white/80">Khách sạn</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-1">50K+</div>
                <div className="text-sm text-white/80">Đặt phòng/tháng</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-1">98%</div>
                <div className="text-sm text-white/80">Hài lòng</div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-white">Thiết lập nhanh chóng trong 5 phút</p>
              <p className="text-white">Không cần kinh nghiệm công nghệ</p>
              <p className="text-white">Bảo mật dữ liệu tuyệt đối</p>
              <p className="text-white">Hỗ trợ 24/7 bằng tiếng Việt</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}