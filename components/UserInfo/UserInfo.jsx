import styled from "styled-components";
import useSWR from "swr";
import { StyledLink } from "../StyledLink/Link.styled";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function UserInfo({ email }) {
  const { data, isLoading, error } = useSWR(
    email ? `/api/user?email=${email}` : null,
    fetcher
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data) {
    const user = data;
    const { _id, name, image } = user;

    return (
      <StyledLink href={`/user?id=${_id}`}>
        <StyledDiv>
          <Avatar src={image} alt="Avatar" />
          <p>{name}</p>
        </StyledDiv>
      </StyledLink>
    );
  }

  return null;
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
