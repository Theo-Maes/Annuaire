import { useState, useEffect } from 'react'
import { NextPage } from "next";
import React from 'react'

const VisiteurIndex:NextPage = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		const getSearchResults = async () =>	 {
			const response = await fetch(`http://localhost:3001/api/search?nom=${searchTerm}`);
			const data = await response.json();
			setSearchResults(data);
		};

		getSearchResults();
	}, [searchTerm]);

	return (
		<div>
			<input
				className='input'
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			<table className="table table-compact w-full">
				<thead>
					<tr>
						<th style={{ textAlign: 'center' }}>prenom</th>
						<th style={{ textAlign: 'center' }}>nom</th>
						<th style={{ textAlign: 'center' }}>service</th>
						<th style={{ textAlign: 'center' }}>ville</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{searchResults.map((result, index) => (
						<tr key={index}>
							<td style={{ textAlign: 'center' }}>{result.PRENOM}</td>
							<td style={{ textAlign: 'center' }}>{result.NOM}</td>
							<td style={{ textAlign: 'center' }}>{result.SERVICE}</td>
							<td style={{ textAlign: 'center' }}>{result.VILLE}</td>
							<td style={{ textAlign: 'center' }}><button className='btn'>more</button></td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default VisiteurIndex;