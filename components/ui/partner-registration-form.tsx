'use client';

import React, { useState, useEffect  } from 'react';
import { partnerAPI } from '@/lib/api/partner-api';
import { UpsertPartnerDto } from '@/app/partner/profile/dto/partner.dto';
import { Camera, Check, ChevronRight, Upload, Clock } from 'lucide-react';
import { StatusDialog } from './status-dialog';
import { useRouter } from 'next/navigation';

interface PartnerRegistrationFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

type Step = 1 | 2;

export const PartnerRegistrationForm = ({ onSuccess, onCancel }: PartnerRegistrationFormProps) => {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [initializing, setInitializing] = useState(true);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [partnerStatus, setPartnerStatus] = useState<'NONE' | 'PENDING' | 'APPROVED' | 'REJECTED'>('NONE');
  
  const [formData, setFormData] = useState<UpsertPartnerDto>({
    company: '',
  });
  const [kycData, setKycData] = useState({
    kind: 'Business License',
    file: null as File | null,
    preview: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Kiểm tra trạng thái Partner khi mount
  useEffect(() => {
    const checkPartnerStatus = async () => {
      try {
        const partner = await partnerAPI.getPartnerProfile();
        if (partner) {
          setPartnerStatus(partner.kycStatus as any);
          if (partner.company) {
            setFormData({ company: partner.company });
          }
          
          // Nếu đã có profile nhưng chưa có KYC docs hoặc bị REJECTED thì mới cho làm tiếp các bước
          if (partner.kycStatus === 'PENDING' || partner.kycStatus === 'APPROVED') {
            // Sẽ hiển thị màn hình status tương ứng ở dưới
          } else {
            setStep(2);
          }
        }
      } catch (err: any) {
        // 404 nghĩa là chưa có profile, giữ nguyên bước 1
        console.log('No partner profile found, starting at step 1');
      } finally {
        setInitializing(false);
      }
    };

    checkPartnerStatus();
  }, []);

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await partnerAPI.upsertPartnerProfile(formData);
      setStep(2);
    } catch (err: any) {
      console.error('Failed to register partner profile:', err);
      setError(err.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setKycData({
          ...kycData,
          file,
          preview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kycData.preview) {
      setError('Vui lòng tải lên giấy phép kinh doanh');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Upload ảnh lên Cloudinary qua backend
      const { url } = await partnerAPI.uploadBase64Image(kycData.preview, 'kyc_docs');
      
      // 2. Lưu thông tin KYC document
      await partnerAPI.uploadKycDocument({
        kind: kycData.kind,
        url: url,
      });

      setShowSuccessDialog(true);
    } catch (err: any) {
      console.error('Failed to upload KYC:', err);
      setError(err.message || 'Lỗi tải lên giấy tờ. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessConfirm = () => {
    setShowSuccessDialog(false);
    onSuccess();
    router.push('/partner/dashboard');
  };

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)',
        }}
        onClick={onCancel}
      >
        <div 
          style={{
            padding: '32px',
            background: '#FFFFFF',
            borderRadius: '24px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
            width: '100%',
            maxWidth: '440px',
            position: 'relative',
            border: '1px solid #EBEBEB',
            animation: 'modalAppear 0.3s ease-out',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onCancel}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              border: 'none',
              background: 'transparent',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '4px',
              color: '#717171',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>

          {initializing ? (
          <div style={{ 
            height: '300px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '16px'
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              border: '3px solid #f3f3f3', 
              borderTop: '3px solid #6B5B3D', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite' 
            }} />
            <p style={{ color: '#717171', fontSize: '14px' }}>Đang kiểm tra hồ sơ...</p>
          </div>
        ) : partnerStatus === 'PENDING' ? (
          <div style={{ padding: '40px 0', textAlign: 'center' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              background: '#FFFBEB', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 24px' 
            }}>
              <Clock size={40} color="#F59E0B" style={{ opacity: 0.8 }} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px', color: '#222222' }}>Hồ sơ đang chờ duyệt</h3>
            <p style={{ fontSize: '15px', color: '#717171', lineHeight: '1.6', marginBottom: '32px' }}>
              Bạn đã nộp đơn đăng ký thành công. Đội ngũ Zen Inn đang trong quá trình xác minh hồ sơ của bạn. Quá trình này thường mất từ 24h - 48h.
            </p>
            <button
              onClick={onCancel}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                border: 'none',
                background: '#6B5B3D',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Đã hiểu
            </button>
          </div>
        ) : partnerStatus === 'APPROVED' ? (
          <div style={{ padding: '40px 0', textAlign: 'center' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              background: '#F0FDF4', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 24px' 
            }}>
              <Check size={40} color="#22C55E" />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px', color: '#222222' }}>Bạn đã là đối tác!</h3>
            <p style={{ fontSize: '15px', color: '#717171', lineHeight: '1.6', marginBottom: '32px' }}>
              Chúc mừng! Hồ sơ của bạn đã được phê duyệt. Bạn có thể bắt đầu quản lý khách sạn của mình ngay bây giờ.
            </p>
            <button
              onClick={handleSuccessConfirm}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                border: 'none',
                background: '#6B5B3D',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Đi tới Dashboard
            </button>
          </div>
        ) : (
          <>
            {/* Step Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', marginTop: '48px' }}>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                background: step >= 1 ? '#6B5B3D' : '#EBEBEB',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {step > 1 ? <Check size={14} /> : 1}
              </div>
              <div style={{ flex: 1, height: '2px', background: step >= 2 ? '#6B5B3D' : '#EBEBEB' }} />
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                background: step === 2 ? '#6B5B3D' : '#EBEBEB',
                color: step === 2 ? 'white' : '#717171',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '600'
              }}>2</div>
            </div>

            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#222222' }}>
              {step === 1 ? 'Thông tin đối tác' : 'Giấy phép kinh doanh'}
            </h3>
            <p style={{ fontSize: '14px', color: '#717171', marginBottom: '24px' }}>
              {step === 1 
                ? 'Bắt đầu hành trình kinh doanh của bạn tại Zen Inn.' 
                : 'Vui lòng cung cấp giấy phép kinh doanh để xác thực doanh nghiệp.'}
            </p>
            
            {step === 1 ? (
              <form onSubmit={handleStep1Submit}>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#222222', marginBottom: '8px', textTransform: 'uppercase' }}>
                    Tên công ty / Thương hiệu *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Ví dụ: Zen Inn Boutique"
                    style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #DDDDDD', fontSize: '16px', outline: 'none' }}
                  />
                </div>

                {error && <div style={{ color: '#FF385C', fontSize: '14px', marginBottom: '20px', background: '#FFF8F6', padding: '12px', borderRadius: '8px', border: '1px solid #FFD1C1' }}>{error}</div>}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    border: 'none',
                    background: '#6B5B3D',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {loading ? 'Đang xử lý...' : <>Tiếp tục <ChevronRight size={18} /></>}
                </button>
              </form>
            ) : (
              <form onSubmit={handleStep2Submit}>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#222222', marginBottom: '8px', textTransform: 'uppercase' }}>
                    Ảnh chụp Giấy phép kinh doanh *
                  </label>
                  <div 
                    onClick={() => document.getElementById('kyc-upload')?.click()}
                    style={{
                      width: '100%',
                      height: '200px',
                      border: '2px dashed #DDDDDD',
                      borderRadius: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      background: '#F7F7F7',
                      position: 'relative',
                      transition: 'border-color 0.2s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#6B5B3D')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#DDDDDD')}
                  >
                    {kycData.preview ? (
                      <>
                        <img src={kycData.preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'white', padding: '8px', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                          <Camera size={18} color="#6B5B3D" />
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload size={32} color="#717171" style={{ marginBottom: '12px' }} />
                        <span style={{ fontSize: '14px', color: '#717171' }}>Tải ảnh giấy phép kinh doanh lên</span>
                      </>
                    )}
                  </div>
                  <input 
                    id="kyc-upload"
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    style={{ display: 'none' }} 
                  />
                </div>

                {error && <div style={{ color: '#FF385C', fontSize: '14px', marginBottom: '20px', background: '#FFF8F6', padding: '12px', borderRadius: '8px', border: '1px solid #FFD1C1' }}>{error}</div>}

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid #DDDDDD', background: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}
                  >
                    Quay lại
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{ flex: 2, padding: '16px', borderRadius: '12px', border: 'none', background: '#6B5B3D', color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}
                  >
                    {loading ? 'Đang tải lên...' : 'Hoàn tất đăng ký'}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
        </div>

        <style jsx>{`
          @keyframes modalAppear {
            from { opacity: 0; transform: scale(0.95) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>

      <StatusDialog 
        isOpen={showSuccessDialog}
        type="success"
        title="Đăng ký thành công!"
        message="Hồ sơ đối tác đã được gửi. Vui lòng chờ quản trị viên duyệt trong vòng 24h."
        confirmText="Đi tới Dashboard"
        onConfirm={handleSuccessConfirm}
      />
    </>
  );
};
