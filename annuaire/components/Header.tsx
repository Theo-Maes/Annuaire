import Link from "next/link";
import Image from "next/image";
import image1 from "../public/home-page.png";

export const Header:React.FC = () => {
	const menuItems = [
		{ label: 'site', href:"/admin/sites" },
		{ label: 'service', href:"/admin/services" },
		{ label: 'salarié', href:"/admin/salarie" },
	  ];

	return <header className="navbar bg-base-100" style={{ borderBottom: '2px solid gray' }}>
		<div className="navbar-start px-3">
			<Link href="/">
				<Image src={image1} style={{ objectFit: "contain", width: '50px' }} alt={"home image"}/>
			</Link>
		</div>

	</header>;
}