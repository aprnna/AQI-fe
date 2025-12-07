import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export type FilterData = {
  start_month : string;
  start_year : string;
  end_month : string;
  end_year : string;
  states : string[];
  predict_type?: number
}