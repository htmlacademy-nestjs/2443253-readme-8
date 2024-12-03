import { Module } from '@nestjs/common';
import { BlogPostModule } from '@project/blog-post';
import { RoutingPostModule } from '@project/routing';


@Module({
  imports: [
    BlogPostModule,
    RoutingPostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
