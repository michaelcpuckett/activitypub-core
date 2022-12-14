import type { File } from 'formidable';
import { default as FtpClient } from 'ftp';
import { FtpStorageAdapter } from '.';

export async function upload(this: FtpStorageAdapter, file: File) {
  return await new Promise<URL>((resolve, reject) => {
    const client = new FtpClient();
    client.on('ready', () => {
      client.put(file.filepath, file.newFilename, (error) => {
        client.end();

        if (error) {
          reject(error);
        } else {
          resolve(
            new URL(
              `https://${this.host}${this.path ? `${this.path}/` : '/'}${
                file.newFilename
              }`,
            ),
          );
        }
      });
    });
    client.connect({
      host: this.host,
      user: this.user,
      password: this.password,
    });
  });
}
