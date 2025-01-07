import { PrismaClient } from '@prisma/client';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';


function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      tegs: ['#животные'],
      userId: FIRST_USER_ID,
      countLikes:1,
      countComments:1,
      state: 'published',
      repost: false,
      originPostId: FIRST_POST_UUID,
      type: 'text',
      name: 'Домашние животные',
      announcement: 'За что мы любим наших питомцев',
      text: 'Мы должны заботиться и ухаживать за тех кого приручили',
      video:'',
      author:'',

      comments: [
        {
          text: 'Не уверен что все так делают',
          userId: SECOND_USER_ID,
        }
    ],
      likes: [
        {
          userId: FIRST_USER_ID,
        }
      ],
    },
    {
      id: SECOND_POST_UUID,
      tegs: ['#фильм'],
      userId: SECOND_USER_ID,
      countLikes:1,
      countComments:1,
      state: 'published',
      repost: false,
      originPostId: SECOND_POST_UUID,
      type: 'text',
      name: 'Художественные фильмы',
      announcement: 'Что можно посмотреть в этом месяце',
      text: 'Недавно вышел новый сезон МосГаз',
      video:'',
      author:'',

      comments: [
        {
          text: 'Да, неплохой сериал',
          userId: FIRST_USER_ID,
        },
      ],

      likes: [
        {
          userId: SECOND_USER_ID,
        },
      ]

    },
  ]
}

async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {},
      create:{
        id: post.id,
        tegs: post.tegs,
        userId: post.userId,
        countLikes:post.countLikes,
        countComments:post.countComments,
        state: post.state,
        repost: post.repost,
        originPostId: post.originPostId,
        type: post.type,
        name: post.name,
        announcement: post.announcement,
        text: post.text,
        video: post.video,
        author: post.author,


        comments: post.comments ? {
          create: post.comments,
        }: undefined,

        likes: post.likes ? {
          create: post.likes
        } : undefined
      }
    });

  }



  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
