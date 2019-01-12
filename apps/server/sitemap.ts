import { join } from 'path';
var sitemap = require('express-sitemap');


function getTodayStr() {
    return dateToString(new Date())
}

function dateToString(date) {
    if (typeof date === 'string') return date
    return date.toISOString().split('T')[0]
}


const multiMap = (p, langs) => {
    return Object.assign({}, ...langs.map(lang => {
        return { [`/${lang}${p}`]: ['get'] };
    }));
}

const withAltLangs = (p, langs, baseUrl, extraOptions) => {
    return Object.assign({}, ...langs.map(lang => {
        return {
            [`/${lang}${p}`]: {
                ...extraOptions,
                alternatepages: langs.map(lang => {
                    return {
                        rel: 'alternate',
                        hreflang: lang,
                        href: `${baseUrl}/${lang}${p}`
                    };
                })
            }
        };
    }));
}

const fromDatasource = (options, commonOptions, data, key, langs) => {
    for (let lang of langs) {
        let collection = data[lang][key]; 
        for (let item of collection) {
            Object.assign(options.map, ...multiMap(`/${key}/${item.slug}`, langs));
            Object.assign(options.route, ...withAltLangs(`/${key}/${item.slug}`, langs, 'https://www.sazalex.com', commonOptions));
        }
    }
}

export const generateSitemap = async (config, DIST_FOLDER) => {
    const commonOptions = { lastmod: getTodayStr(), changefreq: 'daily' };
    const { dispatcher } = config;

    const options = {
        http: 'https',
        url: 'www.sazalex.com',
        sitemap: join(DIST_FOLDER, 'sitemap.xml'), // path for .XMLtoFile
        robots: join(DIST_FOLDER, 'ROBOTS.txt'), // path for .TXTtoFile  
        map: {
            '/': ['get'],
            ...multiMap('/home', ['it', 'en']),
            ...multiMap('/people', ['it', 'en']),
            ...multiMap('/news', ['it', 'en']),
            ...multiMap('/contacts', ['it', 'en']),
            '/admin': ['get'],
            '/api': ['get'],
        },
        route: {
            ...withAltLangs('/home', ['it', 'en'], 'https://www.sazalex.com', commonOptions),
            ...withAltLangs('/people', ['it', 'en'], 'https://www.sazalex.com', commonOptions),
            ...withAltLangs('/news', ['it', 'en'], 'https://www.sazalex.com', commonOptions),
            ...withAltLangs('/contacts', ['it', 'en'], 'https://www.sazalex.com', commonOptions),
            '/admin': {
                disallow: true,
            },
            '/api': {
                disallow: true,
            },
        },
    };

    const data = await dispatcher.dispatch('get', ``);
    
    fromDatasource(options, commonOptions, data, 'people', ['it', 'en']);
    fromDatasource(options, commonOptions, data, 'news', ['it', 'en']);
    fromDatasource(options, commonOptions, data, 'practices', ['it', 'en']);

    return sitemap(options);
}
