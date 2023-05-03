import { useState, useEffect } from 'react'
import { NextPage } from "next";
import React from 'react'
import Tabs from "@/components/tabs";
import { useRouter } from 'next/router';


const AdminSites:NextPage = () => {
	const router = useRouter();
	const [data, setData] = useState([]);
	const [typeData, setTypeData] = useState([]);
	
	useEffect(() => {
		async function fetchUsers() {
			const response = await fetch('http://localhost:3001/api/site');
			const data = await response.json();
			setData(data)
		}
		fetchUsers();
	}, [])

	useEffect(() => {
		async function fetchTypes() {
			const response = await fetch('http://localhost:3001/api/type');
			const data = await response.json();
			setTypeData(data);
		}
		fetchTypes();
	  }, []);


	  function updateData(index, field, value) {
		const newData = [...data];
		if(field === "NUM_TYPE") {			
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
		newData.push({ NUM_SITE: null, VILLE: null, NUM_TYPE: 1 });
		setData(newData);
	}

	async function saveData() {
		
		const response = fetch('http://localhost:3001/api/site/save', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(response => {
			if (!response.ok) {
				alert("Attention :\n Au moins un service est lié au site, modifier l'affectation des services en conséquences. \n Aucune modification sauvegardée");
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
					<Tabs page={"sites"} />
				</div>
			</div>
			

			<div className="container mx-auto">
				<div className="flex justify-center bg-base-100">
					<div className="container mx-auto">
						<div className="flex justify-center bg-base-100">
							<div className="flex bg-base-100">
								<div className="flex-none">
									<table className="table w-full">
										<thead>
											<tr>
												<th style={{ textAlign: 'center' }}>Ville</th>
												<th style={{ textAlign: 'center' }}>Fonction</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{data.map((row, index) => (
												<tr key={index}>
													<td style={{ textAlign: 'center' }}><input type="text" style={{ textAlign: 'center' }} className="input w-full max-w-xs input-bordered" value={row.VILLE} onChange={(e) => updateData(index, 'VILLE', e.target.value)} /></td>


													<td style={{ textAlign: 'center' }}>
														<select className="select" onChange={(e) => updateData(index, 'NUM_TYPE', e.target.value)}>
															{typeData.map((type) => (
																<option key={type.NUM_TYPE} value={type.NUM_TYPE} selected={type.NUM_TYPE == row.NUM_TYPE}> {type.TYPE} </option>
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
				</div>
			</div>
		</>
	);
}

export default AdminSites;