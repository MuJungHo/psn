import * as React from "react";

function SvgFormVisitor(props) {
  return (
    <svg width={20} height={20} {...props}>
      <g fill="#BEBEBE" fillRule="evenodd">
        <path d="M19 6h-2V3a1 1 0 00-1-1H3a1 1 0 00-1 1v14a1 1 0 001 1h4v2H2a2 2 0 01-2-2V2a2 2 0 012-2h15a2 2 0 012 2v4zM4 5h7v2H4V5zm0 4h4v2H4V9z" />
        <path d="M11.873 14.388A3.999 3.999 0 0114 7a3.999 3.999 0 012.127 7.388A6.002 6.002 0 0120 20h-2c0-2.21-1.79-4-4-4s-4 1.79-4 4H8a6.004 6.004 0 013.873-5.612zM14 13a2 2 0 10.001-3.999A2 2 0 0014 13z" />
      </g>
    </svg>
  );
}

export default SvgFormVisitor;
