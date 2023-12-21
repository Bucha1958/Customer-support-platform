/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
});


// Show user registration form
Route.get('/register', 'UserController.showRegistrationForm');

// Handle user registration
Route.post('/register', 'UserController.register');

// Route to show the support request form
Route.get('/support', 'SupportRequestController.showForm');

// Route to handle the submission of the support request form
Route.post('/support', 'SupportRequestController.create');
