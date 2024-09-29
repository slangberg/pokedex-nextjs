import DisplayItem, {
  DisplayItemProps,
} from "@/components/Global/display.item";
import classNames from "classnames";
import type { ReactNode } from "react";
import ScreenHeading from "./screen.heading";

export interface ExtendedItem extends DisplayItemProps {
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
      <ScreenHeading>{title}</ScreenHeading>
      <div className={container}>
        {children}
        {displayItems.map((props) => (
          <DisplayItem {...props} key={props.key} />
        ))}
      </div>
    </>
  );
}
