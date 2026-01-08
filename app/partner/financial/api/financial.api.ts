import type { 
  FinancialStatsDTO, 
  ExpenseBreakdownDTO, 
  TransactionDTO, 
  EarningDataDTO 
} from '../dto/financial.dto';
import axiosInstance from '../../../../lib/api/axios';

export const financialApi = {
  getStats: async (): Promise<FinancialStatsDTO> => {
    // Currently mocked, but can use axiosInstance when ready
    return {
      totalBalance: 15650,
      totalIncome: 45650,
      totalExpenses: 30000,
      balanceChange: 3.56,
      incomeChange: -1.5,
      expenseChange: 4.79
    };
  },

  getExpenseBreakdown: async (): Promise<ExpenseBreakdownDTO[]> => {
    return [
      { category: 'Salaries and Wages', percentage: 50, amount: 15000, color: '#14B8A6' },
      { category: 'Utilities', percentage: 16.67, amount: 5000, color: '#A3E635' },
      { category: 'Maintenance', percentage: 13.33, amount: 4000, color: '#C9A882' },
      { category: 'Supplies', percentage: 10, amount: 3000, color: '#FDE68A' },
      { category: 'Marketing', percentage: 6.67, amount: 2000, color: '#94A3B8' },
      { category: 'Miscellaneous', percentage: 3.33, amount: 1000, color: '#E2E8F0' },
    ];
  },

  getTransactions: async (page = 1, limit = 10): Promise<{ data: TransactionDTO[], total: number }> => {
    const data: TransactionDTO[] = [
      { id: '1', expense: 'Staff Salary - June', category: 'Salaries', quantity: 12, amount: 15000, date: '2024-06-30', status: 'Completed' },
      { id: '2', expense: 'Electricity Bill', category: 'Utilities', quantity: 1, amount: 2500, date: '2024-06-25', status: 'Completed' },
      { id: '3', expense: 'Water Bill', category: 'Utilities', quantity: 1, amount: 800, date: '2024-06-25', status: 'Completed' },
      { id: '4', expense: 'Room Cleaning Supplies', category: 'Supplies', quantity: 50, amount: 1200, date: '2024-06-20', status: 'Completed' },
      { id: '5', expense: 'New Bed Linens', category: 'Supplies', quantity: 20, amount: 1800, date: '2024-06-15', status: 'Completed' },
    ];
    return { data, total: 535 };
  },

  getEarningsData: async (): Promise<EarningDataDTO[]> => {
    return [
      { month: 'Jan', income: 4500, expense: 3000 },
      { month: 'Feb', income: 5200, expense: 3200 },
      { month: 'Mar', income: 4800, expense: 3100 },
      { month: 'Apr', income: 6100, expense: 3500 },
      { month: 'May', income: 5900, expense: 3400 },
      { month: 'Jun', income: 7200, expense: 4000 },
    ];
  }
};
