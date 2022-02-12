import React from "react";
import { useRecoilValue } from "recoil";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import { LastFiveBookList } from "../../layout/Book/LastFiveBookList";
import { LastUserList } from "../../layout/User/LastUserList";

const LibraryDashboard = () => {
  const library = useRecoilValue(LibraryAtom);

  return (
    <div>
      <section className="flex my-5 gap-x-10">
        <LastFiveBookList
          title="Najnovšie pridané knihy"
          books={library?.newestBooks}
          slug={library?.library?.slug}
          emptyLabel="Ešte neboli pridané žiadne knihy"
          url={`/kniznica/${library?.library?.slug}/knihy`}
        />

        <LastUserList
          title="Najnovšie pridaný užívatelia"
          users={library?.newestUsers}
          slug={library?.library?.slug}
          emptyLabel="Ešte neboli pridaní žiadny"
          url={`/kniznica/${library?.library?.slug}/uzivatelia`}
        />
      </section>
    </div>
  );
};

export default LibraryDashboard;
