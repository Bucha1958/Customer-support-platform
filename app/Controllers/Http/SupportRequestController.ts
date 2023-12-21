// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
// import { schema, validator } from '@ioc:Adonis/Core/Validator';
// import User from 'App/Models/User';
// import SupportRequest from 'App/Models/SupportRequest';

// export default class SupportRequestController {
//   // Show the support request form
//   public async showForm({ view }: HttpContextContract) {
//     return view.render('support_request_form');
//   }

//   // Handle the submission of the support request form
//   public async create({ request, response, validator }: HttpContextContract) {
//     // Validate the submitted data with Adonisjs Validator
//     const validationSchema = validator.schema({
//       first_name: 'required|string',
//       last_name: 'required|string',
//       email: 'required|email',
//       title: 'required|string',
//       text: 'required|string',
//       file: 'required|file_ext:pdf,doc,docx|max:5mb',
//     });

//     const validatedData = await request.validate({
//       schema: validationSchema,
//     });

//     // Find or create the user based on the provided email address
//     const user = await User.firstOrCreate({ email: validatedData.email }, {
//       full_name: `${validatedData.first_name} ${validatedData.last_name}`,
//     });

//     // Move the uploaded file to a local drive
//     const file = request.file('file')!;
//     const fileName = `${Date.now()}_${file.clientName}`;
//     await file.move(Application.tmpPath('uploads'), {
//       name: fileName,
//     });

//     // Create the support request
//     const supportRequest = new SupportRequest();
//     supportRequest.title = validatedData.title;
//     supportRequest.text = validatedData.text;
//     supportRequest.file = fileName;

//     // Associate the support request with the user
//     await user.related('supportRequests').save(supportRequest);

//     // Send a success response with status 201 Created
//     response.created({ success: 'Support request submitted successfully!' });
//   }
// }

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

    // Find or create the user based on the provided email address
    const user = await User.firstOrCreate({ email: validatedData.email }, {
      full_name: `${validatedData.first_name} ${validatedData.last_name}`,
    });

    // Move the uploaded file to a local drive
    const file = request.file('file')!;
    const fileName = `${Date.now()}_${file.clientName}`;
    await file.move(request.tmpPath('uploads'), {
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

  // SupportRequestController.ts


  
  // public async create({ request, response }: HttpContextContract) {
  //   const supportRequestData = request.only([
  //     'first_name',
  //     'last_name',
  //     'email',
  //     'title',
  //     'text',
  //   ]);

  //   // Move the uploaded file to a local drive
  //   const file = request.file('file')!;
  //   const fileName = `${Date.now()}_${file.clientName}`;
  //   await file.move(request.tmpPath('uploads'), {
  //     name: fileName,
  //   });

  //   // Save the support request to the database
  //   await SupportRequest.create({
  //     ...supportRequestData,
  //     file: fileName,
  //   });

  //   // Send a success response with status 201 Created
  //   response.created({ success: 'Support request submitted successfully!' });
  // }


}
