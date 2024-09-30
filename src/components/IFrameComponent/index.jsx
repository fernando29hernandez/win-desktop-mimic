import React, { useState } from 'react';

const IFrameComponent = ({ url }) => {
  const [loadingIframe, setLoadingIframe] = useState(true);

  return (
    <>
      <iframe
        src={url}
        onLoad={() => setLoadingIframe(false)}
        width={"100%"}
        height={"100%"}
        loading="lazy"
        style={{ "border": "none", "overflow": "hidden" }}
        allowfullscreen></iframe>
      {loadingIframe ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>  <p > Loading...</p></div> : null}
    </>
  );
};

export default IFrameComponent;
