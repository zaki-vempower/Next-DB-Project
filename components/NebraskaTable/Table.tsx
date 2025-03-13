/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";
// import SortIcon from "../../assets/SortIcon";
// import { ObType } from "../../types/attorney";
import Loader from "@/lib/Loader/Loader";
// import { isEven } from "../../utils/apiUtil";
import { getCols, getRows } from "./RenderRows";
// import Loader from "../Loader/Loader";
import SortIcon from "@/lib/SortIcon";
// import { isEven } from "@/lib/utils/apiUtil";
import { JSX } from "react";
import { isEven } from "@/lib/utils/apiUtils";
// import { COL_ATT } from "../../types/Columns";
type Tableprops = {
  rows: unknown[] | [] | unknown;
  columns: Array<unknown> | [];
  isLoading?: boolean;
  setSortColumn?: React.Dispatch<
    React.SetStateAction<{
      columnName: null | string;
      sortType: "asc" | "desc" | undefined;
    }>
  >;
  tableHeader?: string;
  tableHeight?: string;
  headerBg?: string;
  headerColor?: string;
  tableHeaderText?: boolean;
  sortIconColor?: string;
  tableId?: string;
};

export default function NBTable({
  rows = [],
  columns = [],
  setSortColumn,
  tableHeader = "My Case List",
  tableHeight = "h-[25rem]",
  headerBg = "bg-white text-[#fff]",
  headerColor = "text-[#fff]",
  sortIconColor = "#ffff",
  isLoading = false,
  tableHeaderText = true,
  tableId = 'nbtable'
}: Tableprops) {
  return (
    <>
      {tableHeaderText && (
        <div className="flex flex-row justify-between h-[12%]">
          <h3 className="text-xl font-semibold">{tableHeader}</h3>
          <div className="text-lg font-semibold text-[#dd2801]">
          </div>
        </div>
      )}
      <div className={`relative overflow-x-auto mt-5`}>
        <table className={`w-full text-sm text-left rtl:text-right`} id={tableId}>
          <thead className={`z-10 text-xs ${headerBg}`}>
            <tr>
              {columns.map((it, i) => {
                if (it.renderHeaderComp) {
                  const getComponent = getCols(it, i, {
                    headerColor,
                    sortIconColor,
                    setSortColumn,
                  });
                  return <>{getComponent}</>;
                }
                return (
                  <th scope="col" className={`px-2 py-[1%] ${it.columnWidth}`} key={it['key'] + '-thead-' + i}>
                    <div className={`flex gap-x-2 items-center ${headerColor}`}>
                      <h5 className={`text-base font-bold ${headerColor}`}>
                        {it?.header_name}
                      </h5>
                      {/* <img
                    src="sort-icon.svg"
                    className="up-down-icon cursor-pointer"
                    onClick={() => setSortColumn(prev => ({
                      ...prev,
                      columnName: prev.columnName === it.key ? null : it.key
                    }))}
                  /> */}
                      {
                        (!("disableSortIcon" in it) || it?.disableSortIcon === false) && <SortIcon
                          className="up-down-icon cursor-pointer"
                          fill={sortIconColor}
                          width="16px"
                          height="16px"
                          sortId={it.key ?? 'sortKey'}
                          divProps={{
                            onClick: () =>
                              setSortColumn((prev) => ({
                                ...prev,
                                columnName: it.key === undefined ? null : it.key,
                                sortType:
                                  prev?.sortType === "asc" && it.key === prev.columnName ? "desc" : "asc",
                              })),
                          }}
                        />
                      }
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          {isLoading ? (
            <tbody className="w-full h-[200px] overflow-y-scroll  border-t border-[#7184b0]" key={"loadingBodyKey"}>
              <tr className="flex flex-row h-full justify-center w-100 items-center">
                <td><Loader /></td>
              </tr>
            </tbody>
          ) : (
            // <tbody className="w-full h-[83%] overflow-y-scroll border-b border-[#f2f2f2]">
            <tbody className={`w-full overflow-y-scroll border-b border-[#f2f2f2] ${tableHeight}`}
              key={'tbodyKey'}>
              {
                Array.isArray(rows) && rows.length === 0 && (
                  <>
                    <tr
                      className="bg-[#ECEFF3] border-y border-[#7184b0] w-full h-11 flex justify-start items-center pl-10 py-10"
                      key="noResults"
                    >
                      <td colSpan={100} className="text-left">No Results</td>
                    </tr>
                  </>
                )
              }
              {Array.isArray(rows) && rows.length > 0 &&
                rows.map((it, i: number) => {
                  const arr: JSX.Element[] = [];
                  columns.forEach((col, col_i) => {
                    const getRenderedRows = getRows(col, it, i, col_i);
                    arr.push(getRenderedRows);
                  });

                  // console.log("vfvf", arr);
                  return (
                    <tr className={`${!isEven(i) ? "bg-[#ECEFF3] border-y border-[#7184b0] " : "bg-[#fff]"
                      } h-7 px-6 py-[1%]`} key={i}>
                      {arr}
                    </tr>
                  );
                })}
              {/* <tr className="">
           <th
             scope="row"
             className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
           >
             Microsoft Surface Pro
           </th>
           <td className="px-6 py-4">White</td>
           <td className="px-6 py-4">Laptop PC</td>
           <td className="px-6 py-4">$1999</td>
           <td className="px-6 py-4">
             <a
               href="#"
               className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
             >
               Edit
             </a>
           </td>
         </tr> */}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}
