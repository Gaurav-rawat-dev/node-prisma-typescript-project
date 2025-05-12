import { Request, Response } from "express"
import { addressSchema } from "../schema/address"
import { prismaClient } from ".."
import { InternalServerException, NotFoundException } from "../exceptions/BadExceptions"
import { ErrorCode } from "../exceptions/root"
import { error } from "console"
addressSchema

export const addAddress = async (req: Request, res: Response) => {
    try {
        addressSchema.parse(req.body)
        const userID = req.user.id;
        const newAddress = await prismaClient.address.create({
            data: {
                ...req.body,
                userId: userID,
            },
        });

        res.status(201).json({
            message: "address successfully added.",
            data: newAddress
        })

    } catch (error) {
        throw new InternalServerException("something is wrong", ErrorCode.INTERNAL_ERROR, error)
    }
}

export const deleteAddress = async (req: Request, res: Response) => {
    try {

        const deleteAddress = await prismaClient.address.delete({
            where : {
                id : +req.params.id
            }
        })

        res.status(200).json({
            message : "deleted successfully."
        })
        
    } catch (error) {
        throw new NotFoundException("Adderes not found", ErrorCode.ADDRESS_NOT_FOUND)
    }

}

export const listAddress = async (req: Request, res: Response) => {
    
    const addresses = await prismaClient.address.findMany({
        where : {
            userId : req.user.id
        }
    })
    res.status(200).json({
        message : "All Addresses",
        data : addresses
    })
} 