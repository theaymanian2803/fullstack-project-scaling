import Contact from './../models/contactModel.js'
import asyncHandler from '../middleware/asyncHandler.js'

const contactController = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body

  // 1. Check if a contact with this email already exists
  const contactExists = await Contact.findOne({ email })

  if (contactExists) {
    // 2. If user exists, push the new message into the existing message array
    contactExists.message.push(message)

    // 3. Save the updated document
    const updatedContact = await contactExists.save()

    return res.status(200).json({
      _id: updatedContact._id,
      name: updatedContact.name,
      email: updatedContact.email,
      message: updatedContact.message,
    })
  }

  // 4. If user doesn't exist, create a new contact
  // Note: We wrap 'message' in an array [] so the first entry matches the array structure
  const contact = await Contact.create({
    name,
    email,
    message: [message],
  })

  if (contact) {
    res.status(201).json({
      _id: contact._id,
      name: contact.name,
      email: contact.email,
      message: contact.message,
    })
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

export default contactController
