"use client";

import { X } from "lucide-react";
import { Dialog } from "@base-ui/react/dialog";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  /** "lg" is wider, for forms. */
  size?: "md" | "lg";
  children: React.ReactNode;
};

/** Reusable modal (used for borrowing now, and for edit and delete later). */
export function Modal({ open, onOpenChange, title, description, size = "md", children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className={`fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] ${size === "lg" ? "max-w-2xl" : "max-w-md"} -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-xl outline-none transition-all data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 sm:p-8`}>
          <Dialog.Close
            aria-label="Close"
            className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-4" />
          </Dialog.Close>
          <Dialog.Title className="pr-8 font-heading text-2xl font-bold tracking-tight">{title}</Dialog.Title>
          {description && (
            <Dialog.Description className="mt-2 text-sm leading-6 text-muted-foreground">
              {description}
            </Dialog.Description>
          )}
          <div className="mt-6">{children}</div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
