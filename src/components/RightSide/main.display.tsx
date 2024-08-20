interface ButtonNavProps {
  children?: JSX.Element;
}

export default function MainDisplay({ children }: ButtonNavProps) {
  return (
    <main
      className="bg-screen bg-no-repeat bg-cover h-[340px] overflow-hidden flex flex-col mb-3"
      role="main"
    >
      {children}
    </main>
  );
}
