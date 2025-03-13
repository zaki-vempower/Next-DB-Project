export const isEven = (num: number) => (num + 1) % 2 === 0;

interface DynamoDBItem {
    [key: string]: {
        S?: string;
        N?: string;
        BOOL?: boolean;
        [key: string]: string | boolean | undefined; // Index signature to allow dynamic keys
    };
}

type NormalObject = Record<string, string | boolean | number | undefined>;

export function unmarshallDynamoDBItem(dynamoDBItem: DynamoDBItem): NormalObject {
    const normalObject: NormalObject = {};

    for (const key in dynamoDBItem) {
        if (Object.prototype.hasOwnProperty.call(dynamoDBItem, key)) {
            const attribute = dynamoDBItem[key];
            const attributeType = Object.keys(attribute)[0];
            const attributeValue = attribute[attributeType];

            switch (attributeType) {
                case 'S':
                    normalObject[key] = attributeValue;
                    break;
                case 'N':
                    normalObject[key] = Number(attributeValue);
                    break;
                case 'BOOL':
                    normalObject[key] = attributeValue === 'true'; // Adjust as needed
                    break;
                // Add other cases for different types if necessary
                default:
                    normalObject[key] = attributeValue as string | undefined;
            }
        }
    }

    return normalObject;
}

/**
 * Description
 * @param {Date} currentDate:Date
 * @param {Date} expDate:Date
 * @returns {boolean}
 */
export function isBefore(currentDate: Date, expDate: Date): boolean {
    return currentDate < expDate;
}

/**
 * Debounce
 * @param {any} func:(...args:unknown[]
 * @returns {any}
 */
export function debounce<T extends unknown[]>(
    func: (...args: T) => void,
    delay: number
): (...args: T) => void {
    let timer: ReturnType<typeof setTimeout> | null;

    return (...args: T) => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            func(...args);
            timer = null;
        }, delay);
    };
}

export const tryParseJson = (str: string, returnErr: any) => {
    try {
        const getObject = JSON.parse(str)
        return getObject
    } catch {
        return returnErr
    }
}

// export const allowedExtensions = tryParseJson(import.meta.env.VITE_ALLOWED_EXTENSIONS, ["m4a", "mp4", "mp3", "wav", "pdf", "jpg", "jpeg", "png", "tiff", "tif", "pict", "gif"]) ?? ["m4a", "mp4", "mp3", "wav", "pdf", "jpg", "jpeg", "png", "tiff", "tif", "pict", "gif"]

export const documentExtensions = [
    // Microsoft Windows
    "docx",
    "doc",
    "txt",
    "rtf",
    "odt",

    // Linux
    "odt",
    "tex",
    "md",

    // macOS
    "docx",
    "doc",
    "rtf",
    "odt",
    "pages",

    // Microsoft Office
    "xlsx", // Excel spreadsheet
    "xls",  // Excel spreadsheet (97-2003)
    "pptx", // PowerPoint presentation
    "ppt",  // PowerPoint presentation (97-2003)
    "pub",  // Publisher document
    "accdb", // Access database,
    "csv"
];

/**
 * Delay
 * @param {any} ms:number
 * @returns {any}
 */
export function waitTimer(ms: number): any {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


export enum Typename {
    "date",
    "string",
    "number",
}

export interface SortConfig {
    key: string;
    direction: boolean; // true is asc and false is desc
    type: Typename;
}

export function sortArrayOfObjects(
    arr: Record<string, string>[],
    sortConfig: SortConfig
): Record<string, string>[] {
    const { key, direction } = sortConfig;
    // remove undefined
    const undefinedArray: Record<string, string>[] = [];
    const undefinedStrippedArray: Record<string, string>[] = [];
    arr.forEach((x) => {
        if (x[key] === undefined) undefinedArray.push(x);
        else undefinedStrippedArray.push(x);
    });

    const sortedUndefinedStrippedArray = undefinedStrippedArray.sort((a, b) => {
        const valueA = a[key];
        const valueB = b[key];

        if (sortConfig.type === Typename.string) {
            // Handle string comparisons
            if (direction) {
                if (valueA < valueB) return -1;
                if (valueA > valueB) return 1;
            } else {
                if (valueA > valueB) return -1;
                if (valueA < valueB) return 1;
            }
        } else if (sortConfig.type === Typename.date) {
            // Handle date comparisons
            if (direction) {
                return new Date(valueA).getTime() - new Date(valueB).getTime();
            } else {
                return new Date(valueB).getTime() - new Date(valueA).getTime();
            }
        } else {
            // Handle number comparisons
            if (direction) {
                return Number(valueA) - Number(valueB);
            } else {
                return Number(valueB) - Number(valueA);
            }
        }

        return 0;
    });
    if (sortConfig.direction) {
        return sortedUndefinedStrippedArray.concat(undefinedArray);
    } else {
        return undefinedArray.concat(sortedUndefinedStrippedArray);
    }
}

export function dynamicSortBy(key: string, order: "asc" | "desc") {
    if (order === "desc") {
        return function (a: any, b: any) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const valueA = a[key];
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const valueB = b[key];

            if (valueA === undefined && valueB === undefined) {
                return 0;
            } else if (valueA === undefined) {
                return 1;
            } else if (valueB === undefined) {
                return -1;
            }

            if (typeof valueA === "number" && typeof valueB === "number") {
                return valueB - valueA; // Reverse the order for numbers
            } else if (typeof valueA === "string" && typeof valueB === "string") {
                return valueB.localeCompare(valueA); // Reverse the order for strings
            } else if (typeof valueA === "number") {
                return 1; // Move undefined values and strings to the end
            } else {
                return -1; // Move undefined values and strings to the end
            }
        };
    }
    return function (a: any, b: any) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const valueA = a[key];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const valueB = b[key];

        if (valueA === undefined && valueB === undefined) {
            return 0;
        } else if (valueA === undefined) {
            return 1;
        } else if (valueB === undefined) {
            return -1;
        }

        if (typeof valueA === "number" && typeof valueB === "number") {
            return valueA - valueB;
        } else if (typeof valueA === "string" && typeof valueB === "string") {
            return valueA.localeCompare(valueB);
        } else if (typeof valueA === "number") {
            return -1;
        } else {
            return 1;
        }
    };
}

export function sortByKey(data: any[], key: string, order?: "asc" | "desc") {
    if (!order) return data;

    const sortedData = [...data];

    sortedData.sort(dynamicSortBy(key, order));
    // if (key === "exhibit_number") {
    //   sortedData = sortArrayOfObjects(data, {
    //     key,
    //     direction: true,
    //     type: Typename.number,
    //   });
    // }
    return sortedData;
}

export function parseJSONSafely(str: string) {
    try {
        return JSON.parse(str);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        // Return a default object, or null based on use case.
        return {};
    }
}


export function truncateString(str: string, maxLength: number) {
    if (str && str?.length > maxLength) {
        return str.slice(0, maxLength) + "..."; // Cut the string and add an ellipsis
    } else {
        return str; // The string is within the desired length
    }
}

export const signOut = () => {
    localStorage.clear();
    window.location.assign('/')
}

export const toBoolean = (str = '') => (String(str).toLowerCase() === 'true')


export function capitalizeFirstLetter(string?: string) {
    if (!string || typeof string !== 'string') return string
    return string.charAt(0).toUpperCase() + string.slice(1);
}



export function once<T, R>(this: any, fn: ((...args: T[]) => R) | null, context?: any): (...args: T[]) => R | undefined {
    let result: R | undefined;
    return function (this: any, ...args: T[]): R | undefined {
        if (fn) {
            result = fn.apply(context || this, args);
            fn = null;
        }
        return result;
    };
}



/**
 * Extracts the first name, last name, and the initial of the last name from a full name.
 * @param {string} fullName - The full name to extract parts from
 * @returns {{
 *  firstName: string,
 *  lastName: string,
 * lastNameInitial: string
 * }}
 */
export function extractNameParts(fullName: string): {
    firstName: string;
    lastName: string;
    lastNameInitial: string;
} {
    // Split the full name into an array of words
    const nameParts: string[] = fullName.split(' ');

    // Extract the first name
    const firstName: string = nameParts[0];

    // Extract the last name and its initial
    let lastName = '';
    let lastNameInitial = '';

    // Check if there is a last name
    if (nameParts.length > 1) {
        lastName = nameParts[nameParts.length - 1];
        lastNameInitial = lastName.charAt(0);
    }

    return {
        firstName,
        lastName,
        lastNameInitial
    };
}


export const getExtension = (fname: string) => {
    const fileTypes = {  audioTypes: {
        "mp3": "audio_icon.svg",
        "mov": 'audio_icon.svg',
        "mp4": 'audio_icon.svg',
        "ogg": "audio_icon.svg",
        "amr": 'audio_icon.svg',
        'm4a':  'audio_icon.svg',
        'webm':'audio_icon.svg',
        // "aac": "audio-track.svg",
        "flac": "audio-track.svg",
        // "alac": "audio-track.svg",
        "wav": "audio-track.svg",
        // "aiff": "audio-track.svg",
        // "dsd": "audio-track.svg",
        // "pcm": "audio-track.svg"
    
      }}
    const nameArray = fname.split('.');
    return {
        type: nameArray.length > 1 ? nameArray.pop() as keyof typeof fileTypes.audioTypes : undefined,
        name: nameArray.join('.')
    }
}


export function validateFilename(inputString: string): boolean {
    const regexPattern = /^[0-9a-zA-Z._-]+$/;
    return regexPattern.test(inputString);
  }


export  function isValidCaseName(caseName: string) {
    // Define a regex pattern for the naming convention
    const pattern = /^[A-Za-z]+\s\d{2}-\d{2}-\d{5}$/;
    return pattern.test(caseName);
  }


//    /**
//   * Convert a template string into HTML DOM nodes
//   * @param  {String} str The template string
//   * @return {Node}       The template HTML
//   */
//    export const  stringToHTML = function (str) {
//      var parser = new DOMParser();
//      var doc = parser.parseFromString(str, 'text/html');
//      return doc.body;
//  };



export function formatTime(seconds: number): string {
    const hours: number = Math.floor(seconds / 3600);
    const minutes: number = Math.floor((seconds % 3600) / 60);
    const remainingSeconds: number = Math.floor(seconds % 60);
  
    const formattedTime: string =
      (hours < 10 ? '0' : '') + hours + ':' +
      (minutes < 10 ? '0' : '') + minutes + ':' +
      (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
  
    return formattedTime;
  }

/**
 * Gets a {@link URL} without hash and query/search params from a specific
 * {@code URL}.
 *
 * @param {URL} url - The {@code URL} which may have hash and query/search
 * params.
 * @returns {URL}
 */
export function getURLWithoutParams(url: URL): URL {
    const { hash, search } = url;

    if ((hash && hash.length > 1) || (search && search.length > 1)) {
        url = new URL(url.href); // eslint-disable-line no-param-reassign
        url.hash = '';
        url.search = '';

        // XXX The implementation of URL at least on React Native appends ? and
        // # at the end of the href which is not desired.
        let { href } = url;

        if (href) {
            href.endsWith('#') && (href = href.substring(0, href.length - 1));
            href.endsWith('?') && (href = href.substring(0, href.length - 1));

            // eslint-disable-next-line no-param-reassign
            url.href === href || (url = new URL(href));
        }
    }

    return url;
}


export const updateProgress = (setProgressFil: any ,file: {
    FileName: string,
    progress: number,
    status?: 'success' | 'pending' | 'failed' | 'progress'
},remove: boolean = false) => {
    setProgressFil((prevFileProgress: any) => {
      const existingFileIndex = prevFileProgress.findIndex(
        (item: any) => item.FileName === file.FileName
      );

      if (existingFileIndex !== -1) {
        if(remove) {
            const updatedFileProgress = [...prevFileProgress.filter((it: any) => it.FileName !== file.FileName)]
            return updatedFileProgress
        }
        // File is already in the array, update progress
        const updatedFileProgress = [...prevFileProgress];
        updatedFileProgress[existingFileIndex] = file;
        if(file.progress === 100) {
            updatedFileProgress[existingFileIndex].status = 'success'
        }
        return updatedFileProgress;
      } else {
        // File is not in the array, append to the array
        return [
          ...prevFileProgress,
          {
            FileName: file.FileName,
            progress: file.progress,
            status: file.status
          },
        ];
      }
    });
  };

