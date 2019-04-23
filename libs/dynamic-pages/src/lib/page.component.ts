import { Page } from '@sazalex/datasource';

export interface PageComponent {
    type?: string;
    pageInfo?: Page;
    data: any;
}