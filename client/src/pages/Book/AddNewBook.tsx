import { BookCreateUpdateForm } from "./BookCreateUpdateForm";


const AddNewBook = () => {

  return (
    <div className="mt-10">
      <BookCreateUpdateForm
        title="Pridaj knihu"
        toastMessage="Kniha bola pridaná do knižnice"
      />
    </div>
  );
};

export default AddNewBook;
