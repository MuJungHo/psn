import * as React from "react";

function SvgCross(props) {
  return (
    <svg width={15} height={15} {...props}>
      <g fill="none" fillRule="evenodd">
        <path d="M-7-7h30v30H-7z" />
        <path
          fill="#BEBEBE"
          d="M8.661 7.5l6.108-6.11a.8.8 0 000-1.125l-.034-.034a.8.8 0 00-1.125 0L7.503 6.35 1.396.231a.8.8 0 00-1.125 0L.237.265a.787.787 0 000 1.125L6.345 7.5.238 13.61a.8.8 0 000 1.125l.034.034a.8.8 0 001.125 0l6.106-6.111 6.107 6.11a.8.8 0 001.125 0l.034-.034a.8.8 0 000-1.125l-6.108-6.11z"
        />
      </g>
    </svg>
  );
}

export default SvgCross;
