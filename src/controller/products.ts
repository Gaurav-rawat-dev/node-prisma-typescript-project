import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { InternalServerException } from "../exceptions/BadExceptions";
import { ErrorCode } from "../exceptions/root";



export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, price, description, tags }: { name: string; price: string; description: string; tags: string[] } = req.body;

    const product = await prismaClient.product.create({
      data: {
        name,
        price,
        description,
        tags: tags.join(",") // Convert array to comma-separated string
      }
    });

    res.status(201).json({
      message: "Product created successfully",
      data: product
    });

  } catch (error) {
    next(new InternalServerException("Something went wrong while creating product", ErrorCode.INTERNAL_ERROR, error));
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const deleted = await prismaClient.product.delete({
      where: {
        id: +id
      }
    })
    res.status(201).json({
      message: "successfully deleted.",
      data: deleted
    })
  } catch (error) {
    next(new InternalServerException("Something went wrong while deleting product", ErrorCode.INTERNAL_ERROR, error));
  }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const product = req.body
    if (product.tags) {
      product.tags = product.tags.join(",")
    }
    const updatedProduct = await prismaClient.product.update({
      where: {
        id: +id,
      },
      data: product,
    });

    res.status(201).json({
      message: "product updated successfully.",
      data: updatedProduct
    })
  } catch (error) {
    console.log(error)
  }
}



export const getProduct = async (
  req: Request, // typed query params
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // @ts-ignore
    const page = parseInt(req.query.page || "1", 10);
    const limit = 10;
    const skip = (page - 1) * limit;

    const counts = await prismaClient.product.count();

    const products = await prismaClient.product.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      message: "All products listed.",
      counts,
      data: products,
    });
  } catch (error) {
    next(error); // Let your centralized error handler deal with it
  }
};


export const getProductByID = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const product = await prismaClient.product.findFirst({
    where: {
      id: +id
    }
  })

  res.status(200).json({
    message: "Producted listed.",
    data: product
  })

}