import { GeneralLayout } from "@/components/layout/GeneralLayout";

export default function GeneralPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <GeneralLayout>{children}</GeneralLayout>;
}
