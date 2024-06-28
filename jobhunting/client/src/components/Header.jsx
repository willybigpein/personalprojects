"use client";

import CountUp from "react-countup";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
	return (
		<div class="text-lg flex sm:flex-col lg:flex-row justify-between items-center my-3 ">
			<h3 class="text-6xl">Applications</h3>
			<div class="h-10 p-20 my-2 flex flex-col justify-center items-center  bg-gray-700 rounded-full">
				<p>Total applied</p>
				<CountUp
					end={data.length}
					duration={5}
					delay={1}
					className="text-7xl font-extrabold"
				/>
			</div>
			<Link
				class="h-max rounded-lg font-extrabold shadow-black bg-green-600 shadow-lg hover:-translate-y-2 transition px-5 py-3 mx-3"
				to="/create"
			>
				New Application
			</Link>
		</div>
	);
};

export default Header;
