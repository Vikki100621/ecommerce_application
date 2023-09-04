// import { getCategories } from './api/api';
// import { Category } from './api/interfaces';

// export default class Categories {
//   public categoryContainer: HTMLDivElement | undefined;

//   constructor() {
//     this.categoryContainer = document.createElement('div');
//     this.categoryContainer.classList.add('category__container');
//   }

//   async getСategories() {
//     try {
//       const categoriesResponse = await getCategories();
//       const categories: Array<Category> = categoriesResponse.data.results;
//       console.log(categories);
  
//       categories.forEach((categoryData: Category) => {
//         const categoryId = categoryData.id;
//         const categoryBox = document.createElement('div');
//         categoryBox.id = categoryId;
//         categoryBox.classList.add('product__category');
  
//         if (categoryData.name['en-US'] === 'Dishes') {
//           categoryBox.classList.add('category__dishes');
//           categoryBox.setAttribute('data-category-path', 'dishes');
//         } else if (categoryData.name['en-US'] === 'Paintings') {
//           categoryBox.classList.add('category__painting');
//           categoryBox.setAttribute('data-category-path', 'paintings');
//         } else if (categoryData.name['en-US'] === 'Jewellery') {
//           categoryBox.setAttribute('data-category-path', 'jewellery');
//           categoryBox.classList.add('category__jewellery');
//         } else if (categoryData.name['en-US'] === 'Coins') {
//           categoryBox.classList.add('category__coins');
//           categoryBox.setAttribute('data-category-path', 'coins');
//         }
//         const title = document.createElement('p');
//         title.classList.add('category__title');
//         title.textContent = categoryData.name['en-US'];
//         categoryBox.appendChild(title);
//         this.categoryContainer?.appendChild(categoryBox);
//       });
  
//       const allProductsCategoryBox = document.createElement('div');
//       allProductsCategoryBox.classList.add('product__category', 'category__allproducts');
//       allProductsCategoryBox.setAttribute('data-category-path', 'allproducts');
  
//       const allProductsTitle = document.createElement('p');
//       allProductsTitle.classList.add('category__title');
//       allProductsTitle.textContent = 'All Products'; 
//       allProductsCategoryBox.appendChild(allProductsTitle);
  
//       this.categoryContainer?.appendChild(allProductsCategoryBox);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
=======
  async getСategories() {
    try {
      const categoriesResponse = await getCategories();
      const categories: Array<Category> = categoriesResponse.data.results;

      categories.forEach((categoryData: Category) => {
        const categoryId = categoryData.id;
        const categoryBox = document.createElement('div');
        categoryBox.id = categoryId;
        categoryBox.classList.add('product__category');

        if (categoryData.name['en-US'] === 'Dishes') {
          categoryBox.classList.add('category__dishes');
          categoryBox.setAttribute('data-category-path', 'dishes');
        } else if (categoryData.name['en-US'] === 'Paintings') {
          categoryBox.classList.add('category__painting');
          categoryBox.setAttribute('data-category-path', 'paintings');
        } else if (categoryData.name['en-US'] === 'Jewellery') {
          categoryBox.setAttribute('data-category-path', 'jewellery');
          categoryBox.classList.add('category__jewellery');
        }

        const title = document.createElement('p');
        title.classList.add('category__title');
        title.textContent = categoryData.name['en-US'];
        categoryBox.appendChild(title);
        this.categoryContainer?.appendChild(categoryBox);
      });

      const allProductsCategoryBox = document.createElement('div');
      allProductsCategoryBox.classList.add('product__category', 'category__allproducts');
      allProductsCategoryBox.setAttribute('data-category-path', 'allproducts');

      const allProductsTitle = document.createElement('p');
      allProductsTitle.classList.add('category__title');
      allProductsTitle.textContent = 'All Products';
      allProductsCategoryBox.appendChild(allProductsTitle);

      this.categoryContainer?.appendChild(allProductsCategoryBox);
    } catch (error) {
      console.log(error);
    }
  }
}

