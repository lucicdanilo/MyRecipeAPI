# My Recipe API

This API I was built for storing recipes. API have authentication so you create your account where can store recipes.
You can store basic information about recipe like picture, ingredients, directions but you can also store informations about servings, categories, caloeries...

API is hosted on domain: 
```
https://myrecipeapi.glitch.me
```

## Instructions 

First you should connect to MongoDB. In .env file you can paste connection string in DB_CONNECT.
And you can add random string to the TOKEN_SECRET variable for encripting password.

#### Registration 

For registration you send POST request to this link: 
```
https://myrecipeapi.glitch.me/api/user/register
```
With header:
```
Content-Type: application/json 
```
and with body: 
```
{
	"name":"Your name",
	"email":"youremail@example.com",
	"password":"password"	
}
```
If you get user id then everything is ok but you can get errors for example for weak password or wrong email format...

#### Logging in

For logging in you send POST request to:
```
https://myrecipeapi.glitch.me/api/user/login
```
With header:
```
Content-Type: application/json 
```
and with body: 
```
{
	"email":"youremail@example.com",
	"password":"password"	
}
```
If you get token everything is ok, and that token you can store because it is requierd for other operations. 
Here you can get errors like wrong email or password. 

#### Getting id

To get id of user you can send POST request to:
```
https://myrecipeapi.glitch.me/api/user/getid
```
With header:
```
Content-Type: application/json 
```
and with body: 
```
{
	"email":"youremail@example.com"
}
```
If you get response userId then everything is ok.


#### Post recipe

For posting recipe you send POST request to:
```
https://myrecipeapi.glitch.me/api/user/postrecipe
```
With header:
```
Content-Type: application/json,
auth-token: Authentification token of user
```
and with body: 
```
{
	"id":"auth token of user",
	"title":"title of recipe",
	"recipeImage": Image file,
	"category":"breakfast / lunch / dinner / snack / other",
	"preparation":"preparation time in min",
	"servings":"number of servings",
	"ingredients":"recipe ingredients",
	"calories":"recipe calories",
	"typeOfPreparation":"very easy / easy / medium / hard / very hard",
	"directions":"recipe directions"
}
```
If everything is ok you will get recipe id.

#### Getting recipe

For getting recipe you send POST request to:
```
https://myrecipeapi.glitch.me/api/user/getrecepies
```
With header:
```
Content-Type: application/json,
auth-token: Authentification token of user
```
and with body: 
```
{
	"id":"id of recipe",
}
```
If everything is ok you will get recipe.








