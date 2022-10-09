import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategorysRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const categoryAlreadyExist = categoriesRepository.findByName(name);

    if (categoryAlreadyExist){
        return response.send(400).json({error: "Category Already exist!"});
    }

    categoriesRepository.create({ name, description})

    return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
    const all = categoriesRepository.list();

    return response.json(all);
})

export { categoriesRoutes };