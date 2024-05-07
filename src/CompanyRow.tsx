import { Button, TableCell, TableRow } from '@aws-amplify/ui-react';

export default function CompanyRow({ company, handleOpenUpdateModal, handleDeleteCompany }) {
	return (
		<>
			<TableRow>
				<TableCell>{company.identityCard}</TableCell>
				<TableCell>{company.name}</TableCell>
				<TableCell>
					<Button
						className={'button'}
						variation='link'
						onClick={() => handleOpenUpdateModal(company)}
					>
						Editar
					</Button>
					<Button
						className={'button'}
						variation='link'
						onClick={() => handleDeleteCompany(company.id)}
					>
						Borrar
					</Button>
				</TableCell>
			</TableRow>
		</>
	);
}
