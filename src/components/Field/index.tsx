import styled from "styled-components";
import { FieldValue } from "../../entities/Pass";

interface Props {
  value: FieldValue;
  labelColor?: string;
  foregroundColor?: string;
  align?: "left" | "right";
}

export default function Field({
  value,
  labelColor,
  foregroundColor,
  align = "left",
}: Props) {
  return (
    <Column align={align}>
      <Label color={labelColor}>{value.label ?? " "}</Label>
      <Value color={foregroundColor}>{value.value}</Value>
    </Column>
  );
}

const Column = styled.div<{ align: "left" | "right" }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => (align === "left" ? "flex-start" : "flex-end")};
  line-height: 1.1;
`;

const Label = styled.div<{ color?: string }>`
  font-size: 11px;
  font-weight: 600;
  color: ${({ color }) => color ?? "gray"};
`;

const Value = styled.div<{ color?: string }>`
  font-size: 20px;
  font-weight: 400;
  color: ${({ color }) => color ?? "black"};
`;
