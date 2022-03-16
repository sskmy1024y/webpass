import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import "./App.css";
import EventPass from "./components/EventPass";
import { BlobFiles } from "./entities/BlobFiles";
import { Pass } from "./entities/Pass";
import { pkpassParser } from "./libs/pkpassParser";

function App() {
  const [blobs, setBlobs] = useState<BlobFiles>();
  const [pass, setPass] = useState<Pass>();

  const fetchPass = useCallback(async () => {
    const { blobs, pass } = await pkpassParser("/assets/Attachment.pkpass");
    setBlobs(blobs);
    setPass(pass);
  }, []);

  useEffect(() => {
    fetchPass();
  }, [fetchPass]);

  if (!blobs || !pass) return null;

  return (
    <div className="App">
      <PassView blobs={blobs} pass={pass} />
    </div>
  );
}

export default App;

const fadeIn = keyframes`
  from {
    opacity: 0;
    margin-top: 250px;
  }
  to {
    margin-top: 100px;
    opacity: 1;
  }
`;

const PassView = styled(EventPass)`
  margin: 100px auto 0;
  animation: ${fadeIn} 0.5s ease-in-out;
`;
