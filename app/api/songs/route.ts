import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismaDb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();
  const { userId, title, artist, imagePath, songPath } = body;

  const song = await prisma.song.create({
    data: {
      userId,
      title,
      artist,
      imagePath,
      songPath,
    },
  });

  return NextResponse.json(song);
}
