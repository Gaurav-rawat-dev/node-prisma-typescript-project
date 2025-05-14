import { Request, Response } from "express"
import { addressSchema, updateUserSchema } from "../schema/address"
import { prismaClient } from ".."
import { InternalServerException, InvalidInputExceptions, NotFoundException } from "../exceptions/BadExceptions"
import { ErrorCode } from "../exceptions/root"
import { error } from "console"
import { Address } from "cluster"
import { any } from "zod"
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

export const updateUserAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedInputs = updateUserSchema.parse(req.body);
    const dataToUpdate : any = {}

    // Validate and retrieve the shipping address
    let defaultShippingAddress: Address | undefined;
    if (validatedInputs.defaultShippingAddress) {
      defaultShippingAddress = await prismaClient.address.findFirstOrThrow({
        where: { id: +validatedInputs.defaultShippingAddress },
      });
      dataToUpdate.defaultShippingAddress = +validatedInputs.defaultShippingAddress
    }

    // Validate and retrieve the billing address
    let defaultBillingAddress: Address | undefined;
    if (validatedInputs.defaultBillingAddress) {
      defaultBillingAddress = await prismaClient.address.findFirstOrThrow({
        where: { id: +validatedInputs.defaultBillingAddress },
      });
      dataToUpdate.defaultBillingAddress = +validatedInputs.defaultBillingAddress
    }

    
    

    // Update the user
    const user = await prismaClient.user.update({
      where: { id: +req.user.id },
      data: {
        ...dataToUpdate
      }
      
    });

    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });

  } catch (error) {
    console.error(error);
    throw new InvalidInputExceptions("Invalid input or address not found", ErrorCode.INVALID_INPUTS, error);
  }
};