"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 p-8 text-center">
      <h1 className="font-heading text-lg font-bold">Something went wrong</h1>
      <p className="text-sm">{error.message || "Failed to load Pokémon data."}</p>
      <button onClick={reset} className="text-sm underline">
        Try again
      </button>
    </div>
  );
}
