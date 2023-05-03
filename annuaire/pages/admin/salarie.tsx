import { useState, useEffect } from 'react'
import { NextPage } from "next";
import React from 'react'
import Tabs from '@/components/tabs';


const AdminSalarie:NextPage = () => {
	const [data, setData] = useState([]);
	const [sitesData, setSitesData] = useState([]);
	const [servicesData, setServicesData] = useState([]);
	
	useEffect(() => {
		async function fetchUsers() {
			const response = await fetch('http://localhost:3001/api/salarie');
			const data = await response.json();
			setData(data)
		}
		fetchUsers();
	}, [])

	useEffect(() => {
		async function fetchSites() {
		  const response = await fetch('http://localhost:3001/api/site');
		  const data = await response.json();
		  setSitesData(data);
		}
		fetchSites();
	}, []);

	useEffect(() => {
		async function fetchService() {
		  const response = await fetch('http://localhost:3001/api/service');
		  const data = await response.json();
		  setServicesData(data);
		}
		fetchService();
	}, []);

	function updateData(index, field, value) {
		const newData = [...data];
		if(field === "NUM_SITE") {			
			newData[index][field] = parseInt(value);
		} else {
			if(field === "NUM_SERV") {
				newData[index][field] = parseInt(value);
			} else {
				newData[index][field] = value;
			}
		}
		setData(newData);
	}

	function deleteRow(index) {
		const newData = [...data];
		newData.splice(index, 1);
		setData(newData);
	}

	function addRow() {
		const newData = [...data];
		newData.push({ id: null, NOM: '', PRENOM: '', TELEPHONE_FIXE: null, TELEPHONE_PORTABLE: '', EMAIL: '', NUM_SERV: null, NUM_SITE: null });
		setData(newData);
	}

	async function saveData() {
		fetch('http://localhost:3001/api/salarie/save', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		
		alert('Les données ont été sauvegardées !');
	}


	if (!data) return <h2>Loading...</h2>
	return (
		<>
		<div className="container mx-auto">
			<div className="flex justify-center">
				<Tabs page={"salaries"} />
			</div>
		</div>

		<div className="flex" style={{borderBottom: "1px solid gray;"}}>
				<form onSubmit={saveData}>
					<div className="flex-none">
						<table className="table table-compact w-full">
							<thead>
								<tr>
									<th style={{ width: '500px', textAlign: 'center' }}>nom</th>
									<th style={{ width: '500px', textAlign: 'center' }}>prenom</th>
									<th style={{ width: '150px', textAlign: 'center' }}>téléphone fixe</th>
									<th style={{ width: '150px', textAlign: 'center' }}>téléphone portable</th>
									<th style={{ width: '500px', textAlign: 'center' }}>email</th>
									<th style={{ width: '500px', textAlign: 'center' }}>site</th>
									<th style={{ width: '500px', textAlign: 'center' }}>service</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{data.map((row, index) => (
									<tr key={index}>
										<td style={{ textAlign: 'center' }}><input type="text" style={{ textAlign: 'center', textTransform: 'uppercase' }} className="input w-full max-w-xs input-bordered" value={row.NOM} onChange={(e) => updateData(index, 'NOM', e.target.value)} required /></td>
										<td style={{ textAlign: 'center' }}><input type="text" style={{ textAlign: 'center', textTransform: 'capitalize' }} className="input w-full max-w-xs input-bordered" value={row.PRENOM} onChange={(e) => updateData(index, 'PRENOM', e.target.value)} required /></td>
										<td style={{ textAlign: 'center' }}><input type="tel" pattern="[0-9]{10}" style={{ textAlign: 'center' }} className="input w-full max-w-xs input-bordered" value={row.TELEPHONE_FIXE} onChange={(e) => updateData(index, 'TELEPHONE_FIXE', e.target.value)} /></td>
										<td style={{ textAlign: 'center' }}><input type="tel" pattern="[0-9]{10}" style={{ textAlign: 'center' }} className="input w-full max-w-xs input-bordered" value={row.TELEPHONE_PORTABLE} onChange={(e) => updateData(index, 'TELEPHONE_PORTABLE', e.target.value)} required /></td>
										<td style={{ textAlign: 'center' }}><input type="email" style={{ textAlign: 'center' }} className="input w-full max-w-xs input-bordered" value={row.EMAIL} onChange={(e) => updateData(index, 'EMAIL', e.target.value)} required /></td>

										<td style={{ textAlign: 'center' }}>
											<select className='select select-bordered select-sm w-full max-w-xs' onChange={(e) => updateData(index, 'NUM_SITE', e.target.value)} required>
												<option disabled selected>choisir un site</option>
												{sitesData.map((site) => (
													<option key={site.NUM_SITE} value={site.NUM_SITE} selected={site.NUM_SITE == row.NUM_SITE}> {site.VILLE} / {site.TYPE} </option>
												))}
											</select>
										</td>

										<td style={{ textAlign: 'center' }}>
											<select id={index} className='select select-bordered select-sm w-full max-w-xs' onChange={(e) => updateData(index, 'NUM_SERV', e.target.value)} required>
												<option selected disabled>choisir un service</option>
												{servicesData.filter(service => service.NUM_SITE === row.NUM_SITE).map((service) => (
													<option key={service.NUM_SERV} value={service.NUM_SERV} selected={service.NUM_SERV == row.NUM_SERV}> {service.SERVICE} </option>
												))}
											</select>
										</td>

										<td style={{ textAlign: 'center' }}><button className='btn' onClick={(e) => { deleteRow(index); e.preventDefault(); } }>Supprimer</button></td>
									</tr>
								))}
							</tbody>
							<tfoot>
								<tr>
									<th></th>
									<th></th>
									<th style={{ textAlign: 'center' }}><button type="submit" className='btn'>Enregistrer</button></th>
									<th></th>
									<th></th>
									<th style={{ textAlign: 'center' }}><button className='btn' onClick={(e) => { addRow(); e.preventDefault(); } }>Ajouter</button></th>
									<th></th>
									<th></th>
								</tr>
							</tfoot>
						</table>
					</div>
				</form>
			</div>
			</>
		
	);
}

export default AdminSalarie;