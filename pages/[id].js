import EditRestaurantForm from "@/components/EditRestaurantForm/EditRestaurantForm";
import {
  StyledArticle,
  StyledArticleHeadline,
} from "@/components/StyledArticle/Article.styled";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function EditPage() {
  const { data } = useSession();
  const email = data?.user?.email;
  const { data: restaurantsData } = useSWR(
    email ? `/api/restaurants?email=${data.user.email}` : null,
    fetcher
  );
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!data) {
      router.push("/");
    }
  }, []);

  if (!restaurantsData) {
    return;
  }

  const filteredRestaurant = restaurantsData.find(
    (restaurant) => restaurant._id === id
  );

  return (
    <main>
      <StyledArticle>
        <StyledArticleHeadline>
          <h3>Edit {filteredRestaurant.restaurant}</h3>
        </StyledArticleHeadline>
        <EditRestaurantForm restaurantData={filteredRestaurant} id={id} />
      </StyledArticle>
    </main>
  );
}
