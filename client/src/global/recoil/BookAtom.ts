import {atom} from "recoil";
import {BookType} from "../types/BookType";

export const BookAtom = atom({
  key: "bookAtom",
  default: null as null | BookType
})
