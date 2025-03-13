import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useMemo } from 'react';
import { getURLWithoutParams, sortByKey } from '@/lib/utils/utils';
// import { useSearchParams } from 'react-router-dom';
// import { useQuery } from 'react-query';
import { fetchTrucks } from '../fetchTrucks';
import { currentPageAtom, filteredAtom, sortBy, sortTable } from '@/lib/utils/atom';
import { useQuery } from '@tanstack/react-query';
// import { sortByKey } from '../../utils/';

const pageSize = 5;

export const useTrucksTableQuery = () => {
    const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
    const [filterAtom,setFilterAtom] = useAtom(filteredAtom)
    const sortType= useAtomValue(sortTable)
    // const setCurrentCases = useSetAtom(currentCases)
    const [sorted,setSortBy] = useAtom(sortBy)
    // const [searchParams] = useSearchParams()
    // const getCaseId = searchParams.get('caseid') ?? null
    

    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ['trucks'],
        queryFn: fetchTrucks
      })

    useEffect(() => {
        if( isSuccess) {
            // setFilterAtom(getCaseId)
            const { history, location } = window;
            if (history
              && location
              && history.length
              && typeof history.replaceState === 'function') {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const replacement = getURLWithoutParams(location);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              if (location !== replacement) {
                history.replaceState(
                  history.state,
                  document?.title || '',
                  replacement);
              }
            }
        }
    }, [, isSuccess, setFilterAtom])

    const filteredData = useMemo(() => {
        let tableData = data ?? []
        if(Array.isArray(data) && data?.length > 0 && (sorted?.columnName || sorted?.sortType || sortType)) {
            console.log('sorted',sorted?.columnName,sortType);
            
            tableData = sortByKey(data,sorted?.columnName ?? 'created_at',sorted?.sortType ?? sortType)      
        }
        if(Array.isArray(tableData) && filterAtom) {
            tableData = tableData.filter((cs) => cs?.case === filterAtom)
        }
        return tableData ?? data
    },[data, sorted?.columnName, sorted?.sortType, sortType, filterAtom])

    // const filterCaseData = useMemo(() => {
    //     if(Array.isArray(sortedData) && filterAtom) {
    //         return sortedData.filter((cs) => cs?.case === filterAtom)
    //     }
    //     return sortedData
    // },[filterAtom, sortedData])

    const slicedData = useMemo(() => {
        if(Array.isArray(filteredData)) {
            return filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        }
        return []
    },[currentPage, filteredData])   
    const totalPages = Array.isArray(filteredData) ? Math.ceil(filteredData.length / pageSize) : 1
        // console.log('currentData',currentData,totalPages);
    const handleChangePage = (newPage: number) => {
        if(newPage > totalPages || newPage < 1) return
        setCurrentPage(newPage);
      }

      return {
        totalPages: totalPages,
        handleChangePage,
        slicedData,
        filteredData,
        isLoading,
        currentPage,
        setSortBy
      }
}