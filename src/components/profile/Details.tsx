import { getUser } from "@/lib/profile/user";
import React from "react";

interface DetailsProps {
  username: string;
  walletAddress?: string;
  joinedDate?: string;
  favQuizTopic?: string;
}

async function Details({
  username,
  walletAddress,
  joinedDate,
  favQuizTopic,
}: DetailsProps) {

  const user = await getUser();
  if(!user){
    return <div>User Not Found.</div>
  }
  return (
    <div className="bg-white rounded-t-3xl min-h-[60vh] p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Details</h2>
          <button className="text-blue-500">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Display Name</label>
            <div className="text-base font-medium text-gray-900">
              {username}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600">Wallet Address</label>
            <div className="text-base font-medium text-gray-900">
              {walletAddress}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600">Joined</label>
            <div className="text-base font-medium text-gray-900">
              {joinedDate}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600">Favorite Quiz Topic</label>
            <div className="text-base font-medium text-gray-900">
              {favQuizTopic}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
