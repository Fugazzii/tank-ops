import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle("Tank Ops")
    .setDescription("API description")
    .setVersion("1.0")
    .addTag("tanks")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
 
  fs.writeFileSync("./swagger.json", JSON.stringify(document));

  await app.listen(3000);
}
bootstrap();
