# Project
# Функционал



#Проект находится в папке `Project`. Запуск всех микросервисов производится из этой папки
//----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
# Примеры команд:

# Создать нового пользователя
# Войти по email и паролю ("Залогиниться")
# Получить новые токены
# Подписаться на публикации другого пользователя
# Отписаться на публикации другого пользователя
# Поменять пароль у пользователя
# Разослать уведомления пользователям о новых публикациях
# Создать новый пост
# Удалить публикация по id
# Обновить публикацию по id
# Создать репост публикации с определенным id
# Получить все публикации
# Получить публикацию по id (просмотр детальной информации)
# Получить публикации с сортировкой и фильтрацией
# Получить контентную ленту публикаций на подписанных пользователей с сортировкой и фильтрацией

# находятся в файле
`project\apps\api\src\app\app_user_blog.http`
//-----------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------
# Примеры команд:

# Войти по email и паролю ("Залогиниться")
# Получить все комментарии для публикации
# Создать новый комментарий для публикации с определенным id
# Удалить свой комментарий с определенным id
# Поставить лайк для публикации с определенным id
# Удалить лайк для публикации с определенным id

# находятся в файле
`project\apps\api\src\app\app_like_comment.http`
//-----------------------------------------------------------------------------------------





# Создать БД по пользователям в Docker на основе Compose файла
docker compose --file ./apps/account/docker-compose.dev.yml --project-name "readme-account" up -d


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


# Запуск микросервиса по управлению публикациями, комментариями, лайками: 
> npx nx run publications:serve
# Запуск микросервиса по управлению пользователями: 
> npx nx run account:serve
# Запуск микросервиса по уведомлениям: 
> npx nx run notify:serve
# Запуск микросервиса по работе с файлами: 
> npx nx run file-vault:serve
# Запуск микросервиса по Api GateWay: 
> npx nx run api:serve
















<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/node?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/r2yZuwyBTF)


## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve users
```

To create a production bundle:

```sh
npx nx build users
```

To see all available targets to run for a project, run:

```sh
npx nx show project users
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/node:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/node:lib mylib
```
npx nx g @nx/node:lib blog-like --directory libs/shared/post/blog-like


You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/node?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
