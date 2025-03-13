import EditPartyExhibitRange from "../../Case/EditPartyExhibitRange"
import { COL_ATT } from "../../../types/Columns"
import { user } from "../../../types/user"
import EditPartInfo from "../../Case/EditPartInfo"



export const PARTY_INFO_COL = (user: user | null | undefined): COL_ATT[] => {
    const column_arr =  [
        {
            "header_name": "Party Name",
            "key": "party_role_desc",
            "disableSortIcon": true,
            "tdClass": "px-6 py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer",
            "renderer" : ({row}: {
              row: any
            }) => {
              return (
                <div title={row.PartyName ?? ''}>
                  {row?.PartyName  ? row?.PartyName + ' - ' + row?.party_role_desc : ''}
                </div>
              )
            } 
          },
          // {
          //   "header_name": "User",
          //   "key": "PartyEmail",
          //   "tdClass": "px-6 py-4 cursor-pointer",
          //   "disableSortIcon": true,
          //   // "renderer" : (props: CASE_NAME_RENDER) => <LinkTO {...props} rowKey="case_number" state={props.row} /> 
          // },
          {
            "header_name": "Exhibit Range",
            "key": "range",
            "tdClass": "px-6 py-4",
            "disableSortIcon": true,
            "renderer": ({
                col,
                row,
                col_i,
                i
            }: {
                row: any,
                col: any,
                i: number,
                col_i: number
            }) => <EditPartyExhibitRange row={row} col={col} key={col_i + i} />
          },
    ]

    if(user && user.role === 'court reporter') {
      column_arr.push(  {
        "header_name": "Actions",
        "key": "party_mail",
        "tdClass": "px-6 py-4",
        "disableSortIcon": true,
        renderer: ({col_i,i, ...props}: any) => <EditPartInfo {...props} key={col_i + i} />
      })
    }

    return column_arr
}