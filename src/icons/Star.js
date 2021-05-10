import * as React from "react";

function SvgStar(props) {
  return (
    <svg width={18} height={18} {...props}>
      <path
        d="M9 14.39l5.485 3.485-1.456-6.567 4.846-4.42-6.381-.57L9 .126 6.506 6.319l-6.381.57 4.846 4.419-1.456 6.567L9 14.39z"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgStar;
