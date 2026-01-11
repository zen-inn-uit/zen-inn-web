import { CancellationPolicyDTO } from '../dto/cancellation-policy.dto';

const mockPolicies: CancellationPolicyDTO[] = [
  {
    id: 'pol_1',
    name: 'Linh hoạt (Flexible)',
    description: 'Hủy miễn phí lên đến 24 giờ trước khi nhận phòng. Sau thời gian này, khách hàng sẽ bị tính phí 50% tổng tiền đặt phòng.',
    freeCancellationHours: 24,
    refundablePercent: 50,
    noShowRefundPercent: 0,
    modificationAllowed: true,
    modificationFeePercent: 0,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'pol_2',
    name: 'Tiêu chuẩn (Standard)',
    description: 'Hủy miễn phí tối đa 48 giờ trước khi nhận phòng. Hoàn tiền 30% nếu hủy sau thời gian quy định.',
    freeCancellationHours: 48,
    refundablePercent: 30,
    noShowRefundPercent: 0,
    modificationAllowed: true,
    modificationFeePercent: 5,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'pol_3',
    name: 'Không hoàn tiền (Non-refundable)',
    description: 'Khách hàng sẽ không được hoàn tiền nếu hủy phòng hoặc không đến nhận phòng.',
    freeCancellationHours: 0,
    refundablePercent: 0,
    noShowRefundPercent: 0,
    modificationAllowed: false,
    modificationFeePercent: 0,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const cancellationPoliciesApi = {
  getPolicies: async (): Promise<CancellationPolicyDTO[]> => {
    // In real app, this would be an API call
    return Promise.resolve(mockPolicies);
  },
  
  createPolicy: async (data: Partial<CancellationPolicyDTO>): Promise<CancellationPolicyDTO> => {
    const newPolicy: CancellationPolicyDTO = {
      id: `pol_${Math.random().toString(36).substr(2, 9)}`,
      name: data.name || '',
      description: data.description,
      freeCancellationHours: data.freeCancellationHours || 0,
      refundablePercent: data.refundablePercent || 0,
      noShowRefundPercent: data.noShowRefundPercent || 0,
      modificationAllowed: data.modificationAllowed ?? true,
      modificationFeePercent: data.modificationFeePercent || 0,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(newPolicy);
  }
};
