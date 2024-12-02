import { PageWrapper } from "@/components/Layouts/Wrappers";
import BookLibrary from "@/features/Auth/Home/BookLibrary";

export default function Home() {
  return (
    <>
      <PageWrapper>
        <BookLibrary />
      </PageWrapper>
    </>
  );
}
