export function PageHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <header className="mb-4 flex items-center justify-between text-2xl">
      {children}
    </header>
  );
}
