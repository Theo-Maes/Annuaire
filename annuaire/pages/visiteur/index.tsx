import { useState, useEffect } from 'react'
import { NextPage } from "next";
import React from 'react'

const VisiteurIndex:NextPage = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchSiteTerm, setSearchSiteTerm] = useState('none');
	const [searchServiceTerm, setSearchServiceTerm] = useState('none');
	const [searchResults, setSearchResults] = useState([]);
	const [dataService, setDataService] = useState([]);
	const [dataSite, setDataSite] = useState([]);


	useEffect(() => {
		async function fetchSites() {
		  const response = await fetch('http://localhost:3001/api/site');
		  const data = await response.json();
		  setDataSite(data);
		}
		fetchSites();
	}, []);

	useEffect(() => {
		async function fetchService() {
		  const response = await fetch(`http://localhost:3001/api/service/search?site=${searchSiteTerm}`);
		  const data = await response.json();
		  setDataService(data);
		}
		fetchService();
	}, [searchSiteTerm]);


	useEffect(() => {
		const getSearchResults = async () =>	 {
			const response = await fetch(`http://localhost:3001/api/search?nom=${searchTerm}&site=${searchSiteTerm}&service=${searchServiceTerm}`);
			const data = await response.json();
			setSearchResults(data);
		};

		getSearchResults();
	}, [searchServiceTerm, searchSiteTerm, searchTerm]);

	return (
		<div>
			<input
				className='input'
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			<select className='select select-bordered select-sm w-full max-w-xs' onChange={(e) => setSearchSiteTerm(e.target.value)}>
				<option value="none" selected>rechercher par site</option>
				{dataSite.map((site) => (
					<option key={site.NUM_SITE} value={site.NUM_SITE}> {site.VILLE}</option>
				))}
			</select>


			<select className='select select-bordered select-sm w-full max-w-xs' onChange={(e) => setSearchServiceTerm(e.target.value)}>
				<option value="none" selected>rechercher par service</option>
				{dataService.map((service) => (
					<option key={service.NUM_SERV} value={service.NUM_SERV}> {service.SERVICE}</option>
				))}
			</select>


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