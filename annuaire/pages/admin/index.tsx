import Tabs from "@/components/tabs";
import { NextPage } from "next";
import React from 'react'


const AdminIndex:NextPage = () => {
	return (
			<>
				<div className="container mx-auto" style={{ borderBottom: "1px solid gray;" }}>
					<div className="flex justify-center">
						<Tabs page={null} />
					</div>
				</div>
			</>
	);
}

export default AdminIndex;