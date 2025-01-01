import { http, HttpResponse } from 'msw';

import { testBlog } from '../components/Blog/Blog.test';

import { blogToUpdateObject, testTokenGenerator } from './mockUtils';

export const mswHandler = [
    http.patch('/api/blogs/:id', async () => HttpResponse
        .json(blogToUpdateObject, { status: 200 })),
    http.post('/api/blogs', async ({ request }) => testTokenGenerator(request) && HttpResponse.json(
        testBlog, { status: 201, }
    ))
]