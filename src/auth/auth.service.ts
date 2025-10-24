import { Injectable, UnauthorizedException } from '@nestjs/common';
import Database from 'better-sqlite3';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { randomUUID } from 'crypto';

interface User {
  id: string;
  email: string;
  password_hash: string;
  role: 'rep' | 'manager';
}

@Injectable()
export class AuthService {
  private db: Database.Database;
  private jwtSecret = process.env.JWT_SECRET || 'secret123';
  private jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'refresh456';

  constructor() {
    this.db = new Database('crm.db');
    this.db.pragma('foreign_keys = ON');
  }

  async signup(dto: SignupDto) {
  console.log('signup called with', dto);
  try {
    const existing = this.db.prepare('SELECT * FROM users WHERE email=?').get(dto.email);
    if (existing) {
      console.log('user exists');
      return { message: 'User already exists' };
    }
    const hash = await bcrypt.hash(dto.password, 10);
    const id = randomUUID();
    this.db.prepare('INSERT INTO users (id,email,password_hash,role) VALUES (?,?,?,?)')
      .run(id, dto.email, hash, dto.role);
    console.log('user created');
    return { message: 'Signup successful', id, email: dto.email, role: dto.role };
  } catch (e) {
    console.error('Error during signup:', e);
    throw e;
  }
}


  async login(dto: LoginDto) {
    const user = this.db
      .prepare('SELECT * FROM users WHERE email = ?')
      .get(dto.email) as User | undefined;
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.password_hash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const tokens = this.generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    return { message: 'Login successful', ...tokens };
  }

  private generateTokens(payload: any) {
    const access_token = jwt.sign(payload, this.jwtSecret, { expiresIn: '15m' });
    const refresh_token = jwt.sign(payload, this.jwtRefreshSecret, {
      expiresIn: '7d',
    });
    return { access_token, refresh_token };
  }
}
