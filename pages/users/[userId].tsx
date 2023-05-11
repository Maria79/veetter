import Header from '@/components/Header';
import UserBio from '@/components/users/UserBio';
import UserHero from '@/components/users/UserHero';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

const UserView = () => {
	//	These lines use the useRouter hook to get the current URL query parameters
	//	and extract the userId parameter.
	const router = useRouter();
	const { userId } = router.query;

	// 	This line uses the useUser hook to fetch user data by passing the userId as an argument.
	//	The returned data is stored in the fetchedUser variable and the loading status is stored
	//	in the isLoading variable.
	const { data: fetchedUser, isLoading } = useUser(userId as string);

	// 	These lines check if the data is still being fetched or if there is no fetched user data.
	//	If either of these conditions is true, a loading spinner and the UserHero component
	//	are displayed.
	if (isLoading || !fetchedUser) {
		return (
			<div className='flex justify-center items-center h-full'>
				<ClipLoader color='lightblue' size={80} />
				<UserHero userId={userId as string} />
			</div>
		);
	}

	// 	If the data has been fetched successfully,
	//	this line returns the Header component with the user’s name as a label.
	return (
		<>
			<Header showBackArrow label={fetchedUser?.name} />
			<UserHero userId={userId as string} />
			<UserBio userId={userId as string} />
		</>
	);
};
export default UserView;
