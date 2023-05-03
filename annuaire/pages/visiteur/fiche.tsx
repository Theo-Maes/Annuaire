import { useState, useEffect } from 'react'
import image1 from "../../public/photo.jpeg"
import { useRouter } from 'next/router'
import querystring from 'querystring'
import { NextPage } from "next";
import Image from "next/image"
import React from 'react'

const VisiteurFiche:NextPage = () => {
	const router = useRouter();
	const { id } = querystring.parse(router.asPath.split(/\?/)[1]);
	const [dataSalarie, setDataSalarie] = useState([]);

	useEffect(() => {
		async function fetchSalarie() {
		  const response = await fetch(`http://localhost:3001/api/salarie/${id}`);
		  const data = await response.json();
		  setDataSalarie(data);
		}
		fetchSalarie();
	}, [id]);

	
	return (
		<div style={{display:'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute',top: '25%', width: '100%'}}>
			{dataSalarie.map((result) => (
				<div key={result.NUM_SAL} class="card card-side bg-base-200 shadow-xl" style={{border: '1px solid gray'}}>
					<figure style={{borderRight: '1px solid gray', borderRadius: '10px'}}><Image src={image1} alt="Photo" /></figure>
					<div className="card-body">
						<h2 className="card-title">Fiche d'information</h2>
						<p>
							<table>
								<tbody>
									<tr>
										<td>Prénom:</td>
										<td>nom:</td>
									</tr>
									<tr>
										<td>{result.PRENOM}</td>
										<td>{result.NOM}</td>
									</tr>
									
									<tr>
										<td><br /></td>
									</tr>

									<tr>
										<td>Fixe:</td>
										<td>portable:</td>
									</tr>
									<tr>
										<td>{result.TELEPHONE_FIXE}</td>
										<td>{result.TELEPHONE_PORTABLE}</td>
									</tr>
									
									<tr>
										<td><br /></td>
									</tr>

									<tr>
										<td>Mail:</td>
									</tr>
									<tr>
										<td>{result.EMAIL}</td>
									</tr>

									<tr>
										<td><br /></td>
									</tr>
									
									<tr>
										<td>Service:</td>
										<td>Site:</td>
									</tr>
									<tr>
										<td>{result.SERVICE}</td>
										<td>{result.VILLE}</td>
									</tr>
								</tbody>
							</table>
						</p>

						<div className="card-actions justify-center">
							<a className='btn btn-primary' href='/visiteur'>retour</a>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default VisiteurFiche;