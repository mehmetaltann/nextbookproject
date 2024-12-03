import ParameterMain from "@/features/Parameters/ParameterMain";
import { PageWrapper } from "@/components/Wrappers";
import { BookClassy } from "@/lib/types/types";
import { fetchBookClassy } from "../actions/action";
import { Loader } from "@/components/Loader";

export default async function Home() {
  const bookClassies = (await fetchBookClassy()) as BookClassy[];

  return (
    <>
      {bookClassies ? (
        <PageWrapper>
          <ParameterMain bookClassies={bookClassies} />
        </PageWrapper>
      ) : (
        <Loader />
      )}
    </>
  );
}
