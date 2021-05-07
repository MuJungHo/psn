import * as React from "react";

function SvgDeviceArrow(props) {
  return (
    <svg width={12} height={12} {...props}>
      <g fill="#BEBEBE" fillRule="evenodd">
        <rect
          width={11}
          height={11}
          x={0.5}
          y={0.5}
          fillOpacity={0.1}
          stroke="#BEBEBE"
          rx={2}
        />
        <path d="M6.857 7.57L9 4H3l2.143 3.57a.999.999 0 001.714.001z" />
      </g>
    </svg>
  );
}

export default SvgDeviceArrow;
