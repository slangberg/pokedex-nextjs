import classNames from "classnames";

interface ButtonNavProps {
  children?: JSX.Element;
}

const containerStyles = classNames(
  "flex flex-col",
  "overflow-hidden",
  "bg-screen bg-no-repeat bg-cover",
  "rounded-md",
  "shadow-inset-1",
  "flex-1 min-h-[180px] md:flex-none md:h-[340px]",
  "pb-1 mb-2"
);

export default function MainDisplay({ children }: ButtonNavProps) {
  return (
    <main className={containerStyles}>
      {children}
    </main>
  );
}
