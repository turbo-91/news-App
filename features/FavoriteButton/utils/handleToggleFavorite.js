// export default function toggleFavorite(favoriteArticles, url, userId) {
//   // See if article is already in the state array

//   const info = favoriteArticles.find(
//     (article) => article.url === url && article.userId === userId
//   );

//   if (info) {
//     // If the article is already in the array, toggle the isFavorite value
//     return favoriteArticles.map((article) =>
//       article.url === url && article.userId === userId
//         ? { ...article, isFavorite: !article.isFavorite }
//         : article
//     );
//   } else {
//     // If the article is not in the array already, add it with the favorite as true
//     return [...favoriteArticles, { url, userId, isFavorite: true }];
//   }
// }
