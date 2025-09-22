import { LoginWithWalletButton } from "@/components/common/Buttons/LoginWithWalletButton";

export function LoginPageContainer() {
  return (
    <div className="min-h-screen bg-[url('/images/login-bg.svg')] bg-cover bg-center flex flex-col justify-end">
      <div className="p-6 pb-12">
        <div className="text-left mb-8">
          <h1 className="text-3xl font-bold text-primary-foreground mb-1">
            Welcome
          </h1>
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            to DeQuiziFi
          </h2>
          <p className="text-primary-foreground text-base leading-relaxed">
            Unlock DeFi Knowledge Through Fun, Fast-Paced Quizzes
          </p>
        </div>

        <LoginWithWalletButton />
      </div>
    </div>
  );
}
