import Link from 'next/link';

export default function Sidebar({ page }) {
	const menuItems = [
		{ class: page === "sites" ? 'active' : '', label: 'sites', href:"/admin/sites" },
		{ class: page === "services" ? 'active' : '', label: 'services', href:"/admin/services" },
		{ class: page === "salarie" ? 'active' : '', label: 'salarie', href:"/admin/salarie" },
	  ];
  
	return (
		<ul className="menu bg-base-100 w-56 rounded-box" >
			{menuItems.map((item) => (
				<li className="hover-bordered" key={item.href}>
					<Link className={item.class} href={item.href}>
						{item.label}
					</Link>
				</li>
			))}
		</ul>
	);
}