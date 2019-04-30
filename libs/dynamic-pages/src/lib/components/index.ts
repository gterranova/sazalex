import { DefaultPageComponent } from './default-page/default-page.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { PeoplePageComponent } from './people-page/people-page.component';
import { PeopleDetailComponent } from './people-detail/people-detail.component';
import { PracticesDetailComponent } from './practices-detail/practices-detail.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { PageNotFoundPageComponent } from './page-not-found-page/page-not-found-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { EditItemComponent } from './edit-item/edit-item.component';

export const DYNAMIC_COMPONENTS = [
    DefaultPageComponent, 
    HomePageComponent, 
    NewsPageComponent, 
    NewsDetailComponent, 
    PeoplePageComponent, 
    PeopleDetailComponent, 
    PracticesDetailComponent, 
    ContactsPageComponent,
    PageNotFoundPageComponent,
    ListPageComponent,
    EditItemComponent 
];

export const PageTypes = {
    'default-page': DefaultPageComponent,
    'home-page': HomePageComponent,
    'news-page': ListPageComponent, //NewsPageComponent,
    'news-detail': EditItemComponent, //NewsDetailComponent,
    'people-page': ListPageComponent, //PeoplePageComponent,
    'people-detail': EditItemComponent, //PeopleDetailComponent,
    'practices-page': ListPageComponent,
    'practices-detail': EditItemComponent, //PracticesDetailComponent,
    'contacts-page': ContactsPageComponent,
    'page-not-found-page': PageNotFoundPageComponent,
    'pages-page': ListPageComponent,
    'pages-detail': EditItemComponent,
    'users-page': ListPageComponent,
    'users-detail': EditItemComponent,
  };
  