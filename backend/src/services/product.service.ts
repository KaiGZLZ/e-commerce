import Product from '../Models/product.model'

import { type productDeleteType, type productRegisterType, type productUpdateType } from './_servicesTypes/productService.types'
import userEnum from '../__helpers/enums/user.enum'
import moment from 'moment'
import { NotFoundError, UnauthorizedError } from '../__helpers/customErrors'

/**  Funtion to register a product
 *
 * @param {object.<object>} data
 * @param {Object.<string, number>} data._user - products name
 * @param {Object.<string, number>} data.product - products name
 * @param {string} data.product.name - products name
 * @param {string} data.product.price - products price
 * @param {string} data.product.description - products description
 * @param {string} data.product.category - products category
 * @param {string} data.product.subCategory - products subCategory
 * @param {string} data.product.tags - products tags
 * @param {string | undefined} data.product.wholesalePrice - products wholesalePrice (Optional)
 * @param {string | undefined} data.product.orderMinForWholesale - products minimum order (Optional)
 * @param {string} data.product.stock - products stock
 *
 */
export async function productRegister(data: productRegisterType): Promise<object> {
    const user = data._user

    if (user.role !== userEnum.roles.admin) {
        throw new UnauthorizedError('Just the admin users are allowed to add products')
    }

    const product = data.product

    // Look if there is a product with the same name
    const existingproduct = await Product.findOne({ name: product.name })

    if (!existingproduct) throw new Error('Already exists this products name')

    // If not, Register the new product

    const newproduct = new Product(product)
    await newproduct.save()

    return {
        message: 'product added successfully'
    }
}

/**  Funtion to Delete an product
 *
 * @param {object} data
 * @param {Object.<any>} data._user - products name
 * @param {Object.<string, number>} data.data - products name
 * @param {string} data.data.id - products id
 *
 */
export async function productDelete(data: productDeleteType): Promise<object> {
    const user = data._user
    const id = JSON.stringify(data.data.id)

    if (user.role !== userEnum.roles.admin) {
        throw new Error('Just the admin users are allowed to delete products')
    }

    const result = await Product.findByIdAndDelete(id)

    if (result != null) {
        return {
            message: 'The product was successfully removed'
        }
    } else throw new NotFoundError('The product was not found in the products database')
}

/**  Funtion to update a product
 *
 * @param {object.<object>} data
 * @param {Object.<string, number>} data._user - products name
 * @param {Object.<string, number>} data.product - products name
 * @param {string} data.product.id - products name
 * @param {string} data.product.name - products name
 * @param {string} data.product.price - products price
 * @param {string} data.product.description - products description
 * @param {string} data.product.category - products category
 * @param {string} data.product.subCategory - products subCategory
 * @param {string} data.product.tags - products tags
 * @param {string | undefined} data.product.wholesalePrice - products wholesalePrice (Optional)
 * @param {string | undefined} data.product.orderMinForWholesale - products minimum order (Optional)
 * @param {string} data.product.stock - products stock
 *
 */
export async function productUpdate(data: productUpdateType): Promise<void> {
    const user = data._user
    const product = data.product

    if (user.role !== userEnum.roles.admin) {
        throw new Error('Just the admin users are allowed to register products')
    }

    const oldProduct = await Product.findById(product.id)

    if (!oldProduct) {
        throw new Error('The product is not valid')
    }

    product.updatedDate = moment().subtract(4, 'hours').toDate()
    Object.assign(oldProduct, product)

    await oldProduct.save()
}

/**  Funtion to get a product
 *
 * @param {string} id - products description
 *
 */
export async function productGet(id: string): Promise<object | null> {
    return await Product.findById(id)
}

/**  Funtion to get a product
 *
 */
export async function productAll(): Promise<object | null> {
    return await Product.find()
}
