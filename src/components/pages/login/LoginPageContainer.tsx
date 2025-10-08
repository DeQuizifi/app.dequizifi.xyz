import { LoginWithWalletButton } from "@/components/common/Buttons/LoginWithWalletButton";

export function LoginPageContainer() {
  return (
    <div className="min-h-screen bg-[url('/images/login-bg.svg')] bg-cover bg-center flex flex-col justify-between p-6">
      <div className="flex justify-center pt-12">
        <img src="/cube1.svg" alt="DeQuiziFi Logo" className="h-24 w-24" />
      </div>
      <div className="pb-12 text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold text-primary-foreground mb-2">
            Welcome
          </h1>
          <h2 className="text-5xl font-extrabold text-primary-foreground mb-4">
            to DeQuiziFi
          </h2>
          <p className="text-primary-foreground text-lg leading-relaxed max-w-md mx-auto">
            Unlock DeFi Knowledge Through Fun, Fast-Paced Quizzes
          </p>
        </div>

        <LoginWithWalletButton />
      </div>
    </div>
  );
}
