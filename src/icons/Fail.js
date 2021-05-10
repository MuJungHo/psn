import * as React from "react";

function SvgFail(props) {
  return (
    <svg width={80} height={80} {...props}>
      <defs>
        <style>{".Fail_svg__b{fill:#fff;stroke:#fff;stroke-width:3px}"}</style>
      </defs>
      <circle cx={40} cy={40} r={40} fill="#e8484a" />
      <path
        className="Fail_svg__b"
        d="M56.968 59.796a2.826 2.826 0 01-2-.826L21.03 25.032a2.828 2.828 0 014-4L58.968 54.97a2.826 2.826 0 01-2 4.825z"
      />
      <path
        className="Fail_svg__b"
        d="M23.03 59.796a2.826 2.826 0 01-2-4.825l33.938-33.938a2.828 2.828 0 014 4L25.03 58.971a2.84 2.84 0 01-2 .825z"
      />
    </svg>
  );
}

export default SvgFail;
