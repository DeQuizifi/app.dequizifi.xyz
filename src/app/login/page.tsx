"use client";
import dynamic from "next/dynamic";

const WalletLoginButton = dynamic(
  () => import("@/components/custom/common/WalletLoginButton"),
  { ssr: false }
);

const FarcasterSignInButton = dynamic(
  () => import("@/components/custom/common/FarcasterSignInButton"),
  { ssr: false }
);

function page() {
  return (
    <div
      className="h-screen bg-no-repeat bg-cover flex flex-col "
      style={{ backgroundImage: "url('/images/login-bg.svg')" }}
    >
      <div className="container mx-auto my-80 text-white p-8">
        <div className="transform translate-y-32">
          <h1 className="text-4xl font-bold mb-4">
            Welcome <br /> to DeQuiziFi
          </h1>
          <p className=" mb-8">
            Unlock Defi Knowledge Through Fun, Fast-
            <br />
            Paced Quizzes
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
          <WalletLoginButton />
          <div className="flex justify-center">
            <FarcasterSignInButton nonce="sample-nonce-value" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
