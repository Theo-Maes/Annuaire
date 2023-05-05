
export default function Sidebar({ page }) {
	const menuItems = [
		{ class: page === "sites" ? 'tab tab-lifted tab-active' : 'tab tab-lifted', label: 'Sites', href:"/admin/sites" },
		{ class: page === "services" ? 'tab tab-lifted tab-active' : 'tab tab-lifted', label: 'Services', href:"/admin/services" },
		{ class: page === "salaries" ? 'tab tab-lifted tab-active' : 'tab tab-lifted', label: 'Salariés', href:"/admin/salarie" },
	  ];
  
	return (
        <div className="tabs tabs-boxed">
            {menuItems.map((item) => (
                <a key={item.href} className={item.class} href={item.href} >{item.label}</a>
            ))}
        </div>
	);
}