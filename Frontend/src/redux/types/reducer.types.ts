import { User } from "@/types/types";

export interface userReducerInitialState {
  user: User | null;
  isLoggedIn: boolean;
  token: string | null;
}
