import { Issuer } from 'openid-client';

export function authUser(authHeader: string): Promise<any> {
    if (authHeader) {
        const bearerToken = authHeader.replace('Bearer ', '');
        return validateToken(bearerToken);
    } else {
        throw new Error('No Authorization Headers');
    }
}

function validateToken(token: string): Promise<{}> {
    return new Promise((resolve, reject) => {
        return createClient()
            .then((client) => {
                client.introspect(token)
                    .then(function (response) {
                        if (response && response.active) {
                            resolve(response);
                        } else {
                            throw new Error('Authorization token is not valid');
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function createClient(): Promise<any> {
    return new Promise((resolve, reject) => {
        Issuer.discover(process.env.IDENTITY_ACCOUNT_HOST)
            .then(function (companyIssuer) {
                const client = new companyIssuer.Client({
                    client_id: process.env.IDENTITY_ACCOUNT_SERVICE_CLIENT,
                    client_secret: process.env.IDENTITY_ACCOUNT_SERVICE_CLIENT_SECRET
                });
                resolve(client);
            })
            .catch((error) => {
                reject(error);
            });
    });
}