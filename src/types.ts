import type { RefObject } from "react";

export type SvgRef = RefObject<SVGSVGElement>;

export interface SrcType {
  width: number;
  src: string;
  //
  height?: number;
  size?: number;
  format?: string; // we dont care: but @see https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
}

export type SrcSet = SrcType[];

export type GetUrl = (x: SrcType) => string;
