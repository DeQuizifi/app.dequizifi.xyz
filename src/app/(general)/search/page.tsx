import { GeneralLayout } from "@/components/layout/GeneralLayout";
import { SearchPageContainer } from "@/components/pages/search/SearchPageContainer";

export default function Home() {
  return (
    <GeneralLayout>
      <SearchPageContainer />
    </GeneralLayout>
  );
}
