import Navbar from "@/components/ui/navbar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showSearch={false} />
      <main>{children}</main>
    </div>
  );
}
