export interface FinancialStatsDTO {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  balanceChange: number;
  incomeChange: number;
  expenseChange: number;
}

export interface ExpenseBreakdownDTO {
  category: string;
  percentage: number;
  amount: number;
  color: string;
}

export interface TransactionDTO {
  id: string;
  expense: string;
  category: string;
  quantity: number;
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface EarningDataDTO {
  month: string;
  income: number;
  expense: number;
}
