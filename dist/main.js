"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(Number(process.env.PORT) || 4000, () => {
        console.log(`Server is listening on port: ${Number(process.env.PORT) || 4000}`);
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }));
    });
}
bootstrap();
//# sourceMappingURL=main.js.map