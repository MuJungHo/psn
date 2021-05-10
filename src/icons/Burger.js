import * as React from "react";

function SvgBurger(props) {
  return (
    <svg width={18} height={14} {...props}>
      <path
        fill="#FFF"
        fillRule="evenodd"
        d="M0 0h18v2.47H0V0zm0 5.765h18v2.47H0v-2.47zm0 5.764h18V14H0v-2.47z"
      />
    </svg>
  );
}

export default SvgBurger;
