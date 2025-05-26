"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/magicui/container";
import { BillingButton } from "@/components/BillingButton";

export default function InvoiceLookupPage() {
  const router = useRouter();

  // Redirect to home page after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Container className="py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#9E7AFF] to-[#FE8BBB]">
          Invoice Lookup
        </h1>

        <div className="bg-gray-900/50 p-8 rounded-xl border border-white/10">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-blue-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-white">
            Invoice Lookup Has Moved
          </h2>

          <p className="text-gray-300 mb-6">
            Our invoice lookup feature is now available directly from the header
            menu. Click the "Billing" button in the navigation bar to access it.
          </p>

          <div className="flex justify-center">
            <BillingButton initialTab="lookup" />
          </div>

          <p className="text-gray-400 text-sm mt-6">
            You will be redirected to the home page in a few seconds...
          </p>
        </div>
      </div>
    </Container>
  );
}
