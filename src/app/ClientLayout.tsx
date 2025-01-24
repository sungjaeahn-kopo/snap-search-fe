"use client";

import { Providers } from "./providers";
import Header from '@/components/common/Header';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Providers>
      <Header platformName="SNAP-SEARCH" />
      {children}
      </Providers>
    </>
  );
}