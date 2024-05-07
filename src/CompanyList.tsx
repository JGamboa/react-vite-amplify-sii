import { useState } from 'react';
import './CompanyList.css';

import {
	Button,
	Flex,
	Loader,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
} from '@aws-amplify/ui-react';
import CompanyRow from './CompanyRow';
import { useGetCompanies } from '@hooks/useGetCompanies';

export default function CompanyList({ handleOpenModal, handleOpenUpdateModal, handleDeleteCompany }) {
	const { companies, loading, error } = useGetCompanies();
	const [filter, setFilter] = useState('');

	const filteredCompanies = companies.filter(
		(company) =>
			company.name.toLowerCase().includes(filter.toLowerCase()) ||
			company.identityCard.toLowerCase().includes(filter.toLowerCase()),
	);

	return (
		<div>
			<Flex
				className={'flex-container'}
				direction='column'
				gap='1rem'
			>
				<Flex
					className={'flex-container'}
					justifyContent='space-between'
					alignItems='center'
				>
					<Button
						className={'button'}
						onClick={handleOpenModal}
					>
						Agregar nueva empresa
					</Button>
					<TextField
						className={'search-input'}
						placeholder='Buscar por nombre o rut'
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						label={'Busqueda'}
					/>
				</Flex>
				{loading && <Loader variation='linear' />}
				<Table
					className={'table-container'}
					highlightOnHover
					variation='striped'
				>
					<TableHead>
						<TableRow>
							<TableCell as='th'>Rut</TableCell>
							<TableCell as='th'>Nombre</TableCell>
							<TableCell as='th'>Acciones</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredCompanies.map((company) => (
							<CompanyRow
								key={'companyRow-' + company.id}
								company={company}
								handleOpenUpdateModal={handleOpenUpdateModal}
								handleDeleteCompany={handleDeleteCompany}
							/>
						))}
					</TableBody>
				</Table>
			</Flex>
		</div>
	);
}
