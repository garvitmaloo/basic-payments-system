import { pageHeadingProps } from "../types";

const PageHeading = (props: pageHeadingProps) => (
  <h1
    style={{
      fontSize: "24px",
      color: "darkgray",
    }}
  >
    {props.text}
  </h1>
);

export default PageHeading;
