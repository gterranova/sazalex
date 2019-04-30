import { Page } from '@sazalex/datasource';

export interface PageComponent {
    name?: string;
    pageInfo?: Page;
    data: any;
}