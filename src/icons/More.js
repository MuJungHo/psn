import * as React from "react";

function SvgMore(props) {
  return (
    <svg width={23} height={23} {...props}>
      <path fill="none" d="M-1-1h25v25H-1z" />
      <g>
        <g fillRule="evenodd" fill="none">
          <path d="M-3.5-3.5h30v30h-30v-30z" fill="none" />
          <path
            d="M9.033 11a2.5 2.5 0 105.002-.002A2.5 2.5 0 009.033 11zM.5 11a2.5 2.5 0 005 0 2.5 2.5 0 00-5 0zm17.067 0a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0z"
            fillRule="nonzero"
            fill="#BEBEBE"
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgMore;
