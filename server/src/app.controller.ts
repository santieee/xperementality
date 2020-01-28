import { Controller, Request, Post, Get, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service'

@Controller()
export class AppController {
  constructor(){}
}