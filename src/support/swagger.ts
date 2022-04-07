import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const applySwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Blog API Example')
    .setDescription(
      'Blog API that allows a blog admin to view, register, verify and remove subscribers',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, document);
};
