import * as React from "react";

function SvgPad(props) {
  return (
    <svg width={20} height={15} {...props}>
      <path
        d="M18.571 0H1.43C.619 0 0 .668 0 1.541V13.46C0 14.332.619 15 1.429 15H18.57c.81 0 1.429-.668 1.429-1.541V1.54C20 .668 19.381 0 18.571 0zM16 13H2V2h14v11zm3-5c0 .571-.429 1-1 1s-1-.429-1-1 .429-1 1-1 1 .429 1 1z"
        fill="#FFF"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default SvgPad;
