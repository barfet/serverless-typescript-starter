import { use, expect } from 'chai';
import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

const chaiSubset = require('chai-subset');

use(sinonChai);
use(chaiSubset);

const authHeader = 'Bearer my-token';
const user = {
    active: true,
    sud: 'cool-user'
};

const openidClient = {}

const authUser = proxyquire('../auth', {
    'openid-client': openidClient
}).authUser;

describe('Auth', () => {

    let issuerStub;
    let discoverStub;
    let companyIssuerStub;
    let clienStub;
    let spyReplace;

    beforeEach(() => {
        issuerStub = sinon.stub();
        discoverStub = sinon.stub();
        companyIssuerStub = sinon.stub();
        clienStub = sinon.stub();

        spyReplace = sinon.spy(String.prototype, 'replace');

        companyIssuerStub.Client = function() {
            this.client_id = 'client_id';
            this.client_secret = 'client_secret';
            this.introspect = function() {
                return Promise.resolve(user);
            }
        }

        discoverStub.callsFake((endpoint: string) => {
            return Promise.resolve(companyIssuerStub);
        });

        issuerStub['discover'] = discoverStub;
        openidClient['Issuer'] = issuerStub; 
    });

    afterEach(() => {
        spyReplace.restore();
    });

    describe('Auth User', () => {
        it('should throw an error if no Authorization Header is provided', () => {
            expect(() => authUser('')).to.throw('No Authorization Headers');
        });
    });

    describe('Auth User', () => {
        it('should properly replace Bearer in the header', () => {
            return authUser(authHeader).then((user) => {
                expect(spyReplace).to.have.been.returned('my-token');
            });
        });
    });

    describe('Auth User', () => {
        it('should return active user', () => {
            return authUser(authHeader).then((result) => {
                expect(result).to.equal(user);
            });
        });
    });

    describe('Auth User', () => {
        it('should throw an error if user is not active', () => {
            delete user.active;
            return authUser(authHeader).then((result) => {
                
            }).catch((error: Error) => {
                expect(error.message).to.equal('Authorization token is not valid')
            });
        });
    });

    describe('Auth User', () => {
        it('should reject a Promise when fail to discover issuer', () => {
            discoverStub.callsFake((endpoint: string) => {
                return Promise.reject('Fail to discover issuer')
            });
            return authUser(authHeader).then((result) => {
                
            }).catch((error: Error) => {
                expect(error).to.equal('Fail to discover issuer')
            });
        });
    });

    describe('Auth User', () => {
        it('should reject a Promise when fail to create a client', () => {
          companyIssuerStub.Client = function() {
                return Promise.reject('Fail to create a client')
            }
            return authUser(authHeader).then((result) => {
                
            }).catch((error: Error) => {
                expect(error).to.equal('Fail to create a client')
            });
        });
    });
});