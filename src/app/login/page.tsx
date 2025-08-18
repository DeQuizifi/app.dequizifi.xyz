import WalletLoginButton from "@/components/custom/common/WalletLoginButton";

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
        <WalletLoginButton />
      </div>
    </div>
  );
}

export default page;
