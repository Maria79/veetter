import usePosts from '@/hooks/usePosts';
import PostItems from './PostItem';

interface PostFeedProps {
	userId: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
	const { data: posts = [] } = usePosts(userId);
	return (
		<>
			{posts.map((post: Record<string, any>) => (
				<PostItems userId={userId} key={post.id} data={post} />
			))}
		</>
	);
};

export default PostFeed;
