import * as React from "react";

function SvgArrowdown(props) {
  return (
    <svg width={18} height={11} {...props}>
      <path
        fill="#BEBEBE"
        fillRule="evenodd"
        d="M9 7.172L15.828.343 17.485 2l-8.284 8.284-.201-.2-.201.2L.515 2 2.172.343 9 7.172z"
      />
    </svg>
  );
}

export default SvgArrowdown;
