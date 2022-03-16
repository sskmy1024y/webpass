import { useMemo } from "react";
import styled from "styled-components";
import { BlobFiles } from "../../entities/BlobFiles";
import { Pass } from "../../entities/Pass";
import { blobToBase64Image, toSrcSet } from "../../utils";
import Field from "../Field";
import QRView from "../QRView";

interface Props {
  pass: Pass;
  blobs: BlobFiles;
  className?: string;
}

export default function EventPass({ className, ...props }: Props) {
  return (
    <Container className={className}>
      <Background color={props.pass.backgroundColor}>
        <HeaderFields {...props}></HeaderFields>
        <Strip blobs={props.blobs} />
        <SecondaryFields pass={props.pass} />
        <AuxiliaryFields pass={props.pass} />
        <QRView pass={props.pass} />
      </Background>
      <CropCircle />
    </Container>
  );
}

const HeaderFields = ({ pass, blobs }: Props) => {
  const logoSrcset = useMemo(() => {
    return toSrcSet(blobs.logo, blobs.logo2x, blobs.logo3x);
  }, [blobs.logo, blobs.logo2x, blobs.logo3x]);

  return (
    <FieldsContainer style={{ height: "44px" }}>
      {blobs.logo && (
        <HeaderLogo
          src={blobToBase64Image(blobs.logo)}
          srcSet={logoSrcset}
          alt={"logo"}
        />
      )}
      {pass.eventTicket.headerFields.map((field, i) => (
        <Field key={i} value={field} align={"right"} />
      ))}
    </FieldsContainer>
  );
};

const Strip = ({ blobs }: { blobs: BlobFiles }) => {
  const stripSrcset = useMemo(() => {
    return toSrcSet(blobs.strip, blobs.strip2x, blobs.strip3x);
  }, [blobs.strip, blobs.strip2x, blobs.strip3x]);

  if (!blobs.strip) return null;

  return <StripImg src={blobToBase64Image(blobs.strip)} srcSet={stripSrcset} />;
};

const SecondaryFields = ({ pass }: { pass: Pass }) => {
  return (
    <FieldsContainer>
      {pass.eventTicket.secondaryFields.map((field, i) => (
        <Field key={i} value={field} />
      ))}
    </FieldsContainer>
  );
};

const AuxiliaryFields = ({ pass }: { pass: Pass }) => {
  return (
    <FieldsContainer>
      {pass.eventTicket.auxiliaryFields.map((field, i) => (
        <Field key={i} value={field} />
      ))}
    </FieldsContainer>
  );
};

const Container = styled.div`
  position: relative;
  width: 64rem;
  max-width: 420px;
  height: 120rem;
  max-height: 596px;
  overflow: hidden;
  z-index: 0;

  @media screen and (max-width: 320px) {
    max-width: 100%;
    max-height: 500px;
  }

  @media screen and (max-width: 420px) {
    max-width: 355px;
    max-height: 510px;
  }

  @media screen and (max-width: 560px) {
    max-width: 396px;
    max-height: 556px;
  }
`;

const CropCircle = styled.div`
  position: absolute;
  width: 114px;
  height: 110px;
  border-radius: 125px;
  top: -90px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: black;
  border: 1px solid gray;
  box-sizing: border-box;
  z-index: 1;
`;

const Background = styled.div<{ color?: string }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${({ color }) => color ?? "#fff"};
  border: 1px solid gray;
  box-sizing: border-box;
  z-index: 0;
`;

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 14px;
  align-items: flex-start;
`;

const HeaderLogo = styled.img`
  height: 100%;
`;

const StripImg = styled.img`
  width: 100%;
`;
