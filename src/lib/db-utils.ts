import prisma from '@/app/api/_db';

export async function emailExists(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return !!user;
}

export async function usernameExists(username: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  return !!user;
}
