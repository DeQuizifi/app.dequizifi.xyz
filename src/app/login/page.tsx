import React from "react";

function page() {
  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover  flex flex-col-reverse items-center bg-purple-500 "
      style={{ backgroundImage: "url('/images/login-bg.svg')" }}
    >
      <div className="min-h-screen bg-no-repeat bg-cover  flex flex-col-reverse items-center bg-purple-500 ">
        <div className="bg-white bg-opacity-80 p-8 rounded shadow-md  mb-14">
          Login page
        </div>
      </div>
    </div>
  );
}

export default page;
