import { useState, useEffect } from 'react'
import { NextPage } from "next";
import React from 'react'
import Tabs from "@/components/tabs";
import { useRouter } from 'next/router';

const AdminServices:NextPage = () => {
	const router = useRouter();
	const [data, setData] = useState([]);
	const [sitesData, setSitesData] = useState([]);
	
	useEffect(() => {
		async function fetchUsers() {
			const response = await fetch('http://localhost:3001/api/service');
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


	function updateData(index, field, value) {
		const newData = [...data];
		if(field === "NUM_SITE") {			
			newData[index][field] = parseInt(value);	
		} else {
			newData[index][field] = value;
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
		newData.push({ NUM_SERV: null, SERVICE: '', NUM_SITE: 1 });
		setData(newData);
	}

	async function saveData() {
		fetch('http://localhost:3001/api/service/save', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(response => {
			if (!response.ok) {
				alert("Attention :\n Au moins un salarié est lié au service, modifier l'affectation des salariés en conséquences. \n Aucune modification sauvegardée");
			} else {
				alert('Les données ont été sauvegardées !');
			}
			router.reload();
		})
		.catch(error => {
			alert('Une erreur est survenue lors de la requête : ' + error.message);
		});
	}


	if (!data) return <h2>Loading...</h2>
	return (

		<>
			<div className="container mx-auto" style={{borderBottom: "1px solid gray;"}}>
				<div className="flex justify-center bg-base-100">
					<Tabs page={"services"} />
				</div>
			</div>
		
		
			<div className="container mx-auto">
				<div className="flex justify-center bg-base-100">
					<div className="flex bg-base-100">
						<div className="flex-none">
							<table className="table w-full">
								<thead>
									<tr>
										<th style={{ textAlign: 'center' }}>service</th>
										<th style={{ textAlign: 'center' }}>site</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{data.map((row, index) => (
										<tr key={index}>
											<td style={{ textAlign: 'center' }}><input type="text" style={{ textAlign: 'center' }} className="input w-full max-w-xs input-bordered" value={row.SERVICE} onChange={(e) => updateData(index, 'SERVICE', e.target.value)} /></td>




											<td style={{ textAlign: 'center' }}>
												<select className="select" onChange={(e) => updateData(index, 'NUM_SITE', e.target.value)}>
													{sitesData.map((site) => (
														<option key={site.NUM_SITE} value={site.NUM_SITE} selected={site.NUM_SITE == row.NUM_SITE}> {site.VILLE} / {site.TYPE} </option>
													))}
												</select>
											</td>




											<td style={{ textAlign: 'center' }}><button className='btn' onClick={() => deleteRow(index)}>Supprimer</button></td>
										</tr>
									))}
								</tbody>
								<tfoot>
									<tr>
										<th style={{ textAlign: 'center' }}><button className='btn' onClick={() => saveData()}>Enregistrer</button></th>
										<th style={{ textAlign: 'center' }}><button className='btn' onClick={() => addRow()}>Ajouter</button></th>
										<th></th>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AdminServices;