import * as React from "react";

function SvgLoginbg(props) {
  return (
    <svg width={1366} height={768} {...props}>
      <defs>
        <radialGradient
          id="loginbg_svg__a"
          cx="47.815%"
          cy="33.484%"
          r="109.325%"
          fx="47.815%"
          fy="33.484%"
          gradientTransform="matrix(-.03157 .99843 -.56197 -.05608 .681 -.123)"
        >
          <stop offset="0%" stopColor="#454773" />
          <stop offset="100%" stopColor="#21223F" />
        </radialGradient>
      </defs>
      <path
        fill="url(#loginbg_svg__a)"
        fillRule="evenodd"
        d="M0 0h1368v770H0z"
        opacity={0.903}
      />
    </svg>
  );
}

export default SvgLoginbg;
