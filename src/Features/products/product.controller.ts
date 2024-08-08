/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Put, Delete, Param, Body, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductService } from './product.services';
import { Product } from './product.entity';

@ApiTags('products') // Etiqueta para agrupar los endpoints de productos en Swagger
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error al crear producto.' })
  async create(@Body() product: Product, @Res() res: Response): Promise<void> {
    const createdProduct = await this.productService.create(product);
    res.status(HttpStatus.CREATED).json({ message: 'Producto creado exitosamente', product: createdProduct });
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos.' })
  @ApiResponse({ status: 500, description: 'Error al obtener productos.' })
  async findAll(@Res() res: Response): Promise<void> {
    const products = await this.productService.findAll();
    res.status(HttpStatus.OK).json(products);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto encontrado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  async findOne(@Param('id') id: number, @Res() res: Response): Promise<void> {
    const product = await this.productService.findOne(id);
    if (product) {
      res.status(HttpStatus.OK).json(product);
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Producto no encontrado' });
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  async update(@Param('id') id: number, @Body() product: Partial<Product>, @Res() res: Response): Promise<void> {
    const updatedProduct = await this.productService.update(id, product);
    if (updatedProduct) {
      res.status(HttpStatus.OK).json({ message: 'Producto actualizado exitosamente', product: updatedProduct });
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Producto no encontrado' });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiResponse({ status: 204, description: 'Producto eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  async remove(@Param('id') id: number, @Res() res: Response): Promise<void> {
    await this.productService.remove(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
