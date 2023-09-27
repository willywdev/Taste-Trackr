import AddRestaurantForm from "@/components/AddRestaurantForm/AddRestaurantForm";
import {
  StyledArticle,
  StyledArticleHeadline,
} from "@/components/StyledArticle/Article.styled";
import { StyledSection } from "@/components/StyledSection/Section.styled";
import { useSession } from "next-auth/react";

export default function createPage() {
  const { data } = useSession();

  if (!data) {
    return (
      <main>
        <StyledSection>
          <h2>Please login first</h2>
        </StyledSection>
      </main>
    );
  }

  return (
    <main>
      <StyledArticle>
        <StyledArticleHeadline>
          <h3>Add new Restaurant rating:</h3>
        </StyledArticleHeadline>
        <AddRestaurantForm userData={data} />
      </StyledArticle>
    </main>
  );
}
