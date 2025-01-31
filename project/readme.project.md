#Проект находится в папке `Project`. Запуск всех микросервисов производится из этой папки
//----------------------------------------------------------------------------------------
# Запуск микросервиса по регистрации и авторизации пользователей: 
> npx nx run account:serve


# Создать БД по пользователям в Docker на основе Compose файла
docker compose --file ./apps/account/docker-compose.dev.yml --project-name "readme-account" up -d


//-----------------------------------------------------------------------------------------
Примеры команд по созданию, получению, авторизации новых пользователей находятся в файле
`project\libs\shared\account\authentication\src\authentication-module\authentication.http`
//-----------------------------------------------------------------------------------------



# Запуск микросервиса по управлению публикациями, комментариями, лайками: 
> npx nx run publications:serve

# Создать БД по публикациям в Docker на основе Compose файла
docker compose --file ./apps/publications/docker-compose.dev.yml --project-name "readme-publications" up -d

# Создаем схему с помощью Prisma
//Все манипуляции по Prisma производим из директории - `project\libs\blog\models`
>npx prisma migrate dev --name "Added model for Post" --schema ./prisma/schema.prisma
Аргументы:
* `--name` — название миграции
* `--schema` — путь к схеме
* `--skip-generate` — пропустить формирование клиента.

# Генерация клиента БД
npx nx run publications:db:generate
# Наполнение (сидирование) БД
npx nx run publications:db:seed

//-----------------------------------------------------------------------------------------
# Примеры команд по созданию, получению, фильтрации, удалению,обновлению публикаций находятся в файле
`C:\Readme\2443253-readme-8\project\libs\shared\post\blog-post\src\blog-post-module\blog-post.http`
//-----------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------
# Примеры команд по созданию, получению комментариев для публикации находятся в файле
`C:\Readme\2443253-readme-8\project\libs\shared\post\blog-comment\src\blog-comment-module\blog-comment.http`
//-----------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------
# Примеры команд по созданию, добавлению и удалению лайков для публикаций находятся в файле
`C:\Readme\2443253-readme-8\project\libs\shared\post\blog-like\src\blog-like-module\blog-like.http`
//-----------------------------------------------------------------------------------------
