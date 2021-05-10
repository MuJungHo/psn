import * as React from "react";

function SvgAdd(props) {
  return (
    <svg width={14} height={14} {...props}>
      <path fill="none" d="M-1-1h16v16H-1z" />
      <g>
        <path
          d="M-.008 6.53v.932l6.54.004-.003 6.525h.934l.004-6.525 6.541.004v-.932l-6.54-.004L7.472.01h-.935l-.004 6.525-6.541-.004z"
          stroke="null"
        />
      </g>
    </svg>
  );
}

export default SvgAdd;
