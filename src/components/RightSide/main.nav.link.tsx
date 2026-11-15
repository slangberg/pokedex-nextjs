"use client";

import Link from "next/link";
import styles from "./button.nav.module.css";
import { ReactNode } from "react";
import { usePathname, useSearchParams, useParams } from "next/navigation";
import classnames from "classnames";
import { nanum } from "@/fonts";
interface LightProps {
  path: string;
  children: JSX.Element | ReactNode;
  disabled?: boolean;
}

export default function MainNavLink({ path, children, disabled }: LightProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const active = pathname.includes(path);
  const { slug } = useParams();
  const params = new URLSearchParams(searchParams);

  const isDisabled = disabled || !slug;

  const genLink = () => {
    if (isDisabled) return "#";
    let base = `/pokedex/${slug}/${path}`;
    if (Array.from(searchParams.entries()).length) {
      base += `?${params.toString()}`;
    }
    return base;
  };

  return (
    <Link
      href={genLink()}
      className={classnames(nanum.className, {
        [styles.active]: active && !isDisabled,
        [styles.link]: true,
        [styles.disabled]: isDisabled,
      })}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : undefined}
      aria-current={active && !isDisabled ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
