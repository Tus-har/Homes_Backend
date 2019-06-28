import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app/app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule , { cors : true });
    app.enableCors();
    app.listen(4000).then( () => {
        console.log("Listening on Port " + 4000);
    });
}

bootstrap().then( () => {
});
