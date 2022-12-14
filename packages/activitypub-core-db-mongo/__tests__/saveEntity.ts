import { mockDbAdapter } from './mockDbAdapter';
import { AP } from 'activitypub-core-types';
import { Db } from 'mongodb';
import { ACTIVITYSTREAMS_CONTEXT } from 'activitypub-core-utilities';

describe('DbAdapter', () => {
  describe('saveEntity', () => {
    const date = new Date('2022-01-01');
    const object1Url = 'https://test.com/entity/123';
    const object1: AP.Note = {
      '@context': new URL(ACTIVITYSTREAMS_CONTEXT),
      id: new URL(object1Url),
      url: new URL(object1Url),
      type: 'Note',
      content: 'Test',
      published: date,
    };

    const object1Result = {
      '@context': ACTIVITYSTREAMS_CONTEXT,
      id: object1Url,
      url: object1Url,
      type: 'Note',
      content: 'Test',
      published: date.toISOString(),
    };

    it('should save the entity', async () => {
      const replaceOne = jest.fn(async (object) => {
        return true;
      });
      const dbAdapter = mockDbAdapter({
        db: {
          findOne: jest.fn(() => null),
          replaceOne,
        } as unknown as Db,
        fetchResponder: function (request: Request) {
          return async function () {
            if (request.url === object1Url) {
              return object1Result;
            }

            return null;
          };
        },
      });

      await dbAdapter.saveEntity(object1);
      expect(replaceOne).toBeCalledTimes(1);
      expect(replaceOne.mock.calls[0][1]).toBeTruthy();
      expect(replaceOne.mock.calls[0][1]).toStrictEqual(object1Result);
    });
  });
});
