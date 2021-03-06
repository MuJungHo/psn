import * as React from "react";

function SvgPan(props) {
  return (
    <svg width={22} height={21} {...props}>
      <path
        fill="#BEBEBE"
        d="M21.22 21H.78a.781.781 0 01-.78-.783.78.78 0 01.779-.783H21.22c.43 0 .779.35.779.783a.781.781 0 01-.779.783zM2.24 13.227l-.147 3.221 3.203-.147 11.35-11.426-3.057-3.074L2.24 13.227zm-.926 4.729a.736.736 0 01-.73-.764l.195-4.317a.745.745 0 01.213-.48L13.074.216A.692.692 0 0113.589 0a.693.693 0 01.516.216l4.088 4.112a.724.724 0 010 1.037l-12.06 12.18a.72.72 0 01-.477.215l-4.284.196h-.058z"
      />
    </svg>
  );
}

export default SvgPan;
