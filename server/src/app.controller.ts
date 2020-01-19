import { Controller, Request, Post, Get, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service'

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService
  ){}
}