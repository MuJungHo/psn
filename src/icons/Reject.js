import * as React from "react";

function SvgReject(props) {
  return (
    <svg width={30} height={30} {...props}>
      <path fill="none" d="M-1-1h802v602H-1z" />
      <g>
        <g fillRule="nonzero" fill="#FF6262">
          <path d="M19.865 20.672a.804.804 0 00.57-1.372l-9.067-9.067a.803.803 0 00-1.131 1.139l9.058 9.06c.15.152.355.239.57.24z" />
          <path d="M10.8 20.672a.806.806 0 00.569-.233l9.067-9.064a.806.806 0 10-1.14-1.14L10.237 19.3a.803.803 0 00.57 1.372H10.8z" />
        </g>
      </g>
    </svg>
  );
}

export default SvgReject;
