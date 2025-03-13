import { ObType } from "../../types/attorney"
import { JSX } from "react/jsx-runtime";
import { LinkTO } from "./Link";



type CASE_NAME_RENDER = JSX.IntrinsicAttributes & { row: ObType; col: { header_name: string; key: keyof ObType; tdClass: string; }; rowKey: keyof ObType | undefined; i: number; }
type CASEN_REDERER = JSX.IntrinsicAttributes & { row: ObType; col: { header_name: string; key: keyof ObType; tdClass: string; }; rowKey: keyof ObType | undefined; i: number; }
export const SRL_COLUMN = [
    {
      "header_name": "Case Id",
      "key": "case_number",
      "tdClass": "px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-hex-blue underline underline-offset-1 cursor-pointer",
      "renderer" : (props: CASEN_REDERER) => <LinkTO {...props} /> 
    },
    {
      "header_name": "Case Name",
      "key": "case_name",
      "tdClass": "px-6 py-4 text-hex-blue underline underline-offset-1 cursor-pointer",
      "renderer" : (props: CASE_NAME_RENDER) => <LinkTO {...props} rowKey="case_number" /> 
    },
    {
      "header_name": "Case Type",
      "key": "case_category",
      "tdClass": "px-6 py-4"
    },
    {
      "header_name": "Court Type",
      "key": "court_type",
      "tdClass": "px-6 py-4"
    },
    {
      "header_name": "County Name",
      "key": "county_name",
      "tdClass": "px-6 py-4"
    },
    {
      "header_name": "Case Year",
      "key": "case_year",
      "tdClass": "px-6 py-4"
    },
    {
      "header_name": "Total Documents",
      "key": "total_documents",
      "tdClass": "px-6 py-4 text-center"
    },
]