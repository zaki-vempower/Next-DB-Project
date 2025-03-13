import { Link } from "react-router-dom";
import { ObType } from "../../types/attorney";

export const LinkTO = ({
    row,
    col,
    rowKey,
    state,
  }: {
    row: ObType,
    col: {
      "header_name": string;
      "key": keyof ObType;
      "tdClass": string
    },
    rowKey: keyof ObType | undefined;
    state?: any
    i?: number;
  }) => {

    return <Link to={`/case/${typeof rowKey === 'string' ?  row[rowKey] :  row[col['key']]}`} state={{
        row: state
    }}  >{row[col['key']]}</Link>
  }