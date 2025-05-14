import { Request, Response } from "express"
import { addressSchema, updateUserSchema } from "../schema/address"
import { prismaClient } from ".."
import { InternalServerException, InvalidInputExceptions, NotFoundException } from "../exceptions/BadExceptions"
import { ErrorCode } from "../exceptions/root"
import { cartSchema } from "../schema/cart"



export const addCart = async (req: Request, res: Response) => {
    try {
        const validateInputs = cartSchema.parse(req.body)
        const product = await prismaClient.product.findFirst({
            where: {
                id: +validateInputs.productId
            }
        })
        if (!product) {
            throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND)
        }
        const cart = await prismaClient.cartItem.create({
            data: {
                userId: +req.user.id,
                productId: +validateInputs.productId,
                quantity: +validateInputs.quantity
            }
        });

        res.status(201).json({
            message: "Cart created",
            data: cart
        })
    } catch (error) {
        throw new InternalServerException("Something went wrong", ErrorCode.INTERNAL_ERROR, error)
    }
}


export const getCart = async (req: Request, res: Response) => {
    try {
        const allCarts = await prismaClient.cartItem.findMany({
            where: {
                userId: +req.user.id
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                product: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });

        res.status(200).json({
            message: "All carts.",
            data: allCarts
        });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({
            message: "Something went wrong while fetching cart.",
        });
    }
};


export const deleteCart = async (req: Request, res: Response) => {

    const cart = await prismaClient.cartItem.findFirst({
        where: {
            id: +req.params.id
        }
    })

    if (!cart) {
        throw new NotFoundException("No Cart found", ErrorCode.CART_NOT_FOUND)
    }

    await prismaClient.cartItem.delete({
        where: {
            userId: +req.user.id,
            id: +req.params.id
        }
    })

    res.status(200).json({
        message: "Cart deleted successfully."
    })
};


export const changeQuantity = async (req: Request, res: Response) => {
    try {
        const validatedInputs = cartSchema.parse(req.body);
        const cart = await prismaClient.cartItem.findFirst({
            where: {
                id: +req.params.id,
                userId: +req.user.id
            }
        });

        if (!cart) {
            throw new NotFoundException("Cart not found", ErrorCode.CART_NOT_FOUND);
        }

        if (cart.productId !== +validatedInputs.productId) {
            throw new InvalidInputExceptions("Product not matched", ErrorCode.INVALID_INPUTS);
        }


        if (+validatedInputs.quantity == 0) {
            await prismaClient.cartItem.delete({
                where: {
                    id: +req.params.id, 
                },
            });

            return res.status(200).json({
                message: "Cart item has been deleted",
            });

        } else {
            const updatedCart = await prismaClient.cartItem.update({
                where: {
                    id: +req.params.id
                },
                data: {
                    quantity: +validatedInputs.quantity
                }
            });

            res.status(200).json({
                message: "Quantity updated.",
                data: updatedCart
            });
        }
    } catch (error) {
        throw new InternalServerException("Something went wrong", ErrorCode.INTERNAL_ERROR, error);
    }
};

