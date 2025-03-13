import SortIcon from "@/lib/SortIcon";
import React from "react";
// import SortIcon from "../../assets/SortIcon";

export function getRows(col: any, row: any, i: number,col_i:number) {
  if (col.renderer) {
    const GetRenderedRow = col.renderer({ row, i, col, col_i });

    return (
      <td
        scope="row"
        key={col.key + i}
        className={`${col.tdClass} ${col.columnWidth ? col.columnWidth : ""}`}
      >
        {GetRenderedRow}
      </td>
    );
  }

  if (col.type === "string" || col.type === "number") {
    return (
      <td
        scope="row"
        key={col.key + i}
        className={`${col.tdClass} ${col.columnWidth ? col.columnWidth : ""}`}
      >
        {row[col["key"]]}
      </td>
    );
  }

  if (typeof row[col["key"]] === "boolean") {
    const convertToString = row[col["key"]].toString();
    return (
      <td
        scope="row"
        key={col.key + i}
        className={`${col.tdClass} ${col.columnWidth ? col.columnWidth : ""}`}
      >
        {convertToString}
      </td>
    );
  }

  return (
    <td
      scope="row"
      key={col.key + i}
      className={`${col.tdClass} ${col.columnWidth ? col.columnWidth : ""}`}
    >
      {row[col["key"]]}
    </td>
  );
}

export function getCols(
  col: any,
  i: number,
  options: {
    sortIconColor?: string;
    headerColor?: string;
    setSortColumn: React.Dispatch<
      React.SetStateAction<{
        columnName: null | string;
        sortType: "asc" | "desc" | undefined;
      }>
    >;
  }
) {
  const { headerColor = "", setSortColumn, sortIconColor } = options;
  if (col.renderHeaderComp) {
    const GetRenderedRow = col.renderHeaderComp({ col, i });

    return (
      <th
        scope="col"
        className={`px-6 py-[1%] text-base ${col.columnWidth}`}
        key={i}
      >
        {GetRenderedRow}
      </th>
    );
  }

  return (
    <>
      <th scope="col" className={`px-6 py-[1%] ${col.columnWidth}`} key={i}>
        <div className={`flex gap-x-2 items-center ${headerColor}`}>
          <h5 className={`text-xs ${headerColor}`}>{col?.header_name}</h5>
          {/* <img
            src="sort-icon.svg"
            className="up-down-icon cursor-pointer"
            onClick={() => setSortColumn(prev => ({
              ...prev,
              columnName: prev.columnName === it.key ? null : it.key
            }))}
          /> */}
          <SortIcon
            className="up-down-icon cursor-pointer"
            fill={sortIconColor}
            width="16px"
            height="16px"
            divProps={{
              onClick: () =>
                setSortColumn((prev: any) => ({
                  ...prev,
                  columnName: col.key === undefined ? null : col.key,
                  sortType:
                    prev.sortType === undefined
                      ? prev?.columnName === col.key
                        ? "desc"
                        : "asc"
                      : undefined,
                })),
            }}
          />
        </div>
      </th>
    </>
  );
}
