import React from "react";
import PaySection from "components/PayPage";
import Header from "components/Header";
import { useParams } from "react-router";
import { PostAPI } from "api";

const PaypalPage = () => {
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
export default PaypalPage;
