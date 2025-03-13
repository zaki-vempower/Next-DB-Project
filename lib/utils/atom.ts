import { atom } from "jotai"

export const userAtom = atom<Record<any, any> | null>(null);
export const currentPageAtom = atom(1)
export const currentCases = atom<any[]>([])
export const sortBy = atom<{
    columnName: null | string;
    sortType: "asc" | "desc" | undefined;
} | null>(null)

export const  searchAtom = atom<string | undefined>('')

export const  filteredAtom = atom<string | undefined>(undefined)

export const alertDialogAtom = atom({
    open: false,
    textMessage: '',
    alertTitle: ''
})

export const caseDialogAtom = atom({
    open: false,
    caseName: '',
})

export const keyWordAtom = atom<{
    open: boolean,
    keyWords: string,
    editable?: boolean
}>({
    open: false,
    keyWords: '',
    editable: false
})


export const CustomUploadMeta = atom([])


export const progressFile = atom<{
    FileName: string | null,
    progress: number;
    status?: 'success' | 'pending' | 'failed'
}>({
    FileName: null,
    progress: 0,
    status: undefined
})

export const progressFiles =  atom<{
    FileName: string | null,
    progress: number,
    status?: 'success' | 'pending' | 'failed' | 'progress'
}[]>([])


export const timeUpdateAtom = atom(0)
export const sortTable = atom<'asc' | 'desc'>('desc')
export const locationAtom = atom(() => {
    if (typeof window === "undefined") return new URLSearchParams(); // Prevent SSR issues
    return new URLSearchParams(window.location.search);
  });
  // export const editorAtom = atom<ClassicEditor | undefined>(undefined)
export const loadingDialogAtom = atom(false)
export const sectionDialogAtom = atom<any[]>([])
export const indexSectionAtom = atom(
    (get) => get(sectionDialogAtom).length > 0 ? get(sectionDialogAtom).length : 0
  )
export const selectedSectionAtom = atom<{
    onCLick: (val: any) => void,
    label: string
    indexValue: number
    selectedVal?: string
}>({
    label: 'Section 1',
    onCLick: () => undefined,
    indexValue: 0,
    selectedVal: 'new'
})

export const alertEditorAtom = atom<{
    open: boolean
    textMessage: string
    alertTitle: string
    indexValue: number
    timeStamp?: number
}>({
    open: false,
    textMessage: '',
    alertTitle: '',
    indexValue: 0,
    timeStamp: undefined
})

// export const sectionMetaData = atom<SectionMetaType | undefined>(undefined)
// export const timeUpdateListAtom = atom<number[]>([])
// export const sectionMetaDataList = atom<SectionMetaType[]>([])