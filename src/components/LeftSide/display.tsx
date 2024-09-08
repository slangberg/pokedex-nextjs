import Light from "@/components/Global/light";
import classNames from "classnames";
interface DisplayProps {
  children?: JSX.Element;
}

const wrapperBaseStyles = classNames(
  "absolute",
  "z-[1] rounded-br-md",
  "left-0 right-0 top-[100%]",
  "content-['']",
  "bottom-[auto]",
  "border-t-[#e8dad5] border-b-none",
  "border-l-[transparent]",
  "border-t-[35px]",
  "border-l-[25px]",
  "md:border-t-[45px]",
  "md:border-l-[35px]"
);

const wrapperStyles = classNames(
  "relative",
  "bg-[#e3dedd]",
  "rounded-t-md",
  "mb-14",
  "py-1 px-3",
  "md:pt-2 md:px-3 md:pb-2",
  "drop-shadow-deep"
);

const speakerStyles = classNames(
  "md:w-[55px] md:h-[5px]",
  "w-[5px] h-[25px]",
  "bg-[#e3dedd]",
  "flex",
  "shadow-inset-2"
);

const bottomStyles = classNames(
  "flex justify-between absolute",
  "box-border",
  "top-[100%] w-[calc(100%_-_25px)]",
  "z-[2] pr-[0] mt-1"
);

const displayStyles = classNames(
  "h-[250px]",
  "md:h-[300px]",
  "z-[2] bg-black",
  "text-white shadow-inset-2",
  "rounded-md"
);

const speakerContainerStyles = classNames("flex flex-row md:flex-col", "gap-1");

export default function Display({ children }: DisplayProps) {
  return (
    <div className={wrapperStyles}>
      <div className="text-center pb-1">
        <Light className="md:w-4 md:h-4 w-3 h-3" color="#e93a3a" />
        <Light className="md:w-4 md:h-4 w-3 h-3" color="#0ec518" />
      </div>
      <aside
        className={displayStyles}
        aria-labelledby="fig2-caption"
        role="complementary"
        id="slideshow"
      >
        {children}
      </aside>
      <div className={bottomStyles}>
        <Light className="md:w-4 md:h-4 w-3 h-3" color="#e93a3a" />
        <div className={speakerContainerStyles}>
          <div className={speakerStyles} />
          <div className={speakerStyles} />
          <div className={speakerStyles} />
          <div className={speakerStyles} />
        </div>
      </div>
      <div className={wrapperBaseStyles} />
    </div>
  );
}
