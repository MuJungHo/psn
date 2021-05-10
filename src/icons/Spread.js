import * as React from "react";

function SvgSpread(props) {
  return (
    <svg width={23} height={5} {...props}>
      <g fill="none" fillRule="evenodd">
        <path fill="none" d="M-4-12h30v30H-4z" />
        <path
          fill="#BEBEBE"
          fillRule="nonzero"
          d="M8.533 2.5a2.5 2.5 0 105.002-.002 2.5 2.5 0 00-5.002.002zM0 2.5a2.5 2.5 0 005 0 2.5 2.5 0 00-5 0zm17.067 0a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0z"
        />
      </g>
    </svg>
  );
}

export default SvgSpread;
