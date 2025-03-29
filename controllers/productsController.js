import Products from "../models/Products.js"


export async function productsPage (req, res, next) {
    const { tag, tenToFifty, moreThanTen, lessThanFifty, fifty, name, skip = 0, limit = 10, sort = 'name' } = req.query
    const filters = {}

    if (tag) filters.tags = tag
    if (tenToFifty) {
        filters.price = { $gte: 10, $lte: 50 }
    } else if (moreThanTen) {
        filters.price = { $gte: 10 }
    } else if (lessThanFifty) {
        filters.price = { $lte: 50 }
    } else if (fifty) {
        filters.price = { $eq: 50 }
    }
    if (name) filters.name = new RegExp('^' + req.query.name, 'i')
    
    try {
        const skipValue = Number(skip) || 0
        const limitValue = Number(limit) || 10

        
        const products = await Products.find(filters)
            .skip(skipValue)
            .limit(limitValue)
            .sort({ [sort]: 1 })
            .exec()
        
        const totalProducts = await Products.countDocuments(filters)
        const totalPages = Math.ceil(totalProducts / limitValue)
        const currentPage = Math.ceil(skipValue / limitValue) + 1
        
        res.render('productsView', {
            products,
            totalProducts, 
            totalPages,
            currentPage,
            limit: limitValue, skip: skipValue,
            tag, tenToFifty, moreThanTen, lessThanFifty, fifty, name,
            sort
        })
    } catch(error) {
        console.error(error)
        res.status(500).send('Error getting products')
    }
}

export function createProductPage(req, res, next) {
    res.render('productsNewView')
}

export async function createProduct (req, res, next) {
    try {
        const {name, price, tags } = req.body

        const product = new Products({name, price, tags})

        await product.save()
        res.redirect('/')

    } catch(error) {
        next(error)
    }
}

export function deteleProduct (req, res, next) {
    pass
}