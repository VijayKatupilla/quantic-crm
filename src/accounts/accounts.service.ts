import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { randomUUID } from 'crypto';

@Injectable()
export class AccountsService {
  constructor(private readonly dbService: DatabaseService) {}

  private get db() {
    return this.dbService.connection;
  }

  /** ✅ Get all accounts with activity count and latest activity */
  getAll() {
    const sql = `
      WITH latest_activity AS (
        SELECT account_id, MAX(created_at) AS last_activity
        FROM activities
        GROUP BY account_id
      )
      SELECT 
        a.*,
        COUNT(act.id) AS activity_count,
        la.last_activity
      FROM accounts a
      LEFT JOIN activities act ON a.id = act.account_id
      LEFT JOIN latest_activity la ON a.id = la.account_id
      GROUP BY a.id
      ORDER BY a.created_at DESC
    `;
    return this.db.prepare(sql).all();
  }

  getById(id: string) {
    const sql = `
      SELECT 
        a.*,
        COUNT(act.id) AS activity_count
      FROM accounts a
      LEFT JOIN activities act ON a.id = act.account_id
      WHERE a.id = ?
      GROUP BY a.id
    `;
    const account = this.db.prepare(sql).get(id);
    if (!account) throw new NotFoundException('Account not found');
    return account;
  }

  create(data: any, user: any) {
    const id = randomUUID();
    this.db
      .prepare(
        'INSERT INTO accounts (id, owner_id, name, industry) VALUES (?, ?, ?, ?)',
      )
      .run(id, user.id, data.name, data.industry);
    return { id, message: 'Account created successfully' };
  }

  update(id: string, data: any) {
    const existing = this.db.prepare('SELECT * FROM accounts WHERE id=?').get(id);
    if (!existing) throw new NotFoundException('Account not found');
    this.db
      .prepare('UPDATE accounts SET name=?, industry=? WHERE id=?')
      .run(data.name, data.industry, id);
    return { message: 'Account updated successfully' };
  }

  delete(id: string) {
    const info = this.db.prepare('DELETE FROM accounts WHERE id=?').run(id);
    if (info.changes === 0) throw new NotFoundException('Account not found');
    return { message: 'Account deleted successfully' };
  }
}
