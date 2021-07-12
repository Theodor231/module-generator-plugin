import { Injectable } from '@nestjs/common';
import permissions from './permissions';
import { Connection } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(private connection: Connection) {
    this.setPermissions();
  }

  async setPermissions(): Promise<void> {
    const repository = this.connection.getRepository('permissions');

    for (const key in permissions) {
      for (const permission in permissions[key]) {
        for (const action in permissions[key][permission]) {
          const record: any = await repository.findOne({
            where: { module: permission, role: key, action },
          });
          const newRecord = {
            action,
            module: permission,
            levels: permissions[key][permission][action].levels,
            access: permissions[key][permission][action].access,
            role: key,
            fields: permissions[key][permission][action].fields,
            availableFields:
              permissions[key][permission][action].availableFields,
          };

          if (!record) {
            await repository.save(newRecord);
          }
        }
      }
    }
  }
}
