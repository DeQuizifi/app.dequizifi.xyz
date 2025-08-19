import WalletLoginButton from "@/components/custom/common/WalletLoginButton";

function page() {
  return (
    <div
      className="h-screen bg-no-repeat bg-cover flex flex-col "
      style={{ backgroundImage: "url('/images/login-bg.svg')" }}
    >
      <div className="container mx-auto my-80 text-white p-8">
        <h1 className="text-4xl font-bold mb-4">
          Welcome <br /> to DequiziFi
        </h1>
        <p className="font-semibold mb-8">
          Unlock Defi knowledge through fun, fast-
          <br />
          paced Quizzes
        </p>
        <WalletLoginButton />
      </div>
    </div>
  );
}

export default page;
