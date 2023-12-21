import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import SupportRequest from 'App/Models/SupportRequest';
import { schema, rules } from '@ioc:Adonis/Core/Validator';


export default class SupportRequestController {
  // Show the support request form
  public async showForm({ view }: HttpContextContract) {
    return view.render('support_request_form');
  }

  // Handle the submission of the support request form

  public async create({ request, response }: HttpContextContract) {
    // Validate the submitted data with Adonisjs Validator
    const validationSchema = schema.create({
      first_name: schema.string(),
      last_name: schema.string(),
      email: schema.string({}, [
        rules.email(),
      ]),
      title: schema.string(),
      text: schema.string(),
      file: schema.file({
        extnames: ['pdf', 'doc', 'docx'],
        size: '5mb',
      }),
    });

    const validatedData = await request.validate({
      schema: validationSchema,
    });

    // Check if the email already exists
    const existingUser = await User.findBy('email', validatedData.email);
    if (existingUser) {
      return response.status(422).send({
        error: 'The provided email address is already taken.',
      });
    }
    
    // Create a separate object for user creation
    const userCreationData = {
      email: validatedData.email,
      full_name: `${validatedData.first_name} ${validatedData.last_name}`,
    };

    // Find or create the user based on the provided email address
    const user = await User.firstOrCreate({ email: userCreationData.email }, userCreationData);


    // Move the uploaded file to a local drive
    const file = request.file('file')!;
    const fileName = `${Date.now()}_${file.clientName}`;
    await file.move('public/uploads', {
      name: fileName,
    });

    // Create the support request
    const supportRequest = new SupportRequest();
    supportRequest.title = validatedData.title;
    supportRequest.text = validatedData.text;
    supportRequest.file = fileName;

    // Associate the support request with the user
    await user.related('supportRequests').save(supportRequest);

    // Send a success response with status 201 Created
    response.created({ success: 'Support request submitted successfully!' });
  }
}
