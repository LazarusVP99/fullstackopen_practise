import axios from 'axios';

import { baseUrl } from './blog.service';

export const userAuth = async credentials => (await axios.post(baseUrl('auth'), credentials)).data;
