import * as React from "react";

function SvgFolder(props) {
  return (
    <svg width={140} height={110} {...props}>
      <rect width="100%" height="100%" fill="none" />
      <g className="folder_svg__currentLayer">
        <path
          d="M124.198 19.174h-60.97v-4.578c0-7.647-6.406-13.864-14.28-13.864h-32.12c-7.873 0-14.28 6.217-14.28 13.864v79.646c0 7.647 6.407 13.865 14.28 13.865h107.37c7.874 0 14.28-6.218 14.28-13.865V33.05c0-7.647-6.406-13.865-14.28-13.865z"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
}

export default SvgFolder;
