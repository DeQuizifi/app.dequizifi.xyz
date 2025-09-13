import FarcasterSignInButton from "@/components/custom/common/FarcasterSignInButton";
import WalletLoginButton from "@/components/custom/common/WalletLoginButton";

function page() {
  return (
    <div className="h-screen bg-no-repeat bg-cover flex flex-col justify-end bg-[url('/images/login-bg.svg')]">
      <div className="container mx-auto text-foreground p-8 pb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Welcome <br /> to DeQuiziFi
          </h1>
          <p className="mb-6">
            Unlock Defi Knowledge Through Fun, Fast-
            <br />
            Paced Quizzes
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full">
            <WalletLoginButton />
          </div>
          <div className="w-full justify-center flex">
            <FarcasterSignInButton nonce="sample-nonce-value" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
