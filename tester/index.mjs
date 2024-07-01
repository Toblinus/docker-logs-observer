import { faker } from '@faker-js/faker';

const TIMEOUT = 1000;

setInterval(() => {
  const ip = faker.internet.ipv4();
  const useragent = faker.internet.userAgent();
  const status = faker.internet.httpStatusCode({
    types: ['success', 'clientError', 'serverError']
  });
  const method = faker.internet.httpMethod();
  const size = faker.number.int({ min: 100, max: 25_000_000 });
  const { pathname } = new URL(faker.internet.url());

  console.log(`${ip}  - - [${new Date().toUTCString()}]" ${method} ${pathname} HTTP/1.1" ${status} ${size.toString().padEnd(16, ' ')}"-" "${useragent}" "-"`);
}, TIMEOUT);
