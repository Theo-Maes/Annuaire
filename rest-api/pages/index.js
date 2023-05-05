import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const endpoints = [
	{
		name: 'GET /type',
		description: 'Liste de tous les types',
	},
	{
		name: 'GET /site',
		description: 'Liste de tous les sites',
	},
	{
		name: 'GET /service',
		description: 'Liste de tous les services',
	},
	{
		name: 'GET /salarie',
		description: 'Liste de tous les salariés',
	},
	{
		name: 'POST /site/save',
		description: 'Sauvegarde des sites',
		parameters: [
			{ name: 'VILLE', description: '*required* Le nom de la ville' },
			{ name: 'NUM_TYPE', description: '*required* Le numéro du type auquel la ville est rattachée' },
			{ name: 'NUM_SITE', description: 'Le numéro du site' },
	  	],
	},
	{
		name: 'POST /service/save',
		description: 'Sauvegarde des services',
		parameters: [
			{ name: 'SERVICE', description: '*required* Le nom du service' },
			{ name: 'NUM_SITE', description: '*required* Le numéro du site auquel le service est rattaché' },
			{ name: 'NUM_SERV', description: 'Le numéro du service' },
		],
	},
	{
		name: 'POST /salarie/save',
		description: 'Sauvegarde des services',
		parameters: [
			{ name: 'NOM', description: '*required* Le nom du salarié' },
			{ name: 'PRENOM', description: '*required* Le prénom du salarié' },
			{ name: 'TELEPHONE_FIXE', description: 'Le numéro de téléphone fixe du salarié' },
			{ name: 'TELEPHONE_PORTABLE', description: '*required* Le numéro de téléphone portable du salarié' },
			{ name: 'EMAIL', description: '*required* L\'adresse mail du salarié' },
			{ name: 'NUM_SITE', description: '*required* Le numéro du site auquel le salarié est rattaché' },
			{ name: 'NUM_SERV', description: 'Le numéro du service auquel le salarié est rattaché' },
		],
	},
	{
		name: 'GET /service/search',
		description: 'Permet de récupèrer un service en fonction de son nom',
		parameters: [
			{ name: 'SERVICE', description: '*required* Le nom du service' },
		],
	},
	{
		name: 'GET /salarie/:id',
		description: 'Récupère un salariés en fonction de son Numéro',
		parameters: [
			{ name: 'NUM_SAL', description: '*required* Le numéro du salarié' },
		],
	},
	{
		name: 'GET /search',
		description: 'Permet de rechercher un salarié',
		parameters: [
			{ name: 'NOM', description: '*required* Le nom du salarié' },
			{ name: 'NUM_SITE', description: 'Le numéro du site' },
			{ name: 'SERVICE', description: 'Le nom du service' },
		],
	},
  ]

  return (
	<div className={styles.container}>
		<Head>
			<title>documentation API</title>
		</Head>

		<main className={styles.main}>
			<h1 className={styles.title}>REST API</h1>

			<p className={styles.description}>The documentation</p>

			<div className={styles.grid}>
			{endpoints.map((endpoint, index) => (
				<div className={styles.card} key={index}>
				<h2>
					<code>{endpoint.name}</code>
				</h2>
				<p>{endpoint.description}</p>
				{endpoint.parameters && (
					<>
					<br />
					<p>Parameters:</p>
					<ul>
						{endpoint.parameters.map((parameter, parameterIndex) => (
						<li key={parameterIndex}>
							<b>{parameter.name}</b>: {parameter.description}
						</li>
						))}
					</ul>
					</>
				)}
				</div>
			))}
			</div>
		</main>
	</div>
  )
}
