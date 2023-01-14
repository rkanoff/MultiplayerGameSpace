const z = require('zod')

// new game validation
const newGameValidation = data => {
    const newGameSchema = z.object({
        name: z.string().min(6, 'Name must be at least 6 characters')
                            .max(20, 'Name cannot be more than 20 characters'),
        numPlayers: z.number().gte(2, 'Game must allow a minimum of 2 players')
                            .lte(8, 'Game cannot allow more than 8 players'),
        players: z.string().array().nonempty('Game must have at least one player')
    })
    return newGameSchema.safeParse(data)
}

module.exports.newGameValidation = newGameValidation