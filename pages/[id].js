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
  const router = useRouter();
  const { id } = router.query;
  const email = data?.user?.email;
  const { data: user } = useSWR(
    email ? `/api/user?email=${email}` : null,
    fetcher
  );
  const { data: restaurantsData } = useSWR(
    user ? `/api/restaurants?id=${user._id}` : null,
    fetcher
  );

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
