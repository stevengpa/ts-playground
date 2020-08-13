import { sayHello } from './say-hello';
import * as sayHelloLib from './say-hello';

const spyOn = jest.spyOn;

const SAY_HELLO_MODULE_PATH = './say-hello';

jest.mock('uuid', () => ({
  v4: (): string => 'my-unique-ultra-uuid',
}));

describe('sayHello', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should replace the result', () => {
    // Arrange
    jest.doMock(SAY_HELLO_MODULE_PATH, () => ({
      sayHello: jest.fn(() => 'Hello Yolo'),
    }));
    const sayHelloMock = require(SAY_HELLO_MODULE_PATH);

    // Act
    sayHelloMock.sayHello();

    // Assert
    expect(sayHelloMock.sayHello).toHaveReturnedWith('Hello Yolo');
  });

  it('should replace the result - approach 2', () => {
    // Arrange
    const sayHelloSpy = spyOn(sayHelloLib, 'sayHello').mockReturnValue('Hello Yolo');

    // Act
    sayHelloLib.sayHello();

    // Assert
    expect(sayHelloLib.sayHello).toHaveReturnedWith('Hello Yolo');

    // Clean
    sayHelloSpy.mockRestore();
  });

  it('should receive the expected name arg', () => {
    // Arrange
    const name = 'Steven';
    jest.doMock(SAY_HELLO_MODULE_PATH, () => ({
      sayHello: jest.fn((name?: string) => sayHello(name)),
    }));
    const sayHelloMock = require(SAY_HELLO_MODULE_PATH);

    // Act
    sayHelloMock.sayHello(name);
    // Assert
    expect(sayHelloMock.sayHello).toHaveBeenCalledWith(name);
  });

  it('should receive the expected result by passing a name', () => {
    // Arrange
    const name = 'Steven';
    // Act
    const actual = sayHello(name);
    const expected = `Hello ${name}`;
    // Assert
    expect(actual).toStrictEqual(expected);
  });
});
