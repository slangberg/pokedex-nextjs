import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
export const usePageIndex = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const preIndex = searchParams.get("imageIndex")
    ? Number(searchParams.get("imageIndex"))
    : 0;
  const [localIndex, setLocalIndex] = useState(preIndex);
  // useEffect(() => {
  //   const imageIndex = searchParams.get("imageIndex");
  //   const newIndex = imageIndex ? Number(imageIndex) : 0;
  //   if (localIndex !== newIndex) {
  //     setLocalIndex(newIndex);
  //   }
  // }, [pathname, searchParams]);

  return localIndex;
};
