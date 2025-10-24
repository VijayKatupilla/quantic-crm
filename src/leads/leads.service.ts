import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { randomUUID } from 'crypto';

@Injectable()
export class LeadsService {
  constructor(private readonly dbService: DatabaseService) {}

  private get db() {
    return this.dbService.connection;
  }

  getAll(query: any) {
    const { status, createdFrom, createdTo } = query;
    let sql = 'SELECT * FROM leads WHERE 1=1';
    const params: any[] = [];

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }
    if (createdFrom) {
      sql += ' AND datetime(created_at) >= datetime(?)';
      params.push(createdFrom);
    }
    if (createdTo) {
      sql += ' AND datetime(created_at) <= datetime(?)';
      params.push(createdTo);
    }

    sql += ' ORDER BY created_at DESC';
    return this.db.prepare(sql).all(...params);
  }

  getById(id: string) {
    const lead = this.db.prepare('SELECT * FROM leads WHERE id = ?').get(id);
    if (!lead) throw new NotFoundException('Lead not found');
    return lead;
  }

  create(data: any, user: any) {
    const id = randomUUID();
    this.db
      .prepare(
        'INSERT INTO leads (id, owner_id, name, company, status) VALUES (?, ?, ?, ?, ?)',
      )
      .run(id, user.id, data.name, data.company, data.status || 'new');

    return { id, message: 'Lead created successfully' };
  }

  update(id: string, data: any) {
    const lead = this.db.prepare('SELECT * FROM leads WHERE id=?').get(id);
    if (!lead) throw new NotFoundException('Lead not found');

    this.db
      .prepare(
        'UPDATE leads SET name=?, company=?, status=? WHERE id=?',
      )
      .run(data.name, data.company, data.status, id);

    return { message: 'Lead updated successfully' };
  }

  delete(id: string) {
    const info = this.db.prepare('DELETE FROM leads WHERE id=?').run(id);
    if (info.changes === 0) throw new NotFoundException('Lead not found');
    return { message: 'Lead deleted successfully' };
  }

  convertToAccount(id: string) {
    const lead = this.db.prepare('SELECT * FROM leads WHERE id=?').get(id);
    if (!lead) throw new NotFoundException('Lead not found');

    const accountId = randomUUID();
    this.db
      .prepare(
        'INSERT INTO accounts (id, owner_id, name, industry) VALUES (?, ?, ?, ?)',
      )
      .run(accountId, lead.owner_id, lead.company || lead.name, 'Converted');

    this.db.prepare('DELETE FROM leads WHERE id=?').run(id);

    return { message: 'Lead converted to account', accountId };
  }
}
