"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { GoogleIcon } from "@/components/shared/SocialIcons";
import { authClient } from "@/lib/auth-client";

/** "or" divider and the Google button. `callbackURL` is where the user lands after Google login. */
export function SocialLogin({ callbackURL }: { callbackURL: string }) {
  const [pending, setPending] = useState(false);

  async function handleGoogle() {
    setPending(true);
    try {
      const { error } = await authClient.signIn.social({ provider: "google", callbackURL });
      if (error) {
        toast.error(error.message || "Google login is not available right now.");
        setPending(false);
      }
      // On success the browser is sent to Google, so the page unloads.
    } catch {
      toast.error("Could not reach the server. Check your connection and try again.");
      setPending(false);
    }
  }

  return (
    <div className="mt-6">
      <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>
      <button type="button" onClick={handleGoogle} disabled={pending} className="btn-outline mt-6 w-full">
        {pending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <GoogleIcon className="size-5" />}
        Continue with Google
      </button>
    </div>
  );
}
