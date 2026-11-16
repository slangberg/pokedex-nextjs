import LeftSide from "@/components/LeftSide/leftside";
import RightSide from "@/components/RightSide/right.side";
import classNames from "classnames";

interface AsideProps {
  left?: JSX.Element;
  children?: JSX.Element | undefined;
  mini?: JSX.Element;
  dpad: JSX.Element;
  search?: JSX.Element;
}

// min-h-screen (not h-screen) so that on a viewport shorter than the device
// the page grows and scrolls instead of clipping the top of the Pokédex.
// md:pt-12 keeps the device clear of the fixed SiteHeader (h-12) and centers
// it in the space below the header.
const wrapperStyles = classNames(
  "w-screen",
  "min-h-screen",
  "md:pt-12",
  "flex",
  "justify-center",
  "items-center",
  "flex-row"
);

// Mobile: fill the viewport so the data screen can take the remaining height,
// scrolling on short phones rather than squashing the screen below its minimum.
// Desktop: shrink to the device's own height so the wrapper can center it.
const containerStyles = classNames(
  "max-w-[100vw] md:min-w-[345px]",
  "width-full",
  "h-screen overflow-y-auto overflow-x-hidden",
  "md:h-auto md:overflow-visible",
  "flex",
  "flex-col md:flex-row"
);

export default function MainLayout({
  mini,
  left,
  children,
  dpad,
  search,
}: AsideProps) {
  return (
    <div className={wrapperStyles}>
      <div className={containerStyles}>
        <LeftSide mini={mini} dpad={dpad}>
          {left}
        </LeftSide>
        <RightSide search={search}>{children}</RightSide>
      </div>
    </div>
  );
}
