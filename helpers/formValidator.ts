import Joi from 'joi'

export const newTask = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.string().required(),
    assignEmail: Joi.string().email()
})