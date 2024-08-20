import DisplayItem, {
  DisplayItemProps,
} from "@/components/Global/display.item";
import classNames from "classnames";
import type { ReactNode } from "react";

interface ExtendedItem extends DisplayItemProps {
  key: string;
}

interface ScreenProps {
  title: string;
  displayItems?: ExtendedItem[];
  children?: ReactNode;
}

const container = classNames(
  "p-2 pr-1",
  "flex flex-1",
  "flex-col space-y-2",
  "overflow-y-auto",
  "custom-scrollbar"
);

export default async function Screen({
  title,
  displayItems = [],
  children,
}: ScreenProps) {
  return (
    <>
      <h1 className="font-heading bg-black p-2 text-white">{title}</h1>
      <div className={container}>
        {children}
        {displayItems.map((props) => (
          <DisplayItem {...props} />
        ))}
      </div>
    </>
  );
}
