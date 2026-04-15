import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggingService } from './services/logging.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Azure Almost Live Logs';

  constructor(private router: Router,
    private logingService: LoggingService) {}

  async ngOnInit(): Promise<void> {
    try {
      const me = await fetch('/.auth/me').then(r => r.json());
      if (!me?.clientPrincipal) {
        const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
        window.location.href = `/.auth/login/aad?post_login_redirect_uri=${returnUrl}`;
      }
    } catch {
      // /.auth/me unavailable (local dev) – skip auth check
    }
  }
}
