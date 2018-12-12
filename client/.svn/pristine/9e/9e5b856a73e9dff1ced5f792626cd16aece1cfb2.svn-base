
/**
 * A page is a sublist of a list of objects.
 * It allows gain information about the position of it in the containing entire list
 */
export class PageInfo<T> {
    /** the total amount of elements */
    totalElements: number = 0;

    /** the number of total pages */
    totalPages: number = 0;

    /** check is the last page */
    last: boolean;

    /** check is the first page */
    first: boolean;

    /** the size of the page */
    size: number = 0;

    /** the number of the current */
    number: number = 0;

    /** the sorting parameters */
    sort: any;

    /** the number of elements currently */
    numberOfElements: number = 0;

    /** the number of current page */
    currentPage: number = 0;

    /** the content */
    content: T;

    public choosePage(numberPage: number) {
        if (numberPage > 0 && numberPage <= this.totalPages) {
            this.currentPage = numberPage - 1;
        }
    }
    
}