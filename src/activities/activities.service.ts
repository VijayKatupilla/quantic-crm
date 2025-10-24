import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UpdatesGateway } from '../updates/updates.gateway';
import { randomUUID } from 'crypto';

@Injectable()
export class ActivitiesService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly updatesGateway: UpdatesGateway,
  ) {}

  private get db() {
    return this.dbService.connection;
  }

  /** ✅ Get all activities for a given account */
  getAll(accountId: string) {
    const sql = `
      SELECT act.*, u.email AS user_email
      FROM activities act
      JOIN users u ON act.user_id = u.id
      WHERE act.account_id = ?
      ORDER BY act.created_at DESC
    `;
    return this.db.prepare(sql).all(accountId);
  }

  /** ✅ Create a new activity */
  create(accountId: string, data: any, user: any) {
    const account = this.db.prepare('SELECT * FROM accounts WHERE id=?').get(accountId);
    if (!account) throw new NotFoundException('Account not found');

    const id = randomUUID();
    this.db
      .prepare(
        'INSERT INTO activities (id, account_id, user_id, type, notes, next_follow_up) VALUES (?, ?, ?, ?, ?, ?)',
      )
      .run(id, accountId, user.id, data.type, data.notes, data.next_follow_up);

    const payload = {
      id,
      accountId,
      type: data.type,
      notes: data.notes,
      next_follow_up: data.next_follow_up,
    };

    // Broadcast live update via WebSocket
    this.updatesGateway.broadcast('activityUpdate', {
      event: 'created',
      payload,
    });

    return { id, message: 'Activity created successfully' };
  }

  /** ✅ Update an activity */
  update(id: string, data: any) {
    const act = this.db.prepare('SELECT * FROM activities WHERE id=?').get(id);
    if (!act) throw new NotFoundException('Activity not found');

    this.db
      .prepare(
        'UPDATE activities SET type=?, notes=?, next_follow_up=? WHERE id=?',
      )
      .run(data.type, data.notes, data.next_follow_up, id);

    const payload = { id, ...data };
    this.updatesGateway.broadcast('activityUpdate', {
      event: 'updated',
      payload,
    });

    return { message: 'Activity updated successfully' };
  }

  /** ✅ Delete an activity */
  delete(id: string) {
    const info = this.db.prepare('DELETE FROM activities WHERE id=?').run(id);
    if (info.changes === 0) throw new NotFoundException('Activity not found');

    this.updatesGateway.broadcast('activityUpdate', {
      event: 'deleted',
      payload: { id },
    });

    return { message: 'Activity deleted successfully' };
  }
}
