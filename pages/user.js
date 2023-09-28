import { StyledButton } from "@/components/StyledButton/Button.styled";
import { StyledSection } from "@/components/StyledSection/Section.styled";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function UserPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(id ? `/api/user?id=${id}` : null, fetcher);
  const { data: restaurantData } = useSWR(
    data ? `/api/restaurants?id=${id}` : null,
    fetcher
  );
  console.log(restaurantData);
  if (!id) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <StyledSection>
        <FlexBox>
          <img src={data.image} alt="Avatar" />
          <p>Name: {data.name}</p>
          <p>Ratings: {restaurantData?.length}</p>
          <p>Your ID: {id}</p>
          <StyledButton>Copy</StyledButton>
          <form>
            <label htmlFor="pairID">Set your Partners ID:</label>
            <StyledInput type="text" name="pairID" id="pairID" />
            <StyledButton type="submit">Save</StyledButton>
          </form>
        </FlexBox>
      </StyledSection>
    </main>
  );
}

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 50px;
    outline: 2px solid #52ffbd;
  }

  form {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
`;
export const StyledInput = styled.input`
  border-radius: 8px;
  border: none;
  height: 1.3rem;
  width: 300px;

  &:focus {
    border: none;
    outline: 1px solid #52ffbd;
  }
`;
