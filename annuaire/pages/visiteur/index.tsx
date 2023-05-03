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
		<>
		<br />
		<div className="container mx-auto">
			<div className="flex justify-center">
				<div style={{border: "solid gray;"}}>
					<table className="table w-full">
						<tbody>
							<tr>
								<td>
									<input
										className='input input-bordered w-full max-w-xs'
										type="text"
										placeholder='Nom a rechercher'
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</td>
								<td>
									<select className='select select-bordered select-sm w-full max-w-xs' onChange={(e) => {
										setSearchSiteTerm(e.target.value);
										if (e.target.value === "none") {
											setSearchServiceTerm("none");
										}
									}}>
									
										<option value="none" disabled selected>rechercher par site</option>
										<option value="none">aucun</option>
										{dataSite.map((site) => (
											<option key={site.NUM_SITE} value={site.NUM_SITE}> {site.VILLE}</option>
										))}
									</select>	
								</td>
								<td>
									<select className='select select-bordered select-sm w-full max-w-xs' onChange={(e) => setSearchServiceTerm(e.target.value)}>
										<option value="none" disabled selected>rechercher par service</option>
										<option value="none">aucun</option>
										{dataService.map((service) => (
											<option key={service.NUM_SERV} value={service.NUM_SERV}> {service.SERVICE}</option>
										))}
									</select>
								</td>
								<td><button className='btn'>rechercher</button></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>

		<br />
		
			<div>
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
								<td style={{ textAlign: 'center' }}><a className='btn' href={`/visiteur/fiche?id=${result.NUM_SAL}`}>plus</a></td>
								
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default VisiteurIndex;