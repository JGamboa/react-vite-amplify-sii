import { useEffect, useState } from 'react';
import type { Schema } from '../../amplify/data/resource.ts';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

export const useGetCompanies = () => {
	const [companies, setCompanies] = useState<Array<Schema['Company']['type']>>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchCompanies = async () => {
		try {
			setLoading(true);
			const sub = client.models.Company.observeQuery().subscribe({
				next: ({ items }) => {
					setCompanies([...items]);
					setLoading(false);
				},
			});

			return () => sub.unsubscribe();
		} catch (err) {
			setError(err);
		}
	};

	useEffect(() => {
		fetchCompanies();
	}, []);

	return { companies, loading, error };
};
