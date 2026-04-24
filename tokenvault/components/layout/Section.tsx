export const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`py-20 px-6 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);
