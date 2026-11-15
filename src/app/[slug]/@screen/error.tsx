"use client";

import { useEffect } from "react";
import classNames from "classnames";

const headingStyles = classNames(
  "p-2 capitalize text-sm font-heading font-bold"
);

const containerStyles = classNames(
  "p-2 pr-1",
  "flex flex-1",
  "flex-col space-y-2"
);

export default function ScreenError({
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
    <>
      <h1 className={headingStyles}>Something went wrong</h1>
      <div className={containerStyles}>
        <p className="text-sm">{error.message || "Failed to load this page."}</p>
        <button
          onClick={reset}
          className="mt-2 text-sm underline text-left"
        >
          Try again
        </button>
      </div>
    </>
  );
}
