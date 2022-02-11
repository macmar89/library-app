import { atom } from "recoil";
import {LibraryType} from "../types/LibraryTypes";
import {BookType} from "../types/BookType";

interface ILibrary {
  success?: true;
  library?: LibraryType;
  newestBooks?: BookType[];
  newestStudents?: any;
}

export const LibraryAtom = atom({
  key: "LibraryAtom",
  default: {} as any,
});
