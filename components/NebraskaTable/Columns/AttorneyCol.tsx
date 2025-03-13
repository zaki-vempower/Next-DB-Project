import { JSX } from "react/jsx-runtime";
import { LinkTO } from "../Link";
import { ObType } from "../../../types/attorney";
import { capitalizeFirstLetter } from "../../../utils/utils";

type CASE_NAME_RENDER = JSX.IntrinsicAttributes & {
  row: ObType;
  col: { header_name: string; key: keyof ObType; tdClass: string };
  rowKey: keyof ObType | undefined;
  i: number;
};
type CASEN_REDERER = JSX.IntrinsicAttributes & {
  row: ObType;
  col: { header_name: string; key: keyof ObType; tdClass: string };
  rowKey: keyof ObType | undefined;
  i: number;
};
export const ATT_COLUMN = () => [
  {
    header_name: "Case Id",
    key: "caseNumberId",
    tdClass:
      "px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-hex-blue underline underline-offset-1 cursor-pointer",
    renderer: (props: CASEN_REDERER) => (
      <LinkTO {...props} rowKey="case_number" state={props.row} />
    ),
  },
  {
    header_name: "Caption",
    key: "case_name",
    tdClass:
      "px-6 py-4 text-hex-blue underline underline-offset-1 cursor-pointer",
    renderer: (props: CASE_NAME_RENDER) => (
      <LinkTO {...props} rowKey="case_number" state={props.row} />
    ),
  },
  {
    header_name: "Case Type",
    key: "case_category",
    tdClass: "px-6 py-4",
    renderer: ({ row, col,i }: any) => {
      const caseType = capitalizeFirstLetter(row[col["key"]])
      return       <td
      scope="row"
      key={col.key + i}
      className={`${col.tdClass} ${col.columnWidth ? col.columnWidth : ""}`}
    >
      {caseType}
    </td>
    }
  },
  {
    header_name: "Court Type",
    key: "court_type",
    tdClass: "px-6 py-4",
  },
  {
    header_name: "County Name",
    key: "county_name",
    renderer: ({ row, col,i }: any) => {
      const countyName = capitalizeFirstLetter(row[col["key"]])
      return       <td
      scope="row"
      key={col.key + i}
      className={`${col.tdClass} ${col.columnWidth ? col.columnWidth : ""}`}
    >
      {countyName}
    </td>
    },
    tdClass: "px-6 py-4",
  },
  {
    header_name: "Case Year",
    key: "case_year",
    tdClass: "px-6 py-4",
  },
  // {
  //   "header_name": "Work Completed",
  //   "key": "total_documents",
  //   "disableSortIcon": true,
  //   "tdClass": "px-6 py-4 text-center",
  //   renderer: (props: CASEN_REDERER) => <WorkCompleted {...props} rowKey="total_documents" state={props.row} />
  // },
];
