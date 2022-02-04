import React, {ChangeEvent, useState} from "react";

const AddNewBook = ({ open }: { open: boolean }) => {
  const [newBook, setNewBook] = useState({
    title: '',
    desc: '',
    yearOfRelease: ''
  })

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(Number(newBook.yearOfRelease))
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setNewBook({...newBook, [e.target.name] : e.target.value})
  }

  return (
    <div
      className={`absolute w-96 right-0 top-0 h-screen bg-gray-500 ${
        open ? "translate-x-0" : "translate-x-full"
      } transition`}
    >
      <h4 className="text-center py-5">Pridaj novú knižku</h4>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input type="text" name="title" onChange={handleChange} placeholder='Názov knihy'/>
        <textarea name="desc" id="" cols={50} rows={10} onChange={handleChange} placeholder='Pridajte popis knihy...' />
        <input type="text" name="yearOfRelease" onChange={handleChange} placeholder='Rok vydania...'/>
        <button>Pridaj</button>
      </form>
    </div>
  );
};

export default AddNewBook;
