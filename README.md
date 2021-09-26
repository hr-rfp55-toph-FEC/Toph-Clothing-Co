# Toph Clothing Co

![javascript](https://img.shields.io/badge/JavaScript-20232A?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![css3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Jest](https://img.shields.io/badge/-Jest-20232A?style=for-the-badge&logo=jest&logoColor=red)
![node.js](https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=nodedotjs&logoColor=green)
![Express](https://img.shields.io/badge/-Express-20232A?style=for-the-badge&logo=express&logoColor=yellow)
![Webpack](https://img.shields.io/badge/-webpack-20232A?style=for-the-badge&logo=webpack&logoColor=blueviolet)
![Babel](https://img.shields.io/badge/-Babel-20232A?style=for-the-badge&logo=babel&logoColor=yellow)

<p
  align="center">
  <img
    alt="product overview demo" src="client/demo/product_overview.gif">
</p>

<p
  align="center">
  <img
    alt="related products demo" src="client/demo/related_products_outfit.gif">
</p>

<p
  align="center">
  <img
    alt="ratings reviews demo" src="client/demo/ratings_and_reviews.gif">
</p>

## Project Catwalk

Front End Capstone for Hack Reactor. We are from RFP-55.

The goal of this project is a complete redesign of the retail portal for an old e-commerce website to use modern front-end technologies. We created three widgets for this newly revamped website - Product Overview, Related Products & Outfit, and Ratings & Reviews. The project utilized react hooks for more flexible development, and adhere to the ESlint Airbnb style.

## Components

### [Product Overview](client/src/components/ProductOverview)

- Developed by [Daniel Ho](https://github.com/dho1994)

- The user is able to toggle through photos for the currently selected product and style combination using the left and right arrows overlayed near the bottom corners of the photo. The user may also jump to a specific photo by clicking on one of the photo thumbnails near the left edge of the image.

- The user may enter into an expanded view of the photo by clicking the 'expand' icon located near the top right of the photo. The user may pan the photo to view portions of the photo too large to show in the space provided by moving the mouse within this space.

- Additionally, within the expanded view, the user may toggle through the photos by clicking on the image itself. Clicking on the right half of the image will show the next photo, while clicking on the left half of the image will show the previous photo. The user may also click on one of the thumbnail dots to jump to a specific photo.

- In the default view, the user may select different styles for the current product by clicking on the style thumbnails located within the product information panel to the right of the screen. The price and available photos will update upon selection.

- Once a size and quantity has been selected, the 'Add to Cart' button will place the style, size and quantity of the product selected into the user’s cart.

### [Related Items And Outfit](client/src/components/RelatedItemsAndOutfit)

- Developed by [Bishal Gautam](https://github.com/bishalkg)

- The user is able to select a card, which will re-render and populate all the components on the page to display data for that card, and auto-scroll the user to the top of the page

- The carousel arrows will advance the list by one card at a time

- The user is able to to compare the product on a card with the product displayed at the top, by clicking the star button, which will populate a modal with characteristics data

- Clicking the ‘add to card’ button will add the product at the top of the page to your outfit list, you can add cards for different styles for the same product. The selections will persist upon exit through use of the browser's local storage.

### [Ratings and Reviews](client/src/components/RatingsAndReviews)

- Developed by [Ya Liu](https://github.com/ya-liu)

- The user is able to browse all reviews available for the current product with a breakdown visual of the ratings.

- All reviews are created by users, which will contain text commentary, user nickname, date of the review, and ratings for characteristics of the product. Each review may also contain user-uploaded photos and a response from the business team. Users can add a review by clicking 'Add a review'.

- The rating breakdown allows users to filter ratings by stars, and filtered ratings can be sorted by keyword. The characteristics applicable to each product will depend on the type of the current product.

### Installation

npm is the package management system for this project.

Use ```npm install``` to install all dependencies.

To start the server, use ```npm run start-dev```.

To run the production build, use ```npm run build-prod``` and ```npm run start-server-prod```.
