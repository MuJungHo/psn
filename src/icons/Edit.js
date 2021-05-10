import * as React from "react";

function SvgEdit(props) {
  return (
    <svg width={20} height={20} {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          fill="#BEBEBE"
          fillRule="nonzero"
          d="M14.857 8.571v5.14a1.15 1.15 0 01-1.145 1.146H2.289a1.15 1.15 0 01-1.146-1.146V2.288a1.15 1.15 0 011.146-1.145h6.282a.572.572 0 100-1.143H2.293A2.292 2.292 0 000 2.293v11.414A2.292 2.292 0 002.293 16h11.414A2.292 2.292 0 0016 13.707V8.571a.571.571 0 00-1.143 0zM6.93 9.903l8.687-8.687a.567.567 0 00.17-.405.566.566 0 00-.166-.406.58.58 0 00-.813.003L6.122 9.094a.572.572 0 10.808.809z"
        />
        <path fill="none" d="M-2-2h20v20H-2z" />
      </g>
    </svg>
  );
}

export default SvgEdit;
