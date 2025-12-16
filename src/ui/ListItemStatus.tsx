import styled from "styled-components";

type StatusColor = "red" | "green" | "black";

interface ListItemStatusProps {
  color: StatusColor;
}

const ListItemStatus = styled.span<ListItemStatusProps>`
  display: inline-block;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background-color: ${(props) =>
    props.color === "red"
      ? "var(--rose-600)"
      : props.color === "green"
      ? "var(--green-600)"
      : "#000"};
`;

export default ListItemStatus;
