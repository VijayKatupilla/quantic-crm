import { Injectable, OnModuleInit } from '@nestjs/common';
import Database from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private db: Database.Database;

  onModuleInit() {
    const dbPath = path.resolve(__dirname, '../../crm.db');
    const seedFile = path.resolve(process.cwd(), 'src/database/seed.sql');


    this.db = new Database(dbPath);
    this.db.pragma('foreign_keys = ON');

    const tables = this.db
      .prepare("SELECT name FROM sqlite_master WHERE type='table'")
      .all();

    if (tables.length === 0) {
      const sql = fs.readFileSync(seedFile, 'utf8');
      this.db.exec(sql);
      console.log('✅ Database seeded successfully.');
    } else {
      console.log('✅ Database already exists.');
    }
  }

  get connection() {
    return this.db;
  }
}
