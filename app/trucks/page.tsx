"use client"
import NBTable from "@/components/NebraskaTable/Table";
import Truckscolumns from "../api/trucks/columns";
// import {  useEffect, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardArrowLeft } from "react-icons/md";
import { useTrucksTableQuery } from "@/services/hooks/useTrucksTableQuery";



export default function TrucksPage() {
    // const [,setTrucks] = useState([])
    const {
        totalPages,
        handleChangePage,
        slicedData,
        currentPage,
        setSortBy,
        // isLoading
      } = useTrucksTableQuery()
    // useEffect(() => {
    //     fetch('/api/trucks/trucks')
    //     .then(response => response.json())
    //     .then(data => setTrucks(data))
    //     .catch(error => console.error('Error:', error));
    // },[])
    return (
        <div className="w-full flex flex-row justify-center">
        <div className="flex flex-col gap-4 justify-center items-center w-3/4">
            <NBTable
                rows={slicedData}
                columns={Truckscolumns}
                tableHeaderText={false}
                setSortColumn={setSortBy as any}
                tableHeader="Files and Folders"
                tableHeight="" //tableMediaQ class removed
                headerBg="bg-[#f2f2f2]"
                headerColor="text-gray-700"
                sortIconColor="#14181c"
                isLoading={false}
            />
            <div>
            <div className='mt-5 flex flex-row justify-center items-center w-full gap-x-2'>
                <MdKeyboardDoubleArrowLeft color='#2a4787' size="23" className='font-thin cursor-pointer' onClick={() => handleChangePage(1)} />
                <MdKeyboardArrowLeft color='#2a4787' size="23" className='font-thin cursor-pointer' onClick={() =>handleChangePage(currentPage !== 1 ? currentPage - 1 : 1)}/>
                <h3 className='text-trs-blue text-sm '>Page <span className='border border-trs-blue-light p-1 text-sm '>{currentPage}</span> of {totalPages}</h3>
                <MdKeyboardArrowRight color='#2a4787' size="23" className='font-thin cursor-pointer' onClick={() =>handleChangePage(currentPage + 1)} />
                <MdKeyboardDoubleArrowRight color='#2a4787' size="23" className='font-thin cursor-pointer' onClick={() => handleChangePage(totalPages)} />
            </div>
            </div>
        </div>
        </div>
    )
}
