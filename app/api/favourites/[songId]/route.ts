import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismaDb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  songId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    NextResponse.error();
  }

  const { songId } = params;

  if (!songId || typeof songId !== "string") {
    throw new Error("Invalid ID");
  }

  let favouriteIds = [...(currentUser?.favouriteIds || [])];

  favouriteIds.push(songId);

  const user = await prisma.user.update({
    where: {
      id: currentUser?.id,
    },
    data: {
      favouriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    NextResponse.error();
  }

  const { songId } = params;

  if (!songId || typeof songId !== "string") {
    throw new Error("Invalid ID");
  }

  let favouriteIds = [...(currentUser?.favouriteIds || [])];

  favouriteIds = favouriteIds.filter((id) => id !== songId);

  const user = await prisma.user.update({
    where: {
      id: currentUser?.id,
    },
    data: {
      favouriteIds,
    },
  });

  return NextResponse.json(user);
}
