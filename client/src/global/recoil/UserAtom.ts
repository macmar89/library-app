import { atom } from "recoil";
import { UserType } from "../types/UserType";

export const UserAtom = atom({
  key: "usetAtom",
  default: null as null | UserType,
});
