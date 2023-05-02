
export default function Sidebar({ page }) {
	const menuItems = [
		{ class: page === "sites" ? 'tab tab-lg tab-lifted tab-active' : 'tab tab-lg tab-lifted', label: 'sites', href:"/admin/sites" },
		{ class: page === "services" ? 'tab tab-lg tab-lifted tab-active' : 'tab tab-lg tab-lifted', label: 'services', href:"/admin/services" },
		{ class: page === "salaries" ? 'tab tab-lg tab-lifted tab-active' : 'tab tab-lg tab-lifted', label: 'salarie', href:"/admin/salarie" },
	  ];
  
	return (
        <div className="tabs tabs-boxed">
            {menuItems.map((item) => (
                <a key={item.href} className={item.class} href={item.href} >{item.label}</a>
            ))}
        </div>
	);
}