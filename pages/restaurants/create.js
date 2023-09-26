import AddRestaurantForm from "@/components/AddRestaurantForm/AddRestaurantForm";
import {
  StyledArticle,
  StyledArticleHeadline,
} from "@/components/StyledArticle/Article.styled";

export default function createPage() {
  return (
    <main>
      <StyledArticle>
        <StyledArticleHeadline>
          <h3>Add new Restaurant rating:</h3>
        </StyledArticleHeadline>
        <AddRestaurantForm />
      </StyledArticle>
    </main>
  );
}
