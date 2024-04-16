import React, { ReactNode } from "react";

const VerticalCard: React.FC<{ children: ReactNode }> = (props) => {
  return (
    <div
      style={{
        padding: "8px",
        margin: "8px",
        borderRadius: "10px",
        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      {props.children}
    </div>
  );
};

export default VerticalCard;
