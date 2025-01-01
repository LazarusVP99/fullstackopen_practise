import assert from 'node:assert';
import { describe, test } from 'node:test';

import { helpers as testHelper } from '../../utils/index.js';

const listOfBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

test('dummy returns 1', () => assert.strictEqual(testHelper.dummy([]), 1));

describe('total likes', () => {
  test('of empty list is zero', () => assert.strictEqual(testHelper.totalLikes([]), 0));

  test('when list has only one blog, equals the likes of that', () => assert.strictEqual(testHelper.totalLikes([listOfBlogs[0]]), 7));

  test('of a bigger list calculated right', () => assert.strictEqual(testHelper.totalLikes(listOfBlogs), 36));
});

describe('favorite blog', () => {
  test('blog with most likes', () => assert.deepStrictEqual(testHelper.favoriteBlog(listOfBlogs), {
    title: listOfBlogs[2].title,
    author: listOfBlogs[2].author,
    likes: listOfBlogs[2].likes,
  }));

  test('author with most blogs', () => assert.deepStrictEqual(testHelper.mostBlogs(listOfBlogs), {
    author: 'Robert C. Martin',
    blogs: 3,
  }));

  test('author with most likes', () => assert.deepStrictEqual(testHelper.mostLikes(listOfBlogs), {
    author: 'Edsger W. Dijkstra',
    likes: 17,
  }));
});
