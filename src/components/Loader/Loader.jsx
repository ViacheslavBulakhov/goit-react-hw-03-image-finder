import { ThreeDots } from "react-loader-spinner";
import React from "react";
export const Loader = () => (
  <div style={{ margin: "0 auto" }}>
    <ThreeDots
      height="150"
      width="150"
      radius="9"
      color="tomato"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  </div>
);
