import WalletLoginButton from "@/components/custom/common/WalletLoginButton";

import React from "react";

function page() {
  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover flex flex-col-reverse  "
      style={{ backgroundImage: "url('/images/login-bg.svg')" }}
    >
      <WalletLoginButton  />
      <div className="container mx-auto text-white p-8">
        <h1 className="text-4xl font-bold mb-4">
          Welcome <br /> to DequiziFi
        </h1>
        <p className="font-semibold  mb-8">
          Unlock Defi knowledge through fun, fast-
          <br />
          paced Quizzes
        </p>
      </div>
    </div>
  );
}

export default page;
