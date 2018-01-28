import { use, expect } from 'chai';
import * as sinonChai from 'sinon-chai';
import * as handleError from '../handleError';

use(sinonChai);

const status = 401;
const message = 'User Unauthorized';
const context = {
    awsRequestId: 'cool-request'
};
const response = {
    statusCode: status,
    body: JSON.stringify({ 'message': message }),
    headers: {
        'Content-Type': 'application/json',
    }
}

describe('Handle Error', () => {

  describe('Error Response', () => {
    it('should create a valid response object', () => {
      const result = handleError.errorResponse(status, message, context);

      expect(result).to.eql(response);
    });
  });

});