"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { FormField, inputClass, textareaClass } from "@/components/shared/FormField";
import { Spinner } from "@/components/shared/Spinner";
import { useAuth } from "@/hooks/use-auth";
import { apiFetch } from "@/lib/api";
import { CATEGORIES } from "@/lib/constants";
import { uploadToImgbb } from "@/lib/imgbb";

export function AddBookForm() {
  const { user, isPending: sessionPending } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [pending, setPending] = useState(false);

  // Preview of the chosen image. It is freed when the image changes.
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files?.[0] ?? null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!file) {
      toast.error("Please choose a cover image for the book.");
      return;
    }

    setPending(true);
    try {
      const image = await uploadToImgbb(file);
      await apiFetch<{ message: string }>("/books", {
        method: "POST",
        auth: true,
        body: {
          title: String(data.get("title") ?? "").trim(),
          author: String(data.get("author") ?? "").trim(),
          category: data.get("category"),
          image,
          description: String(data.get("description") ?? "").trim(),
          totalCopies: Number(data.get("totalCopies")),
        },
      });
      toast.success("Book added successfully!");
      form.reset();
      setFile(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not add the book. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (sessionPending) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={pending} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="title" label="Book Title">
            <input id="title" name="title" type="text" required maxLength={150} placeholder="The title of the book" className={inputClass} />
          </FormField>
          <FormField id="author" label="Author Name">
            <input id="author" name="author" type="text" required maxLength={100} placeholder="Who wrote it" className={inputClass} />
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="category" label="Category">
            <select id="category" name="category" required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Select a category
              </option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </FormField>
          <FormField id="totalCopies" label="Total Copies">
            <input id="totalCopies" name="totalCopies" type="number" required min={1} max={1000} step={1} defaultValue={1} className={inputClass} />
          </FormField>
        </div>

        <FormField id="image" label="Book Image">
          <div className="flex items-center gap-4">
            <div className="relative flex h-28 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-muted text-muted-foreground">
              {preview ? (
                <Image src={preview} alt="Selected book cover" fill unoptimized className="object-cover" />
              ) : (
                <ImagePlus className="size-6" aria-hidden="true" />
              )}
            </div>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-muted-foreground file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium file:text-foreground hover:file:bg-secondary/70"
            />
          </div>
        </FormField>

        <FormField id="description" label="Short Description">
          <textarea id="description" name="description" required maxLength={1000} rows={4} placeholder="What is the book about?" className={textareaClass} />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="userName" label="Your Name">
            <input id="userName" type="text" readOnly value={user?.name ?? ""} className={`${inputClass} bg-muted text-muted-foreground`} />
          </FormField>
          <FormField id="userEmail" label="Your Email">
            <input id="userEmail" type="email" readOnly value={user?.email ?? ""} className={`${inputClass} bg-muted text-muted-foreground`} />
          </FormField>
        </div>

        <button type="submit" className="btn-primary w-full">
          {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {pending ? "Adding book..." : "Add Book"}
        </button>
      </fieldset>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Want to see all books?{" "}
        <Link href="/books" className="font-semibold text-primary hover:underline">
          Browse the library
        </Link>
      </p>
    </form>
  );
}
