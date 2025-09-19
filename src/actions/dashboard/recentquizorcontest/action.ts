"use server";

import { getRecentQuizOrContestLogic } from "./logic";

export async function getRecentQuizOrContest() {
  return await getRecentQuizOrContestLogic();
}
