import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Content } from '../content/content';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [Header, Content, RouterOutlet],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {}
