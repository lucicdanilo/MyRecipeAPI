# My Recipe API

This API I was built for storing recipes. API have authentication so you create your account where can store recipes.
You can store basic information about recipe like picture, ingredients, directions but you can also store informations about servings, categories, caloeries...

API is hosted on domain: 
```
https://myrecipeapi.glitch.me
```

## Instructions 

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











