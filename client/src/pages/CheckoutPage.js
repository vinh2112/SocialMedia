import React from "react";
import PaySection from "components/CheckoutPage";
import Header from "components/Header";
import { useParams } from "react-router";
import { PostAPI } from "api";

const CheckoutPage = () => {
  const [post, setPost] = React.useState(null);
  const { postId } = useParams();

  React.useEffect(() => {
    const fetchPost = async () => {
      await PostAPI.fetchPost(postId).then((res) => setPost(res.data));
    };

    fetchPost();
  }, [postId]);

  return (
    <>
      <Header />
      {post !== null && <PaySection post={post} />}
    </>
  );
};
export default CheckoutPage;
