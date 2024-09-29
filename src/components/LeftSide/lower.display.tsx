import classNames from "classnames";
import classnames from "classnames";
interface LowerDisplayProps {
  children?: JSX.Element;
  className?: string;
}

const containerStyles = classNames(
  "bg-[#6aa66d] flex grow",
  "h-[100px]",
  "py-1 px-2",
  "rounded-md",
  "shadow-inset-1"
  // "ml-[70px] mr-[10px]"
);

export default function LowerDisplay({
  children,
  className,
}: LowerDisplayProps) {
  return (
    <div className={classNames(containerStyles, className)}>{children}</div>
  );
}
