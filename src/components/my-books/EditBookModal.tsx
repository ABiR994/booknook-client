"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { FormField, inputClass, textareaClass } from "@/components/shared/FormField";
import { Modal } from "@/components/shared/Modal";
import { apiFetch } from "@/lib/api";
import { CATEGORIES } from "@/lib/constants";
import { uploadToImgbb } from "@/lib/imgbb";
import type { Book } from "@/types";

type EditBookModalProps = {
  book: Book;
  onClose: () => void;
  onSaved: (book: Book) => void;
};

/** Edit form with the old data already filled in. The cover is only uploaded again if a new one is chosen. */
export function EditBookModal({ book, onClose, onSaved }: EditBookModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [pending, setPending] = useState(false);

  const newPreview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => {
    return () => {
      if (newPreview) URL.revokeObjectURL(newPreview);
    };
  }, [newPreview]);

  const borrowed = book.totalCopies - book.availableCopies;
  const coverSrc = newPreview ?? book.image;

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files?.[0] ?? null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setPending(true);
    try {
      const image = file ? await uploadToImgbb(file) : book.image;
      const { book: updated } = await apiFetch<{ book: Book }>(`/books/${book._id}`, {
        method: "PATCH",
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
      toast.success("Book updated successfully!");
      onSaved(updated);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update the book. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Modal
      open
      onOpenChange={(open) => !open && !pending && onClose()}
      title="Edit book"
      description="Change any detail and save. The current information is already filled in."
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <fieldset disabled={pending} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField id="edit-title" label="Book Title">
              <input id="edit-title" name="title" type="text" required maxLength={150} defaultValue={book.title} className={inputClass} />
            </FormField>
            <FormField id="edit-author" label="Author Name">
              <input id="edit-author" name="author" type="text" required maxLength={100} defaultValue={book.author} className={inputClass} />
            </FormField>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField id="edit-category" label="Category">
              <select id="edit-category" name="category" required defaultValue={book.category} className={inputClass}>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField id="edit-copies" label="Total Copies">
              <input
                id="edit-copies"
                name="totalCopies"
                type="number"
                required
                min={Math.max(1, borrowed)}
                max={1000}
                step={1}
                defaultValue={book.totalCopies}
                className={inputClass}
              />
              {borrowed > 0 && (
                <p className="text-xs text-muted-foreground">{borrowed} copies are currently borrowed.</p>
              )}
            </FormField>
          </div>

          <FormField id="edit-image" label="Book Image">
            <div className="flex items-center gap-4">
              <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                <Image
                  src={coverSrc}
                  alt={`Cover of ${book.title}`}
                  fill
                  sizes="80px"
                  unoptimized={Boolean(newPreview) || coverSrc.includes("covers.openlibrary.org")}
                  className="object-cover"
                />
              </div>
              <div className="w-full space-y-1">
                <input
                  id="edit-image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-muted-foreground file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium file:text-foreground hover:file:bg-secondary/70"
                />
                <p className="text-xs text-muted-foreground">Leave empty to keep the current cover.</p>
              </div>
            </div>
          </FormField>

          <FormField id="edit-description" label="Short Description">
            <textarea id="edit-description" name="description" required maxLength={1000} rows={4} defaultValue={book.description} className={textareaClass} />
          </FormField>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              {pending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </fieldset>
      </form>
    </Modal>
  );
}
