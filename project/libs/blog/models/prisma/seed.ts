import { PostState, PostType,PrismaClient } from '@prisma/client';


const FIRST_POST_UUID = crypto.randomUUID();
const SECOND_POST_UUID = crypto.randomUUID();

const FIRST_USER_ID = '677cf3245d5261334f343a18';
const SECOND_USER_ID = '6755746b5903856268a55d4a';
const DEFAULT_LIKES_COUNT = 1;
const DEFAULT_COMMENTS_COUNT = 1;

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      tegs: ['#животные'],
      userId: FIRST_USER_ID,
      countLikes:DEFAULT_LIKES_COUNT,
      countComments:DEFAULT_COMMENTS_COUNT,
      state: PostState.published,
      repost: false,
      originPostId: FIRST_POST_UUID,
      type: PostType.text,
      name: 'Домашние животные',
      announcement: 'За что мы любим наших питомцев',
      text: 'Мы должны заботиться и ухаживать за тех кого приручили',
      video:'',
      author:'',

      comments: [
        {
          message: 'Не уверен что все так делают',
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
      countLikes:DEFAULT_LIKES_COUNT,
      countComments:DEFAULT_COMMENTS_COUNT,
      state: PostState.published,
      repost: false,
      originPostId: SECOND_POST_UUID,
      type: PostType.text,
      name: 'Художественные фильмы',
      announcement: 'Что можно посмотреть в этом месяце',
      message: 'Недавно вышел новый сезон МосГаз',
      video:'',
      author:'',

      comments: [
        {
          message: 'Да, неплохой сериал',
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
        text: 'Текст',
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
