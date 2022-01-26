# Server resource for formation angular

# API :

GET http://localhost:8080/rest/products
Return the list of product

GET http://localhost:8080/rest/products/:id
Return one product

POST http://localhost:8080/rest/basket
Add a product to the basket, decrease the stock of the product

GET http://localhost:8080/rest/basket
Get the list of products in the basket

POST http://localhost:8080/rest/basket/confirm
Send the confirm form to send the commande

# Utility :

GET http://localhost:8080/reset
Reload the product liste (stock) and clean the basket
Use instead of stoping and restart the server