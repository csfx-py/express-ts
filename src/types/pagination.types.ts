export interface IPagination {
    page: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
}

export interface PaginationOptions {
    maxLimit?: number;
}
