import SuspendAccess from "../../UserManagement/SuspendAccess"

export const userCol = () => {
    return [
        {
            "header_name": "Name",
            "key": "first_name",
            // "columnWidth": "w-[20%]",
            "tdClass": "px-3 py-4 font-medium text-gray-900 whitespace-nowrap text-hex-blue underline underline-offset-1 cursor-pointer",
            // "renderer" : (props: CASEN_REDERER) => <LinkTO {...props} rowKey="case_number" state={props.row} /> 
          },
        //   {
        //     "header_name": "email",
        //     "key": "email",
        //     "columnWidth": "w-[35%]",
        //     "tdClass": "px-3 py-4 font-medium text-gray-900 ",
        //     // "renderer" : (props: CASEN_REDERER) => <LinkTO {...props} rowKey="case_number" state={props.row} /> 
        //   },
          {
            "header_name": "Status",
            "key": "status",
            // "columnWidth": "w-[15%]",
            "tdClass": "px-3 py-4 font-medium text-gray-900 ",
            // "renderer" : (props: CASEN_REDERER) => <LinkTO {...props} rowKey="case_number" state={props.row} /> 
          },
          {
            "header_name": "Active",
            "key": "active",
            // "columnWidth": "w-[15%]",
            "tdClass": "px-3 py-4 font-medium text-gray-900 whitespace-nowrap",
            "renderer" : ({
                row, col,i
            }: any) => {
                return (
                    <div key={i}>
                        {row[col['key']] === true ? 'Yes' : 'No'}
                    </div>
                )

            }
          },
          {
            "header_name": "Suspend Access",
            "key": "susped",
            // "columnWidth": "w-[15%]",
            "tdClass": "px-[4%] py-4 font-medium text-gray-900 whitespace-nowrap",
            "renderer" : ({
                 col,i
            }: any) => {
                return <SuspendAccess
                //  row={row} col={col} 
                  key={i + col['key'] } />

            }
          },
    ]
}