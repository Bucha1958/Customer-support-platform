import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import { schema, rules } from '@ioc:Adonis/Core/Validator';


export default class UserController {
  /**
   * Show the user registration form
   */
  public async showRegistrationForm({ view }: HttpContextContract) {
    return view.render('user_registration_form');
  }

  /**
   * Handle the user registration process
   */
  public async register({ request, response }: HttpContextContract) {
    
    const validationSchema = schema.create({
      full_name: schema.string(),
      email: schema.string({}, [
        rules.email(),
      ]),
    });

    // Validate user input
    const validatedData = await request.validate({
      schema: validationSchema,
    });

    try {
      // Create a new user
      const user = await User.create(validatedData);

      // Send a success response with status 201 Created
      response.created({ success: 'User registered successfully!', user });
    } catch (error) {
      // Handle errors, e.g., database constraints violation
      response.badRequest({ error: 'Registration failed. Please check your input.' });
    }
    
  }

}
