import BookLibrary from "@/features/BookLibrary";
import { PageWrapper } from "@/components/Layouts/Wrappers";
import { Loader } from "../components/Layouts/Loader";
import { fetchBooks } from "./actions/action";
import { Book } from "@/lib/types/types";

export default async function Home() {
  const books = (await fetchBooks()) as Book[];

  return (
    <>
      {books ? (
        <PageWrapper>
          <BookLibrary books={books} />
        </PageWrapper>
      ) : (
        <Loader />
      )}
    </>
  );
}
