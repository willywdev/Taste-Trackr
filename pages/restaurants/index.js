import RestaurantsList from "@/components/RestaurantsList/RestaurantsList";
import Searchbar from "@/components/Searchbar/Searchbar";
import StyledButton from "@/components/StyledLinkButton/LinkButton.styled";
import { StyledSection } from "@/components/StyledSection/Section.styled";
import { useSession } from "next-auth/react";
import { ClimbingBoxLoader } from "react-spinners";
import styled from "styled-components";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function restaurantsPage({ searchValue, handleSearchValue }) {
  const { data, status } = useSession();
  const email = data?.user?.email;

  const {
    data: restaurantsData,
    isLoading,
    error,
  } = useSWR(
    email ? `/api/restaurants?email=${data.user.email}` : null,
    fetcher
  );
  let filteredRestaurants;

  if (searchValue) {
    filteredRestaurants = restaurantsData.filter(
      (restaurant) =>
        restaurant.restaurant.toLowerCase().includes(searchValue) ||
        restaurant.city.toLowerCase().includes(searchValue) ||
        restaurant.rating.toLowerCase().includes(searchValue) ||
        restaurant.text.toLowerCase().includes(searchValue)
    );
  }

  if (!data && status !== "authenticated") {
    return (
      <main>
        <StyledSection>
          <h2>You must be logged in, to create new Ratings</h2>
        </StyledSection>
      </main>
    );
  }
  if (isLoading) {
    return (
      <main>
        <StyledSection>
          <StyledLoading>
            <h2>Is loading ...</h2>
            <ClimbingBoxLoader color="#52ffbd" />
          </StyledLoading>
        </StyledSection>
      </main>
    );
  }
  if (error) {
    return (
      <main>
        <StyledSection>
          <StyledLoading>
            <h2>Something went wrong 🤕</h2>
          </StyledLoading>
        </StyledSection>
      </main>
    );
  }

  return (
    <>
      <main>
        <StyledSection>
          <StyledButton href="restaurants/create">
            Create new Rating
          </StyledButton>
          <BetweenDiv>
            <h2>Restaurants:</h2>
            <Searchbar
              handleSearchValue={handleSearchValue}
              searchValue={searchValue}
            />
          </BetweenDiv>
          {filteredRestaurants ? (
            <RestaurantsList restaurantsData={filteredRestaurants} />
          ) : (
            <RestaurantsList restaurantsData={restaurantsData} />
          )}
        </StyledSection>
      </main>
    </>
  );
}

const BetweenDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
