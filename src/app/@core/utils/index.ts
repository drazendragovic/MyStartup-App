export class Utils
{
    /* Filter array by string */
    public static filterArrayByString(mainArr: any[], searchText: string): any
    {
        if ( searchText === '' )
        {
            return mainArr;
        }

        searchText = searchText.toLowerCase();

        return mainArr.filter(itemObj => {
            return this.searchInObj(itemObj, searchText);
        });
    }

    /* Search in object */
    public static searchInObj(itemObj: any, searchText:string): boolean
    {
        for ( const prop in itemObj )
        {
            if ( !itemObj.hasOwnProperty(prop) )
            {
                continue;
            }

            const value: [] = itemObj[prop];

            if ( typeof value === 'string' )
            {
                if ( this.searchInString(value, searchText) )
                {
                    return true;
                }
            }

            else if ( Array.isArray(value) )
            {
                if ( this.searchInArray(value, searchText) )
                {
                    return true;
                }
            }

            if ( typeof value === 'object' )
            {
                if ( this.searchInObj(value, searchText) )
                {
                    return true;
                }
            }
        }
        return false;
    }

    /* Search in array */
    public static searchInArray(arr: [], searchText: any): boolean
    {
        for ( const value of arr )
        {
            if ( typeof value === 'string' )
            {
                if ( this.searchInString(value, searchText) )
                {
                    return true;
                }
            }

            if ( typeof value === 'object' )
            {
                if ( this.searchInObj(value, searchText) )
                {
                    return true;
                }
            }
        }
        return false;
    }

    /* Search in string */
    public static searchInString(value: string, searchText: string): any
    {
        return value.toLowerCase().includes(searchText);
    }

    /* Generate a unique GUID */
    public static generateGUID(): string
    {
        function S4(): string
        {
            return Math.floor((1 + Math.random()) * 0x10000)
                       .toString(16)
                       .substring(1);
        }
        return S4() + S4();
    }

    /* Toggle in array */
    public static toggleInArray(item: never, array: []): void
    {
        if ( array.indexOf(item) === -1 )
        {
            array.push(item);
        }
        else
        {
            array.splice(array.indexOf(item), 1);
        }
    }
}
