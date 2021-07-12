import { unlink } from 'fs/promises';

export async function deleteFile(path: string): Promise<void> {
  try {
    await unlink(path);
  } catch (error) {
    console.error(error.message);
  }
}
