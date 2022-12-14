import { Db } from 'mongodb';
import { mockDbAdapter } from './mockDbAdapter';

describe('DbAdapter', () => {
  describe('findStringIdByValue', () => {
    const stringId = 'https://test.com/123';
    const stringValue = 'Hello world';

    const dbAdapter = mockDbAdapter({
      db: {
        findOne: jest.fn(() => ({
          _id: stringId,
          value: stringValue,
        })),
      } as unknown as Db,
    });

    it('should get string ID by value', async () => {
      const foundItem = await dbAdapter.findStringIdByValue(
        'foobar',
        stringValue,
      );

      expect(foundItem).toBe(stringId);
      expect(dbAdapter.db.collection).toBeCalledWith('foobar');
    });
  });
});
