import * as React from "react";

function SvgArrow(props) {
  return (
    <svg width={24} height={24} {...props}>
      <path fill="none" d="M-1-1h26v26H-1z" />
      <g>
        <path
          stroke="null"
          d="M12.031 13.856l6.15-6.15L19.671 9.2l-7.46 7.46-.18-.18-.182.18-7.46-7.46 1.492-1.492 6.15 6.15z"
          fillRule="evenodd"
          fill="#BEBEBE"
        />
      </g>
    </svg>
  );
}

export default SvgArrow;
