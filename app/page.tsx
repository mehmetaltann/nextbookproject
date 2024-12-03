import BookLibrary from "@/features/Home/BookLibrary";
import { PageWrapper } from "@/components/Wrappers";
import { Loader } from "../components/Loader";
import { fetchBookClassy, fetchBooks } from "./actions/action";
import { Book, BookClassy } from "@/lib/types/types";

export default async function Home() {
  const books = (await fetchBooks()) as Book[];
  const bookClassies = (await fetchBookClassy()) as BookClassy[];

  return (
    <>
      {books && bookClassies ? (
        <PageWrapper>
          <BookLibrary books={books} bookClassies={bookClassies} />
        </PageWrapper>
      ) : (
        <Loader />
      )}
    </>
  );
}
