import * as React from "react";

function SvgEye(props) {
  return (
    <svg width={30} height={30} {...props}>
      <g fill="#5295FF" fillRule="evenodd">
        <rect width={30} height={30} fillOpacity={0.1} rx={8} />
        <path
          fillRule="nonzero"
          d="M15 23c-5.524 0-9.444-4.821-10-7.5C5.555 12.822 9.476 8 15 8s9.444 4.822 10 7.5c-.556 2.679-4.476 7.5-10 7.5zm0-13.393c-4.36 0-7.606 3.719-8.283 5.893.677 2.175 3.922 5.893 8.283 5.893 4.36 0 7.606-3.718 8.283-5.893-.677-2.174-3.922-5.893-8.283-5.893zm0 9.107c-1.841 0-3.333-1.438-3.333-3.214s1.492-3.214 3.333-3.214c1.841 0 3.333 1.438 3.333 3.214S16.841 18.714 15 18.714zm0-4.821c-.919 0-1.667.72-1.667 1.607 0 .886.748 1.607 1.667 1.607.92 0 1.667-.72 1.667-1.607 0-.886-.748-1.607-1.667-1.607z"
        />
      </g>
    </svg>
  );
}

export default SvgEye;