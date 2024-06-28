import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const [data, setData] = useState([])
    const [deleted, setDeleted] = useState(true)
    useEffect(()=>{
        if(deleted){
            setDeleted(false)
        axios.get('/applications')
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>console.log(err))
    }
    }, [deleted])

    function handleDelete(id){
        axios.delete(`/delete/${id}`)
        .then((res)=>{
            setDeleted(true)
        })
        .catch((err)=> console.log(err))
    }
  return (
    <div class='text-white font-thin h-screen w-100 bg-gray-900 px-5 py-5'>
        <div class='text-lg flex justify-between my-3 '>
        		<h3 class="text-6xl">Applications</h3>
						<div class=" px-5 py-10 my-2 flex flex-col justify-center items-center px-5 py-3 bg-gray-700 rounded-full">
					<p >Total applied</p>
					<div class="text-[50px] my-2">{data.length}</div>
				
				</div>
            <Link class='rounded-lg shadow-black bg-green-600 shadow-lg hover:-translate-y-2 transition px-5 py-3 mx-3' to='/create'>New Application</Link>
						
        </div>
			<div class="flex flex-col justify-center">
				<table class="rounded-lg bg-gray-800">
					<thead class="">
						<tr>
							<th class="p-5" >#</th>
							<th class="p-5" >Date</th>
							<th class=" text-left" >Title</th>
							<th class=" text-left" >Company</th>
							<th class=" text-left" >location</th>
							<th class=" text-center" >Offer</th>
							<th class=" text-center" >Actions</th>
						</tr>
					</thead>
					<tbody class='bg-gray-700'>
						{
							data.map((variable, index)=>{
								return (<tr class="m-2">
									<td class="text-center border-gray-900 border-l px-2" >{index + 1}</td>
									<td class="text-center border-gray-900 border-l px-2" >{variable.date}</td>
									<td class="text-left border-gray-800  px-2 " >{variable.title}</td>
									<td class="text-left " >{variable.company}</td>
									<td class="text-left " >{variable.location}</td>
									<td class="text-center " >{variable.offer}</td>
									<td class="text-end" >
										<Link class='text-white rounded-lg shadow-black bg-blue-600 px-1 py-1 m-1' to={`/read/${variable.id}`}>Read</Link>
										<Link class='text-white rounded-lg shadow-black bg-pink-600 px-1 py-1 m-1' to={`/edit/${variable.id}`}>Edit</Link>
										<button class='text-white rounded-lg shadow-black bg-red-600 px-1 py-1 m-1' onClick={()=>handleDelete(variable.id)}>Delete</button>
									</td>
								</tr>)
							})
						}

					</tbody>
				</table>
			</div>
    </div>
  )
}

export default Home
