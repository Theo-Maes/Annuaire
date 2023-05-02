import Sidebar from "@/components/SideBar";
import { useState, useEffect } from 'react'
import { NextPage } from "next";
import React from 'react'
import Link from "next/link";


const AdminIndex:NextPage = () => {
	return (
		<div className="flex">
			<div className="flex-none">
				<ul  className="menu bg-base-100 w-56 rounded-box" >
					<li className="hover-bordered" key='sites'>
						<Link href='/admin/sites'> sites </Link>
					</li>
					<li className="hover-bordered" key='services'>
						<Link href='/admin/services'> services </Link>
					</li>
					<li className="hover-bordered" key='salarie'>
						<Link href='/admin/salarie'> salarie </Link>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default AdminIndex;