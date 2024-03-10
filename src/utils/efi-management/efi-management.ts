/* eslint-disable prettier/prettier */
import { env } from 'process';
import { Storage } from '@google-cloud/storage';

import https from 'https';
import axios from 'axios';
import path from 'path';

export class EfiManagement {
  accessToken: string = '';
  headersConfig: object = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.accessToken}`,
  };

  // Pix Configurations
  storage = new Storage({
    keyFilename: path.join(
      __dirname,
      '../../../../e-gest-firebase-keyfile.json'
    ),
    projectId: env.PROJECT_ID,
  });

  file = this.storage.bucket(env.BUCKET).file(env.CERTIFICATE);

  data = JSON.stringify({ grant_type: 'client_credentials' });
  credentials = `${env.CLIENT_ID}:${env.CLIENT_SECRET}`;
  auth = Buffer.from(this.credentials).toString('base64');
  agent = new https.Agent();

  authConfig = {
    method: 'POST',
    url: '',
    headers: {
      Authorization: `Basic ${this.auth}`,
      'Content-Type': 'application/json',
    },
    httpsAgent: this.agent,
    data: this.data,
  };

  constructor() {}

  async getCertificate(authEndpoint: string, isCob: boolean = false) {
    const stream = this.file.createReadStream();
    const chunks = [];

    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });

    stream.on('end', async () => {
      const fileContent = Buffer.concat(chunks);
      this.agent.options.pfx = fileContent;
      this.agent.options.passphrase = '';

      this.authConfig.url = isCob
        ? `${authEndpoint}/v1/authorize`
        : `${authEndpoint}/oauth/token`;
      this.authConfig.httpsAgent = this.agent;
    });

    stream.on('error', (err) => {
      console.error(err);
    });
  }

  private async init() {
    await this.getAccessToken();

    setInterval(async () => {
      await this.getAccessToken();
    }, 5000 * 1000);
  }

  async getAccessToken(): Promise<void> {
    try {
      const response = await axios(this.authConfig);

      this.accessToken = response.data.access_token;
      this.headersConfig = {
        ...this.headersConfig,
        Authorization: `Bearer ${this.accessToken}`,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  getSetup() {
    return { headersConfig: this.headersConfig, agent: this.agent };
  }
}
