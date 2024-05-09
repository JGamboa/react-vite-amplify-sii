import { withAuthenticator, WithAuthenticatorProps } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// @ts-expect-error error at build
import reactLogo from './assets/react.svg';

import './App.css';
import { useState } from 'react';
import Modal from '@components/Modal';
import CompanyList from './CompanyList';
import CompanyUpdateForm from '@ui-components/CompanyUpdateForm';
import CompanyCreateForm from '@ui-components/CompanyCreateForm';
import CompanyCreateFormValidations from '@validations/CompanyCreateFormValidations';
const client = generateClient();
import { deleteCompany } from '@ui-components/graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import type { Schema } from '../amplify/data/resource.ts';
import { CompanyFormOverrides } from './CompanyFormOverrides.ts';

type Props = {
	isPassedToWithAuthenticator: boolean;
} & WithAuthenticatorProps;
function App({ isPassedToWithAuthenticator, signOut, user }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentCompany, setCurrentCompany] = useState<Schema['Company']['type'] | undefined>();

	const handleDeleteCompany = async (id) => {
		await client.graphql({
			query: deleteCompany,
			variables: {
				input: {
					id: id,
				},
			},
		});
	};

	const handleOpenModal = () => {
		setCurrentCompany(null);
		setIsModalOpen(true);
	};

	const handleOpenUpdateModal = (company) => {
		setCurrentCompany(company);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	if (!isPassedToWithAuthenticator) {
		throw new Error('isPassedToWithAuthenticator was not provided');
	}

	return (
		<>
			<h1>{user?.signInDetails?.loginId}</h1>
			<button onClick={signOut}>Cerrar sesión</button>

			<Modal
				isOpen={isModalOpen}
				close={handleCloseModal}
			>
				{currentCompany ? (
					<CompanyUpdateForm
						id={currentCompany.id}
						company={currentCompany}
						onSuccess={handleCloseModal}
						onValidate={CompanyCreateFormValidations}
						overrides={CompanyFormOverrides}
					/>
				) : (
					<CompanyCreateForm
						onSuccess={handleCloseModal}
						onValidate={CompanyCreateFormValidations}
						overrides={CompanyFormOverrides}
					/>
				)}
			</Modal>

			<CompanyList
				handleOpenModal={handleOpenModal}
				handleOpenUpdateModal={handleOpenUpdateModal}
				handleDeleteCompany={handleDeleteCompany}
			></CompanyList>

			<div>
				<a
					href='https://react.dev'
					target='_blank'
				>
					<img
						src={reactLogo}
						className='logo react'
						alt='React logo'
					/>
				</a>
			</div>
		</>
	);
}

export default withAuthenticator(App);

export async function getStaticProps() {
	return {
		props: {
			isPassedToWithAuthenticator: true,
		},
	};
}
