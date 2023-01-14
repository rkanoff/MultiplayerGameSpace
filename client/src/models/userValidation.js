const z = require('zod')

// new user validation
const newUserValidation = data => {
    const newUserSchema = z.object({
        username: z.string().min(8, 'Username must be at least 8 characters')
                            .max(20, 'Username cannot be more than 20 characters'),
        email: z.string().email('Please input a valid email'),
        password: z.string().min(8, 'Password must be at least 8 characters')
                            .max(20, 'Password cannot be more than 20 characters'),
    })
    return newUserSchema.safeParse(data)
}

module.exports.newUserValidation = newUserValidation