import PostCard from 'components/post-card/post-card';
import { getPostData, getPostsFiles } from 'utils/markdown-resolver';

function SinglePost({ data }) {
  return <PostCard key={data.slug} post={data}></PostCard>;
}

export const getStaticProps = (context) => {
  const { params } = context;
  const { slug } = params;
  const postData = getPostData(`${slug}.md`);
  return {
    props: {
      data: postData,
    },
    revalidate: 600,
  };
};
export const getStaticPaths = () => {
  const postsFileNames = getPostsFiles();
  const postsSlugs = postsFileNames.map((fileName) =>
    fileName.replace(/\.md$/, '')
  );
  return {
    paths: postsSlugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export default SinglePost;
