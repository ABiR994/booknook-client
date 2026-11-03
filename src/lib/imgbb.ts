const MAX_SIZE_MB = 5;

/** Uploads an image file to imgbb and returns the hosted image URL. Throws a readable Error. */
export async function uploadToImgbb(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey) throw new Error("Image upload is not set up yet. Add NEXT_PUBLIC_IMGBB_API_KEY to .env.local.");

  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");
  if (file.size > MAX_SIZE_MB * 1024 * 1024) throw new Error(`The image must be smaller than ${MAX_SIZE_MB} MB.`);

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });
  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.success) {
    throw new Error("Image upload failed. Please try another image.");
  }
  return result.data.display_url as string;
}
