import { CaseFileType } from "../../../types/attorney";
import DocumentFile from "../../Case/DocumentFile";
import ExhibitComponent from "../../Case/ExhibitComponent";
import StatusComponent from "../../Case/StatusComponent";

export const JURY_COLUMN = (caseData: any) => [
    // {
    //   header_name: "No.",
    //   key: "id",
    //   tdClass: "px-2 py-4",
    //   colClass: "text-[#0000]",
    //   columnWidth: "w-[20%]",
    // //   renderHeaderComp: ({ col }: { col: any }) => (
    // //     <SelectAll col={col} data={data} setSortColumn={setSortColumn} />
    // //   ),
    // //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // //   // @ts-ignore
    // //   renderer: ({ row, i }) => (
    // //     <ExhibitSelect row={row} key={row?.case_number + i} i={i} />
    // //   ),
    // },
    {
      header_name: "Document/Title",
      key: "exhibit_name",
      tdClass: "px-6 py-1",
      columnWidth: "w-[20%]",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      renderer: ({ row, col, i }) => <DocumentFile row={row} col={col} i={i} jury caseData={caseData} />,
    },
    {
      header_name: "Brief Description",
      key: "description",
      tdClass: "px-6 py-4",
      columnWidth: "w-[20%]",
      renderer({ row }: { row: any }) {
        const aRow = row;
        return (
          <div title={aRow.description}>
            <h5 className="text-sm truncate">{aRow.description}</h5>
          </div>
        );
      },
    },
    // {
    //   header_name: "Party Name",
    //   key: "party_name",
    //   tdClass: "px-6 py-4",
    //   renderer({ row }: { row: any }) {
    //     const aRow = row;
    //     return (
    //       <div title={aRow.description}>
    //         <h5 className="text-sm truncate">{aRow.uploaded_by_fullname}</h5>
    //       </div>
    //     );
    //   },
    // },
    {
      header_name: "Status",
      key: "status",
      tdClass: "px-10 py-4 ",
      columnWidth: "w-[20%]",
      renderer: ({ row }: { row: CaseFileType }) => (
        <StatusComponent row={row} />
      ),
    },
    {
      header_name: "Exhibit",
      key: "exhibit",
      tdClass: "px-10 py-4 ",
      columnWidth: "w-[20%]",
      renderer: ({ row }: { row: CaseFileType }) => (
        <ExhibitComponent row={row} />
      ),
    }
  ];