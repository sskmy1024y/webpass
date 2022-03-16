import QRCode from "react-qr-code";
import styled from "styled-components";
import { Pass } from "../../entities/Pass";

interface Props {
  pass: Pass;
}

export default function QRView({ pass }: Props) {
  if (
    !pass.barcode ||
    pass.barcode.format !== "PKBarcodeFormatQR" ||
    pass.barcode.message === ""
  )
    return null;

  return (
    <Container>
      <Base>
        <QRCode value={pass.barcode.message} size={132} />
      </Base>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
  justify-content: center;
  margin: 0 auto 24px;
`;

const Base = styled.div`
  padding: 8px;
  background-color: white;
  border-radius: 4px;
`;
