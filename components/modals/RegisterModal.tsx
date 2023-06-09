import axios from 'axios';
import { useCallback, useState } from 'react';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';

import Input from '../Input';
import Modal from '../Modal';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

const RegisterModal = () => {
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const onToggle = useCallback(() => {
		if (isLoading) {
			return;
		}
		registerModal.onClose();
		loginModal.onOpen();
	}, [isLoading, loginModal, registerModal]);

	const onSubmit = useCallback(async () => {
		try {
			setIsLoading(true);

			//TODO ADD REGISTER & LOGIN
			await axios.post('/api/register', {
				email,
				password,
				username,
				name,
			});

			toast.success('Account created');

			signIn('credentials', {
				email,
				password,
			});

			registerModal.onClose();
		} catch (error) {
			console.log(error);
			toast.error('Something when wrong');
		} finally {
			setIsLoading(false);
		}
	}, [email, name, password, registerModal, username]);

	const bodyContent = (
		<div className='flex flex-col gap-4'>
			<Input
				disabled={isLoading}
				placeholder='Email'
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>
			<Input
				disabled={isLoading}
				placeholder='Name'
				onChange={(e) => setName(e.target.value)}
				value={name}
			/>
			<Input
				disabled={isLoading}
				placeholder='Username'
				onChange={(e) => setUsername(e.target.value)}
				value={username}
			/>
			<Input
				disabled={isLoading}
				placeholder='Password'
				type='password'
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>
		</div>
	);

	const footerContent = (
		<div className='text-neutral-600 text-center mt-4'>
			<p>
				Already have an account?{' '}
				<span
					onClick={onToggle}
					className='text-white cursor-pointer hover:underline'
				>
					Sign in.
				</span>
			</p>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title='Register an account'
			actionLabel='Register'
			onClose={registerModal.onClose}
			onSubmit={onSubmit}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RegisterModal;
