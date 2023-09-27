import styled from "styled-components";

export default function UserInfo({ image, name }) {
  return (
    <StyledDiv>
      <Avatar src={image} alt="Avatar" />
      <p>{name}</p>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;
