import React from "react";
import { COL_ATT } from "../../../types/Columns";
import { CaseFileType } from "../../../types/attorney";
import DocumentFile from "../../Case/DocumentFile";
import ExhibitSelect from "../../Case/ExhibitSelect";
import SelectAll from "../../Case/SelectAll";
import { cancelUpload } from "../../../services/exhibit";
import DecisionComponent from "../../Case/DecisionComponent";
import StatusComponent from "../../Case/StatusComponent";
import { user } from "../../../types/user";
import ExhibitComponent from "../../Case/ExhibitComponent";
import ActionsColumn from "../../Modal/ActionsColumn";
import CasePartyRow from "../../Case/CasePartyRow";
import { extractNameParts } from "../../../utils/utils";

type sortCOl = React.Dispatch<
  React.SetStateAction<{
    columnName: null | string;
    sortType: "asc" | "desc" | undefined;
  }>
>;

export const CASE_COLUMN = (
  setDecisionModal: (params: CaseFileType, status: string) => void,
  setRTRModal: React.Dispatch<CaseFileType | any>,
  setHistoryModal: (
    params: CaseFileType,
    isAction: boolean,
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void,
  upload_progress: number,
  data: CaseFileType[],
  setSortColumn: sortCOl,
  user: user | null | undefined,
  setEditIcon?: any,
  setDeleteIcon?: any,
  openExhibitFolderModal?: any
): Array<COL_ATT> => {
  const columns = [
    {
      header_name: "",
      key: "id",
      tdClass: "px-2 py-4",
      colClass: "text-[#0000]",
      columnWidth: "w-10",
      renderHeaderComp: ({ col }: { col: any }) => (
        <SelectAll col={col} data={data} setSortColumn={setSortColumn} />
      ),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      renderer: ({ row, i }) => (
        <ExhibitSelect row={row} key={row?.case_number + i} i={i} />
      ),
    },
    {
      header_name: "Document/Title",
      key: "exhibit_name",
      tdClass: "px-6 py-1",
      // columnWidth: "w-[30%]",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      renderer: ({ row, col, i }) => <DocumentFile row={row} col={col} i={i} />,
    },
    {
      header_name: "Brief Description",
      key: "description",
      tdClass: "px-6 py-4",
      // columnWidth: "w-[35%]",
      renderer({ row }: { row: any }) {
        const aRow = row;
        return (
          <div title={aRow.description}>
            <h5 className="text-sm truncate">{aRow.description}</h5>
          </div>
        );
      },
    },
    {
      header_name: "Owner/Party",
      key: "uploaded_by_party",
      tdClass: "px-6 py-4",
      renderer: ({ row }: { row: any }) => <CasePartyRow row={row} />,
    },
    {
      header_name: "Uploaded By",
      key: "uploaded_by",
      tdClass: "px-6 py-4",
      disableSortIcon: true,
      // columnWidth: "w-[13%]",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      renderer: ({ row }: { row: CaseFileType }) => {
      const getName = extractNameParts(row?.uploaded_by_fullname ?? '')
        return (
          <div title={getName.firstName + getName.lastName}>
          <h5 className="text-sm truncate">{getName.firstName + ' ' + getName?.lastNameInitial}</h5>
        </div>
        );
      },
    },
    {
      header_name: "Status",
      key: "status",
      tdClass: "px-3 py-4",
      renderer: ({ row }: { row: any }) => <StatusComponent row={row} />,
    },
    // {
    //   header_name: "Share status",
    //   key: "share_status",
    //   tdClass: "px-6 py-4",
    //   renderer({ row }: { row: any }) {
    //     const aRow = row;
    //     return (
    //       <div title={aRow.ShareStatus}>
    //         <h5 className="text-sm truncate">
    //           {aRow.ShareStatus ?? "Not Shared"}
    //         </h5>
    //       </div>
    //     );
    //   },
    // },
    {
      header_name: "Exhibit",
      key: "exhibit_number",
      tdClass: "px-10 py-4 ",
      renderer: ({ row }: { row: any }) => <ExhibitComponent row={row} />,
    },
    {
      header_name: "Actions",
      key: "proposed",
      tdClass: "px-6 py-4",
      disableSortIcon: true,
      // columnWidth: "w-[13%]",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      renderer: ({ row, i }: { row: any }) => {
        if (
          row.current_state === "uploading" &&
          upload_progress > 0 &&
          upload_progress < 100
        )
          return (
            <div className="w-24" key={i}>
              <div className="relative mb-5 h-2 w-20 inline-flex rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-red-500"
                  style={{ width: `${Math.floor(upload_progress)}%` }}
                ></div>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-900">
                  {`${Math.floor(upload_progress)}%`}
                </span>
              </div>
              <button
                className="bg-white px-1 inline-flex relative items-center justify-center float-right rounded-md text-sm text-red-500"
                onClick={cancelUpload}
              >
                x
              </button>
            </div>
          );
        return (
          <ActionsColumn
            exhibit={row}
            setDeleteIcon={setDeleteIcon}
            setEditIcon={setEditIcon}
            setHistoryModal={setHistoryModal}
            openExhibitFolderModal={openExhibitFolderModal}
          />
          // <img
          //   src={"/three-dots.svg"}
          //   className="h-5 cursor-pointer px-2"
          //   style={{ marginLeft: "-20px" }}
          //   key={i}
          //   onClick={(e) => setHistoryModal(row, true, e)}
          // />
        );
      },
    },
  ];

  if (user?.role === "judge" || user?.role === 'court reporter') {
    columns.push({
      header_name: "Decision",
      key: "decision",
      tdClass: "p-0",
      disableSortIcon: true,
      // columnWidth: "w-[13%]",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      renderer: ({ row, col, i }: { row: any }) => {
        return (
          <div className="flex justify-start">
            <DecisionComponent
              row={row}
              col={col}
              key={i}
              setDecisionModal={setDecisionModal}
              setRTRModal={setRTRModal}
            />
          </div>
        );
      },
    });
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return columns;
};
