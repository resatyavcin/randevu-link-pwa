"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppStore } from "@/store";

const LOGIN_PATH = "/login";
const ONBOARDING_PATH = "/onboarding";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const authToken = useAppStore((s) => s.authToken);
  const onboardingCompleted = useAppStore((s) => s.onboardingCompleted);

  useEffect(() => {
    if (authToken === null) {
      router.replace(LOGIN_PATH);
      return;
    }
    if (!onboardingCompleted) {
      router.replace(ONBOARDING_PATH);
    }
  }, [authToken, onboardingCompleted, router, pathname]);

  if (authToken === null || !onboardingCompleted) {
    return null;
  }

  return <>{children}</>;
}
