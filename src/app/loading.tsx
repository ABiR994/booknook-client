import { Spinner } from "@/components/shared/Spinner";

// Shown automatically while a page or its data is loading.
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Spinner label="Loading" />
    </div>
  );
}
