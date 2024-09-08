import classNames from "classnames";
interface LowerDisplayProps {
  children?: JSX.Element;
}

const containerStyles = classNames(
  "bg-[#6aa66d]",
  "w-[240px] h-[100px]",
  "py-1 px-2",
  "rounded-md",
  "shadow-inset-1",
  "ml-[70px] mr-[10px]"
);

export default function LowerDisplay({ children }: LowerDisplayProps) {
  return <div className={containerStyles}>{children}</div>;
}
