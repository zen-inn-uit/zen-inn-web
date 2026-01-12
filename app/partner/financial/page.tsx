import { financialApi } from './api/financial.api';
import { FinancialStats } from './components/financial-stats';
import { EarningsChart } from './components/earnings-chart';
import { ExpenseBreakdown } from './components/expense-breakdown';
import { TransactionsTable } from './components/transactions-table';
import { PageContainer } from '@/components/ui/page-container';

export default async function FinancialPage() {
  const stats = await financialApi.getStats();
  const earningsData = await financialApi.getEarningsData();
  const expenseBreakdown = await financialApi.getExpenseBreakdown();
  const transactions = await financialApi.getTransactions();

  return (
    <PageContainer className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#3d2e1f]">Expense</h1>
      </div>

      <FinancialStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <EarningsChart data={earningsData} />
        </div>
        <div className="lg:col-span-1">
          <ExpenseBreakdown data={expenseBreakdown} />
        </div>
      </div>

      <TransactionsTable initialData={transactions.data} total={transactions.total} />
    </PageContainer>
  );
}
