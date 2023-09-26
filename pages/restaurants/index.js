import {
  StyledArticle,
  StyledArticleHeadline,
  StyledTextSection,
} from "@/components/StyledArticle/Article.styled";
import StyledButton from "@/components/StyledButton/Button.styled";
import { StyledSection } from "@/components/StyledSection/Section.styled";

export default function restaurantsPage({ isLoading, error, restaurantsData }) {
  if (isLoading) {
    return <h2>Is loading ...</h2>;
  }
  if (error) {
    return <h2>Something went wrong: {error.message}</h2>;
  }

  return (
    <>
      <main>
        <StyledSection>
          <StyledButton href="restaurants/create">
            Create new Rating
          </StyledButton>
          <h2>Restaurants:</h2>
          {restaurantsData.map((restaurant) => (
            <StyledArticle key={restaurant._id}>
              <StyledArticleHeadline>
                {restaurant.restaurant}
              </StyledArticleHeadline>
              <StyledTextSection>
                <p>Rating: {restaurant.rating}</p>
                <p>Description: {restaurant.text}</p>
                {restaurant.city && <p>{restaurant.city}</p>}
              </StyledTextSection>
            </StyledArticle>
          ))}
        </StyledSection>
      </main>
    </>
  );
}
