import { useEffect, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

/**
 * Hook, that returns the current dimensions of an HTML element.
 * Doesn't play well with SVG.
 */

const useResizeObserver = (
  ref: React.RefObject<HTMLDivElement>
): DOMRectReadOnly | undefined => {
  const [dimensions, setDimensions] = useState<DOMRectReadOnly>();
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        entries.forEach((entry) => {
          setDimensions(entry.contentRect);
        });
      }
    );
    resizeObserver.observe(observeTarget!);
    return () => {
      resizeObserver.unobserve(observeTarget!);
    };
  }, [ref]);
  return dimensions;
};

export default useResizeObserver;
