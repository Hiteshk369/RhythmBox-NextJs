import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

// export interface Song {
//   id?: string;
//   userId?: string;
//   title?: string;
//   artist?: string;
//   imagePath?: string;
//   songPath?: string;
// }
