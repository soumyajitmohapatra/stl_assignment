import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => (
  <ContentLoader
    width={800}
    height={560}
    viewBox="0 0 450 170"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"

  >
    <rect x="80" y="88" rx="3" ry="3" width="254" height="10" />
    <rect x="78" y="103" rx="3" ry="3" width="254" height="10" />
    <rect x="150" y="125" rx="3" ry="3" width="118" height="10" />
    <circle cx="210" cy="37" r="32" />
   
  
  </ContentLoader>
);



export default Loader;
