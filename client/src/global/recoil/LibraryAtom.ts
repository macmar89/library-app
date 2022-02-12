import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import {LibraryType} from "../types/LibraryTypes";

const { persistAtom } = recoilPersist();


export const LibraryAtom = atom({
  key: "LibraryAtom",
  default: null as null | LibraryType,
  effects_UNSTABLE: [persistAtom],
});
