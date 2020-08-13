import uuid from 'uuid';
import { getV4 } from './get-v4';

const GET_V4_MODULE_PATH = './get-v4';

jest.mock('uuid', () => ({
  v4: (): string => 'my-unique-ultra-uuid',
}));

describe('getV4', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should replace the entire functionality', () => {
    // Arrange
    jest.doMock(GET_V4_MODULE_PATH, () => ({
      getV4: jest.fn((): number => 1),
    }));
    const getV4Mock = require(GET_V4_MODULE_PATH);
    // Act
    getV4Mock.getV4();
    // Assert
    const expected = 1;

    expect(getV4Mock.getV4).toHaveReturnedWith(expected);
  });

  it('should replace the uuid.v4 external dependency', () => {
    // Arrange
    const expected = 'my-unique-ultra-uuid';
    // Act
    const actual = getV4();
    // Assert
    expect(actual).toStrictEqual(expected);
  });

  it('should expect to use the uuid.v4 from the external dependency', () => {
    // Arrange
    const originalUUID = require('uuid');
    const expected = originalUUID.v4();

    jest.spyOn(uuid, 'v4').mockReturnValue(expected);
    // Act
    const actual = getV4();
    // Assert
    expect(actual).toStrictEqual(expected);
  });
});
