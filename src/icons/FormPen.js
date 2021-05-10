import * as React from "react";

function SvgFormPen(props) {
  return (
    <svg width={20} height={20} {...props}>
      <path
        d="M19.302 19H5.698C5.312 19 5 18.552 5 18s.312-1 .698-1h13.604c.386 0 .698.448.698 1s-.312 1-.698 1zm-13.611.048H.994c-.549 0-.994-.453-.994-1.01v-4.775c.001-.268.107-.524.293-.712L12.355.284a1.013 1.013 0 011.407 0l4.696 4.775a1.017 1.017 0 010 1.429L6.396 18.75a.988.988 0 01-.705.298zm-3.993-1.759h3.435L16.698 5.542l-3.436-3.49L1.698 13.798v3.49z"
        fill="#BEBEBE"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default SvgFormPen;
