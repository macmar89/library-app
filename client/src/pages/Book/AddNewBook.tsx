import { BookCreateUpdateForm } from "./BookCreateUpdateForm";


const AddNewBook = () => {

  return (
    <div className="container">
      <BookCreateUpdateForm
        title="Pridaj knihu"
        toastMessage="Kniha bola pridaná do knižnice"
      />
    </div>
  );
};

export default AddNewBook;
