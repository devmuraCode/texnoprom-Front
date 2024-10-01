import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import path from 'path';

// Ваши маршруты
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/catalog', changefreq: 'weekly', priority: 0.8 },
  { url: '/catalog/:brandId/:categoryId', changefreq: 'weekly', priority: 0.8 },
  { url: '/cart', changefreq: 'weekly', priority: 0.7 },
  { url: '/detail/:productId', changefreq: 'monthly', priority: 0.8 },
  { url: '/profile', changefreq: 'monthly', priority: 0.6 },
  { url: '/payment', changefreq: 'monthly', priority: 0.5 },
  { url: '/about', changefreq: 'monthly', priority: 0.5 },
  { url: '/delivery', changefreq: 'monthly', priority: 0.5 },
];

const sitemapStream = new SitemapStream({ hostname: 'https://www.texnoprom.net.uz' });

streamToPromise(sitemapStream)
  .then(data => {
    // Сохранение в файл sitemap.xml
    createWriteStream(path.resolve('public', 'sitemap.xml')).write(data);
    console.log('Sitemap has been successfully created.');
  })
  .catch(error => {
    console.error('An error occurred while generating the sitemap:', error);
  });

// Добавляем ссылки в sitemap
links.forEach(link => {
  sitemapStream.write(link);
});

sitemapStream.end();
