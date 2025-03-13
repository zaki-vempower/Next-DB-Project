const Truckscolumns = [
    {
        header_name: "ID",
        key: "id",
        tdClass: "px-2 py-4",
        columnWidth: "w-10",
        renderer: ({ row }: { row: any }) => <span>{ row.id } </span>,
    },
    {
        header_name: "Reference",
        key: "ref",
        tdClass: "px-4 py-2",
        renderer: ({ row }: { row: any }) => <span>{ row.ref } </span>,
    },
    {
        header_name: "Carrier ID",
        key: "carrier_id",
        tdClass: "px-4 py-2",
        renderer: ({ row }: { row: any }) => <span>{ row.carrier_id } </span>,
    },
    {
        header_name: "Equipment Type",
        key: "equipment_type_id",
        tdClass: "px-4 py-2",
        renderer: ({ row }: { row: any }) => <span>{ row.equipment_type_id } </span>,
    },
    {
        header_name: "City",
        key: "city",
        tdClass: "px-4 py-2",
        renderer: ({ row }: { row: any }) => <span>{ row.city ?? "N/A" } </span>,
    },
    {
        header_name: "State",
        key: "state",
        tdClass: "px-4 py-2",
        renderer: ({ row }: { row: any }) => <span>{ row.state ?? "N/A" } </span>,
    },
    {
        header_name: "Available Date",
        key: "available_date",
        tdClass: "px-4 py-2",
        renderer: ({ row }: { row: any }) => (
            <span>{ new Date(row.available_date).toLocaleDateString() } </span>
        ),
    },
    {
        header_name: "Truck Count",
        key: "truck_count",
        tdClass: "px-4 py-2",
        renderer: ({ row }: { row: any }) => <span>{ row.truck_count } </span>,
    },
    {
        header_name: "Active",
        key: "active",
        tdClass: "px-4 py-2",
        renderer: ({ row }: { row: any }) => (
            <span className= { row.active ? "text-green-500" : "text-red-500" } >
            { row.active ? "Active" : "Inactive" }
            </span>
      ),
    },
{
    header_name: "Phone",
        key: "phone_number",
            tdClass: "px-4 py-2",
                renderer: ({ row }: { row: any }) => <span>{ row.phone_number ?? "N/A" } </span>,
},
{
    header_name: "Email",
        key: "email",
            tdClass: "px-4 py-2",
                renderer: ({ row }: { row: any }) => <span>{ row.email ?? "N/A" } </span>,
},
{
    header_name: "Destination",
        key: "destination",
            tdClass: "px-4 py-2",
                renderer: ({ row }: { row: any }) => <span>{ row.destination ?? "N/A" } </span>,
},
  ];

export default Truckscolumns
