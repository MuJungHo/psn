import * as React from "react";

function SvgRightArrow(props) {
  return (
    <svg width={11} height={18} {...props}>
      <path
        fill="#BEBEBE"
        fillRule="evenodd"
        d="M7.172 9L.343 2.172 2 .515l8.284 8.284-.2.201.2.201L2 17.485.343 15.828 7.172 9z"
      />
    </svg>
  );
}

export default SvgRightArrow;
