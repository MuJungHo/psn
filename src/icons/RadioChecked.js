import * as React from "react";

function SvgRadioChecked(props) {
  return (
    <svg width={40} height={40} {...props}>
      <path fill="none" d="M-1-1h42v42H-1z" />
      <g strokeOpacity={0.4} strokeWidth={3}>
        <circle cy={20} cx={20} fill="#fff" r={18} />
        <circle cy={20} cx={20} r={15} />
      </g>
    </svg>
  );
}

export default SvgRadioChecked;
