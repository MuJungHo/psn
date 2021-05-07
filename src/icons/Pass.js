import * as React from "react";

function SvgPass(props) {
  return (
    <svg width={80} height={80} {...props}>
      <circle cx={40} cy={40} r={40} fill="#1eae7d" />
      <path
        d="M32.022 61.311L15.264 40.535a3.076 3.076 0 014.793-3.858l12.4 15.377 27.684-28.327a3.076 3.076 0 014.4 4.3z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={3}
      />
    </svg>
  );
}

export default SvgPass;
