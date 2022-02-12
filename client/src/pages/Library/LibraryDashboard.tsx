import React from "react";
import { useRecoilValue } from "recoil";
import { LibraryAtom } from "../../global/recoil/LibraryAtom";
import { LastFiveBookList } from "../../layout/Book/LastFiveBookList";
import { LastUserList } from "../../layout/User/LastUserList";

const LibraryDashboard = () => {
  const library = useRecoilValue(LibraryAtom);

  return (
    <div>
      <div className="py-10 grid grid-cols-2 gap-x-5">
        <div className='flex flex-col items-center'>
          <h1>Počet kníh v knižnici</h1>
          <div className='text-10xl'>{library?.totalBooks}</div>
        </div>
        <div className='flex flex-col items-center'>
          <h1>Počet študentov v knižnici</h1>
          <div className='text-10xl'>{library?.totalUsers}</div>
        </div>
      </div>
      <section className="grid grid-cols-2 gap-x-5 my-10">
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
