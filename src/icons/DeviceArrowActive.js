import * as React from "react";

function SvgDeviceArrowActive(props) {
  return (
    <svg width={12} height={12} {...props}>
      <g transform="translate(702 123)">
        <rect
          rx={2}
          stroke="#4295FF"
          fillOpacity={0.1}
          fill="#5597FE"
          y={-122.5}
          x={-701.5}
          height={11}
          width={11}
        />
        <path
          d="M-695.143-115.43L-693-119h-6l2.143 3.57a.999.999 0 001.714.001v-.001z"
          fill="#5295FF"
        />
      </g>
    </svg>
  );
}

export default SvgDeviceArrowActive;
