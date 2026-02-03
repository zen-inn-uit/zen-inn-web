import AdminSidebar from '@/components/admin/admin-sidebar';
import { ThemeProvider } from '@/contexts/theme-context';

export default function AdminLayout({
  children,
}: {
  children: React.Node;
}) {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 bg-[#FDFBF7]">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
